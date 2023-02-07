// @mui material components
import { Card } from "@mui/material";
import Grid from "@mui/material/Grid";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

// Vision UI Dashboard React example components
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniTasksCard";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Vision UI Dashboard React base styles
import colors from "assets/theme/base/colors";

// Dashboard layout components
import OrderOverview from "layouts/dashboard/components/OrderOverview";
import Projects from "layouts/dashboard/components/Projects";
import WelcomeMark from "layouts/dashboard/components/WelcomeMark";

// React icons

// Data
import LineChart from "examples/Charts/LineCharts/LineChart";
import { lineChartDataDashboard } from "layouts/dashboard/data/lineChartData";
import { lineChartOptionsDashboard } from "layouts/dashboard/data/lineChartOptions";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "actions/profile.actions";
import { setToken, setRefreshToken } from "actions/auth.actions";
// React
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// Services
import ProfileServices from "services/profile.services";
import LocalStorageUtils from "utils/localStorageUtils";

function Dashboard() {
  const { gradients } = colors;
  const { cardContent } = gradients;
  const profileServices = ProfileServices();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const selector = useSelector((state) => state.auth);

  useEffect(() => {
    try {
      let validToken = false;
      const {logoutAt} = selector;
      const token = LocalStorageUtils.getToken();
      if (token && token !== null) {
        validToken = new Date().getTime() < logoutAt;  
      }
      if (validToken) {
        const getUserInfo = async () => {
          setLoading(true);
          const response = await profileServices.getPersonalInfo();
          if (response) {
            dispatch(setRefreshToken(response.data.refreshToken));
            dispatch(setProfile(response.data));
            setUser(response.data);
          }
          setLoading(false);
        };
        getUserInfo();
      } else {
        LocalStorageUtils.removeToken();
        history.push("/login");
      }
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} xl={4}>
              <MiniStatisticsCard
                title={{ text: "Ir a casa de cliente #1", fontWeight: "regular" }}
                status={"pendiente"}
                priority={{ color: "success", text: "low" }}
                count={null}
                icon={null}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={4}>
              <MiniStatisticsCard
                title={{ text: "Comprobar camaras en casa de Ivan Chef" }}
                status={"activo"}
                priority={{
                  color: "info",
                  text: "medium",
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={4}>
              <MiniStatisticsCard
                title={{ text: "Arreglar cancelas en Varadero" }}
                status={"terminada"}
                priority={{ color: "warning", text: "high" }}
              />
            </Grid>
          </Grid>
        </VuiBox>
        <VuiBox mb={3}>
          <Grid container spacing="18px">
            <Grid item xs={12} lg={12} xl={12}>
              <WelcomeMark />
            </Grid>
          </Grid>
        </VuiBox>
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6} xl={12}>
              <Card>
                <VuiBox sx={{ height: "100%" }}>
                  <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
                    Sales Overview
                  </VuiTypography>
                  <VuiBox display="flex" alignItems="center" mb="40px">
                    <VuiTypography variant="button" color="success" fontWeight="bold">
                      +5% more{" "}
                      <VuiTypography variant="button" color="text" fontWeight="regular">
                        in 2021
                      </VuiTypography>
                    </VuiTypography>
                  </VuiBox>
                  <VuiBox sx={{ height: "310px" }}>
                    <LineChart
                      lineChartData={lineChartDataDashboard}
                      lineChartOptions={lineChartOptionsDashboard}
                    />
                  </VuiBox>
                </VuiBox>
              </Card>
            </Grid>
          </Grid>
        </VuiBox>
        <Grid container spacing={3} direction="row" justifyContent="center" alignItems="stretch">
          <Grid item xs={12} md={6} lg={8}>
            <Projects />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <OrderOverview />
          </Grid>
        </Grid>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;

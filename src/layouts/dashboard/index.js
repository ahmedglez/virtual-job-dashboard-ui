// @mui material components
import { Card } from "@mui/material";
import Grid from "@mui/material/Grid";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

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
import TaskSummary from "layouts/dashboard/components/TaskSummary";

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
  const [assignedTasks, setAssignedTask] = useState([]);

  useEffect(() => {
    try {
      let validToken = false;
      const { logoutAt } = selector;
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
            setAssignedTask(response.data.assignedTasks);
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
        {assignedTasks && assignedTasks.length > 0 ? (
          <TaskSummary />
        ) : (
          <Grid container mb={3}>
            {/* no task yet message */}
            <Grid item xs={12} lg={12} xl={12}>
              <Card>
                <VuiBox
                  sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <VuiBox textAlign="center">
                    <VuiBox mb={3}>
                      <SentimentVeryDissatisfiedIcon
                        sx={{
                          color: "primary",
                          fontSize: "100px",
                        }}
                      />
                    </VuiBox>
                    <VuiTypography variant="h4" color="text" fontWeight="bold">
                      No task yet
                    </VuiTypography>
                    <VuiTypography variant="body2" color="text" fontWeight="regular">
                      You have no task assigned to you
                    </VuiTypography>
                  </VuiBox>
                </VuiBox>
              </Card>
            </Grid>
          </Grid>
        )}
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

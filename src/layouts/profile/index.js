import Grid from "@mui/material/Grid";
// Images
// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import Footer from "examples/Footer";
// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import VuiTypography from "components/VuiTypography";
// Overview page components
import Header from "layouts/profile/components/Header";
import Welcome from "../profile/components/Welcome/index";
import ProfileSettings from "./components/ProfileSettings";
import HashLinkObserver from "react-hash-link";
// Redux
import { useDispatch, useSelector } from "react-redux";
// React
import { useEffect, useState } from "react";
// Services
import ProfileServices from "services/profile.services";


function Overview() {
  const profileServices = ProfileServices();
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await profileServices.getPersonalInfo();
      if (response) {
        dispatch({
          type: "SET_USER",
          payload: response.data,
        });
        setUser(response.data);
      }
    };
    getUserInfo();
  }, []);

  return (
    <DashboardLayout>
      <Header user={user} />
      <VuiBox mb={3}>
        <Grid
          container
          spacing={3}
          sx={({ breakpoints }) => ({
            [breakpoints.only("xl")]: {
              gridTemplateColumns: "repeat(2, 1fr)",
            },
          })}
        >
          <Grid
            item
            xs={12}
            xl={12}
            xxl={12}
            sx={{
              height: "100%",
              marginTop: "15px",
            }}
          >
            <Welcome user={user} />
          </Grid>

          <Grid item xs={12} xl={12} xxl={12}>
            {user !== undefined && user !== null ? (
              <ProfileInfoCard
                title="profile information"
                info={{
                  nickname: user.nickname,
                  fullName: user.fullname,
                  phone: user.phone,
                  mobile: user.mobile,
                  email: user.email,
                  ci: user.ci,
                  address: user.address,
                }}
              />
            ) : (
              <VuiBox>
                <VuiTypography variant="h4" fontWeight="bold" color="white">
                  Loading...
                </VuiTypography>
              </VuiBox>
            )}
          </Grid>

          <Grid
            item
            xs={12}
            xl={12}
            xxl={12}
            sx={{
              height: "100%",
              marginTop: "15px",
            }}
          >
            <HashLinkObserver />
            <div id="profileSettingsRouter"></div>
            {user !== undefined && user !== null ? (
              <ProfileSettings
                user={{
                  ...user,
                }}
              />
            ) : (
              <VuiBox>
                <VuiTypography variant="h4" fontWeight="bold" color="white">
                  Loading...
                </VuiTypography>
              </VuiBox>
            )}
          </Grid>
        </Grid>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;

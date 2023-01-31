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
import { setProfile } from "actions/profile.actions";
import { userLoaded } from "actions/auth.actions";
// React
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function Overview() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const history = useHistory();
  const selector = useSelector((state) => state.profile);

  useEffect(() => {
    setLoading(true);
    const getUserInfo = async () => {
      try {
        const { user } = selector;
        if (user !== undefined && user !== null) {
          setUser(user);
          dispatch(userLoaded(user));
          dispatch(setProfile(user));
        } else {
          setLoading(false);
          setError("User not found");
          history.push("/login");
        }
      } catch (error) {
        setError(error);
      }
    };
    getUserInfo();
    setLoading(false);
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
            {!loading && user !== null ? (
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
            {!loading && user !== null ? (
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

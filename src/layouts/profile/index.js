import Grid from "@mui/material/Grid";
// Images
// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import Footer from "examples/Footer";
// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// Overview page components
import Header from "layouts/profile/components/Header";
import Welcome from "../profile/components/Welcome/index";
import ProfileSettings from "./components/ProfileSettings";
import HashLinkObserver from "react-hash-link";

function Overview() {
  return (
    <DashboardLayout>
      <Header />
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
            <Welcome />
          </Grid>

          <Grid item xs={12} xl={12} xxl={12}>
            <ProfileInfoCard
              title="profile information"
              info={{
                nickname: "ahmedglez",
                fullName: "Ahmed Ivan Gonzalez Betancourt",
                phone: "78793268",
                mobile: "58424765",
                email: "email",
                ci: "00092068426",
                address: "CONCORDIA 867/ESPADA Y SAN FRANCISCO",
              }}
            />
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
            <ProfileSettings
              user={{
                nickname: "ahmedglez",
                fullName: "Ahmed Ivan Gonzalez Betancourt",
                phone: "78793268",
                mobile: "58424765",
                email: "ahmediglez@gmail.com",
                ci: "00092068426",
                address: "CONCORDIA 867/ESPADA Y SAN FRANCISCO",
                password: "admin1234",
              }}
            />
          </Grid>
        </Grid>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;

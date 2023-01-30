import { Grid } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography/index";
import EditFields from "./EditFields";
import HashLinkObserver from "react-hash-link";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const ProfileSettings = (props) => {
  const { user } = props;
  const selector = useSelector((state) => state.auth);
  const [password, setPassword] = useState(selector.password);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);
  const [username, setUsername] = useState("");

  return (
    <VuiBox mb={3} xs={12} xl={12}>
      <Grid container display="flex" spacing={3} justifyContent="center" marginBottom={3}>
        <HashLinkObserver />
        <VuiTypography variant="h5" fontWeight="bold" color="white">
          Profile Settings
        </VuiTypography>
      </Grid>
      <Grid
        container
        spacing={3}
        display="flex"
        alignItems="center"
        justifyContent="center"
        marginTop={3}
        direction={{
          xs: "column",
          sm: "column",
          md: "column",
          xl: "row",
        }}
      >
        <Grid
          container
          spacing={3}
          display="flex"
          justifyContent="center"
          direction="column"
          xs={12}
          md={6}
          xl={6}
          xxl={6}
        >
          <EditFields label="Nickname" value={user.nickname} />
          <EditFields label="Email" value={user.email} />
          <EditFields label="Full Name" value={user.fullname} />
          <EditFields label="Phone" value={user.phone} />
        </Grid>
        <Grid
          container
          xs={12}
          md={6}
          xl={6}
          xxl={6}
          spacing={3}
          display="flex"
          justifyContent="center"
          direction="column"
        >
          <EditFields label="Mobile" value={user.mobile} />
          <EditFields label="Address" value={user.address} />
          
        </Grid>
      </Grid>
    </VuiBox>
  );
};

export default ProfileSettings;

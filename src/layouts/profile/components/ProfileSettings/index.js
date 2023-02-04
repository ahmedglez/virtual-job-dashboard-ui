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
          mt={1}
          xl={6}
          xxl={6}
        >
          <EditFields label="ci" value={user.ci} />
          <EditFields label="nickname" value={user.nickname} />
          <EditFields label="email" value={user.email} />
          <EditFields label="fullname" value={user.fullname} />
          <EditFields label="phone" value={user.phone} />
          <EditFields label="mobile" value={user.mobile} />
          <EditFields label="address" value={user.address} />
        </Grid>
      </Grid>
    </VuiBox>
  );
};

export default ProfileSettings;

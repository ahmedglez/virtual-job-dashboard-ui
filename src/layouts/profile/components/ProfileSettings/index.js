import { Grid } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography/index";
import EditFields from "./EditFields";
import HashLinkObserver from "react-hash-link";
import { useSelector } from "react-redux";
import { useEffect, useState, useMemo, useRef } from "react";

const ProfileSettings = (props) => {
  const { user } = props;
  const selector = useSelector((state) => state.auth);
  const [inputValues, setInputValues] = useState({
    ci: user.ci,
    nickname: user.nickname,
    fullname: user.fullname,
    email: user.email,
    password: selector.password,
    phone: user.phone,
    mobile: user.mobile,
    address: user.address,
  });
  const labels = ["ci", "nickname", "fullname", "email", "password", "phone", "mobile", "address"];

  const [confirmPassword, setConfirmPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);
  const handleChangeState = (value) => {
    setInputValues({
      ...inputValues,
      value,
    });
  };

  return (
    <VuiBox mb={3} sx={{
      width:"100%"
    }}>
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
        direction={{
          xs: "column",
          sm: "column",
          md: "column",
          xl: "row",
        }}
      >
        <Grid
          item
          fullWidth
          spacing={3}
          display="flex"
          justifyContent="center"
          direction="column"
          xs={12}
          md={6}
          mt={1}
          xl={12}
          xxl={12}
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

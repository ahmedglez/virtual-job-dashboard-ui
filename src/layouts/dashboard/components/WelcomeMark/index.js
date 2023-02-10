import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";

import { Card, Icon } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

import gif from "assets/images/cardimgfree.png";

const WelcomeMark = () => {
  const [fullname, setFullname] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.profile.user);

  useEffect(() => {
    setLoading(true);
    if (user !== null && user !== undefined) {
      setFullname(user.fullname);
    }
    setLoading(false);
  }, [user]);

  return (
    <Card
      sx={() => ({
        height: "340px",
        py: "32px",
        backgroundImage: `url(${gif})`,
        backgroundSize: "cover",
        backgroundPosition: "50%",
      })}
    >
      {loading ? (
        <VuiBox display="flex" justifyContent="center" alignItems="center" height="100%">
          <Icon className="fa fa-spinner fa-spin" />
        </VuiBox>
      ) : fullname !== null ? (
        <VuiBox height="100%" display="flex" flexDirection="column" justifyContent="space-between">
          <VuiBox>
            <VuiTypography color="text" variant="button" fontWeight="regular" mb="12px">
              Welcome back,
            </VuiTypography>
            <VuiTypography color="white" variant="h3" fontWeight="bold" mb="18px">
              {fullname.split(" ")[0]}{" "}{fullname.split(" ")[1]}
            </VuiTypography>
            <VuiTypography color="white" variant="h6" fontWeight="regular" mb="auto">
              Glad to see you again!
            </VuiTypography>
          </VuiBox>
          <Link to="/profile">
            <VuiTypography
              component="a"
              href="#"
              variant="button"
              color="white"
              fontWeight="regular"
              sx={{
                mr: "5px",
                display: "inline-flex",
                alignItems: "center",
                cursor: "pointer",

                "& .material-icons-round": {
                  fontSize: "1.125rem",
                  transform: `translate(2px, -0.5px)`,
                  transition: "transform 0.2s cubic-bezier(0.34,1.61,0.7,1.3)",
                },

                "&:hover .material-icons-round, &:focus  .material-icons-round": {
                  transform: `translate(6px, -0.5px)`,
                },
              }}
            >
              Tap to see your profile
              <Icon sx={{ fontWeight: "bold", ml: "5px" }}>arrow_forward</Icon>
            </VuiTypography>
          </Link>
        </VuiBox>
      ) : (
        <VuiBox height="100%" display="flex" flexDirection="column" justifyContent="space-between">
          <VuiBox>
            <VuiTypography color="white" variant="h3" fontWeight="bold" mb="18px">
              {"Not User Logged"}
            </VuiTypography>
            <VuiTypography color="white" variant="h6" fontWeight="regular" mb="auto">
              Please login or create a new account if you are a new user
            </VuiTypography>
          </VuiBox>
          <Link to="/authentication/sign-in">
            <VuiTypography
              component="a"
              href="#"
              variant="button"
              color="white"
              fontWeight="regular"
              sx={{
                mr: "5px",
                display: "inline-flex",
                alignItems: "center",
                cursor: "pointer",
                "& .material-icons-round": {
                  fontSize: "1.125rem",
                  transform: `translate(2px, -0.5px)`,
                  transition: "transform 0.2s cubic-bezier(0.34,1.61,0.7,1.3)",
                },

                "&:hover .material-icons-round, &:focus  .material-icons-round": {
                  transform: `translate(6px, -0.5px)`,
                },
              }}
            >
              Tap here to go to login page
              <Icon sx={{ fontWeight: "bold", ml: "5px" }}>arrow_forward</Icon>
            </VuiTypography>
          </Link>
        </VuiBox>
      )}
    </Card>
  );
};

export default WelcomeMark;

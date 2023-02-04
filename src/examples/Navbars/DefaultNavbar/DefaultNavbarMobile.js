// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Menu from "@mui/material/Menu";
// import Grid from "@mui/material/Grid";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";

// Vision UI Dashboard React example components
import DefaultNavbarLink from "examples/Navbars/DefaultNavbar/DefaultNavbarLink";
import palette from "assets/theme/base/colors";
import tripleLinearGradient from "assets/theme/functions/tripleLinearGradient";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function DefaultNavbarMobile({ open, close }) {
  const { width } = open && open.getBoundingClientRect();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const selector = useSelector((state) => state.auth);

  useEffect(() => {
    setIsAuthenticated(selector.isAuthenticated);
  }, [selector.isAuthenticated]);

  return (
    <Menu
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      anchorEl={open}
      open={Boolean(open)}
      onClose={close}
      sx={{
        marginTop: "8px",
      }}
      MenuListProps={{
        style: {
          width: `calc(${width}px - 4rem)`,
          backgroundImage: tripleLinearGradient(
            palette.gradients.cover.main,
            palette.gradients.cover.state,
            palette.gradients.cover.stateSecondary,
            palette.gradients.cover.deg
          ),
          backgroundColor: "unset !important",
          padding: "8px",
        },
      }}
    >
      <VuiBox px={0.5}>
        <DefaultNavbarLink icon="account_circle" name="sign up" route="/authentication/sign-up" />
        <DefaultNavbarLink icon="key" name="sign in" route="/authentication/sign-in" />
        {isAuthenticated && (
          <>
            <DefaultNavbarLink icon="person" name="profile" route="/profile" />
            <DefaultNavbarLink icon="settings" name="settings" route="/profile/settings" />
            <DefaultNavbarLink icon=" dashboard" name="dashboard" route="/dashboard" />
            <DefaultNavbarLink icon="logout" name="logout" route="/logout" />
          </>
        )}
      </VuiBox>
    </Menu>
  );
}

// Typechecking props for the DefaultNavbarMenu
DefaultNavbarMobile.propTypes = {
  open: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  close: PropTypes.oneOfType([PropTypes.func, PropTypes.bool, PropTypes.object]).isRequired,
};

export default DefaultNavbarMobile;

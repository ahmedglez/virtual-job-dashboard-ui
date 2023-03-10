/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import colors from "assets/theme/base/colors";
import { useState } from "react";

function MiniTasksCard({
  bgColor,
  title,
  status,
  priority,
  direction,
  startDateTime,
  endDateTime,
}) {
  const { info } = colors;
  const [gridDirection, setGridDirection] = useState(direction);

  const icon = {
    color: "info",
    component: status === "done" ? <AssignmentTurnedInIcon /> : <AssignmentIcon />,
  };

  return (
    <Card sx={{ padding: "17px" }}>
      <VuiBox>
        <VuiBox>
          <Grid container alignItems="center">
            {gridDirection === "left" ? (
              <Grid item>
                <VuiBox
                  bgColor={info}
                  color="#fff"
                  width="3rem"
                  height="3rem"
                  borderRadius="lg"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  shadow="md"
                >
                  {icon.component}
                </VuiBox>
              </Grid>
            ) : null}
            <Grid item xs={8} direction={"column"}>
              <VuiBox lineHeight={1}>
                <VuiTypography
                  variant="h5"
                  color={bgColor === "white" ? "text" : "white"}
                  opacity={bgColor === "white" ? 1 : 0.7}
                  fontWeight={title.fontWeight}
                >
                  {title.text}
                </VuiTypography>
                <VuiTypography color="text" variant="subtitle2" fontWeight="bold" opacity={0.7}>
                  status: &nbsp;
                  <VuiTypography
                    variant="subtitle2"
                    color={
                      status === "done" ? "success" : status === "in progress" ? "warning" : "error"
                    }
                    fontWeight="bold"
                    display="inline"
                    opacity={0.7}
                  >
                    {status}
                  </VuiTypography>
                </VuiTypography>
                <VuiTypography variant="subtitle2" color="text" opacity={0.7}>
                  priority: &nbsp;
                  <VuiTypography
                    variant="subtitle2"
                    color={priority.color}
                    fontWeight="bold"
                    display="inline"
                  >
                    {priority.text}
                  </VuiTypography>
                </VuiTypography>
                <VuiTypography variant="subtitle2" color="text" opacity={0.7}>
                  start date: &nbsp;
                  <VuiTypography
                    variant="subtitle2"
                    color={"text"}
                    opacity={1.5}
                    fontWeight="bold"
                    display="inline"
                  >
                    {new Date(startDateTime).toLocaleDateString()}
                  </VuiTypography>
                </VuiTypography>
                <VuiTypography variant="subtitle2" color="text" opacity={0.7}>
                  end date: &nbsp;
                  <VuiTypography
                    variant="subtitle2"
                    color={"text"}
                    opacity={1.5}
                    fontWeight="bold"
                    display="inline"
                  >
                    {new Date(endDateTime).toLocaleDateString()}
                  </VuiTypography>
                </VuiTypography>
              </VuiBox>
            </Grid>
            {gridDirection === "right" ? (
              <Grid item xs={4}>
                <VuiBox
                  bgColor="#0075FF"
                  color="white"
                  width="3rem"
                  height="3rem"
                  marginLeft="auto"
                  borderRadius="lg"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  shadow="md"
                >
                  <Icon fontSize="small" color="inherit">
                    {icon.component}
                  </Icon>
                </VuiBox>
              </Grid>
            ) : null}
          </Grid>
        </VuiBox>
      </VuiBox>
    </Card>
  );
}

// Setting default values for MiniTasksCard the props of
MiniTasksCard.defaultProps = {
  bgColor: "white",
  title: {
    fontWeight: "medium",
    text: "",
  },
  priority: {
    color: "success",
    text: "",
  },
  direction: "right",
};

// Typechecking props for the MiniTasksCard
MiniTasksCard.propTypes = {
  bgColor: PropTypes.oneOf([
    "white",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
  ]),
  title: PropTypes.PropTypes.shape({
    fontWeight: PropTypes.oneOf(["light", "regular", "medium", "bold"]),
    text: PropTypes.string,
  }),
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  priority: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "white",
    ]),
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  icon: PropTypes.shape({
    color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
    component: PropTypes.node.isRequired,
  }).isRequired,
  direction: PropTypes.oneOf(["right", "left"]),
};

export default MiniTasksCard;

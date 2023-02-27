import { useState, useEffect } from "react";
import { Card } from "@mui/material";
import Grid from "@mui/material/Grid";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import AssignmentIcon from "@mui/icons-material/Assignment";
import {
  getFilteredTasks,
  getFilteredTasksByMonth,
} from "./filterFuntions";

const TaskStatisticCard = (props) => {
  const { tasks, status } = props;
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const totalByMonth = getFilteredTasksByMonth(tasks).length;
    setTotal(totalByMonth);
    setFilteredTasks(getFilteredTasks(tasks, status));
  }, [tasks, status]);

  return (
    <Grid item xs={12} lg={4} xl={4}>
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
              {status === "done" ? (
                <AssignmentTurnedInIcon color="success" />
              ) : status === "in progress" ? (
                <PendingActionsIcon color="warning" />
              ) : status === "pending" ? (
                <AssignmentLateIcon color="error" />
              ) : (
                <AssignmentIcon />
              )}

              <VuiTypography variant="h4" color="text" fontWeight="bold">
                {filteredTasks.length}
              </VuiTypography>
              <VuiTypography variant="body2" color="text" fontWeight="regular">
                {status === "done"
                  ? "Tareas Completadas"
                  : status === "in progress"
                  ? "Tareas en Progreso"
                  : status === "pending"
                  ? "Tareas Pendientes"
                  : "Tareas"}
              </VuiTypography>

              <VuiTypography variant="body2" color="text" fontWeight="regular">
                {((filteredTasks.length / total) * 100).toFixed(2)}%
              </VuiTypography>

              <VuiTypography variant="body2" color="text" fontWeight="regular">
                del total
              </VuiTypography>

              <VuiTypography variant="body2" color="text" fontWeight="regular">
                {total}
              </VuiTypography>

              <VuiTypography variant="body2" color="text" fontWeight="regular">
                Tareas
              </VuiTypography>
            </VuiBox>
          </VuiBox>
        </VuiBox>
      </Card>
    </Grid>
  );
};

export default TaskStatisticCard;

import React, { useState, useEffect } from "react";
import { Card } from "@mui/material";
import Grid from "@mui/material/Grid";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import { Skeleton } from "@mui/material";
import { skeletonClasses } from "@mui/material";
import VuiTypography from "components/VuiTypography";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

// Vision UI Dashboard React example components
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniTasksCard";
import colors from "assets/theme/base/colors";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { axiosInstance } from "constants/axiosInstance";

const TaskSummary = () => {
  const selector = useSelector((state) => state.profile);
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const getAssignedTasks = async () => {
      try {
        setLoading(true);
        if (selector.assignedTasks.length > 0) {
          const newAssignedTasks = [];
          selector.assignedTasks.map(async (task) => {
            const response = await axiosInstance.get(`/tasks/${task}`);
            if (response.status === 200) {
              const { data } = response.data;
              console.log(newAssignedTasks);
              newAssignedTasks.push(data);
            } else {
              setError(new Error("Error al obtener las tareas asignadas"));
            }
          });
          setAssignedTasks(newAssignedTasks);
        }
        setLoading(false);
      } catch (error) {
        setError(new Error("Error al obtener las tareas asignadas"));
        setLoading(false);
      }
    };
    getAssignedTasks();
  }, [selector.user.assignedTasks]);

  const { cardContent } = colors.gradients;

  return (
    <VuiBox mb={3}>
      {loading === true ? (
        <Grid container spacing={3}>
          {[1, 2, 3].map((item, index) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Skeleton
                  variant="rectangular"
                  width={210}
                  height={118}
                  className={skeletonClasses.skeleton}
                />
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Grid container spacing={3}>
          {assignedTasks.slice(0, 3).map((task, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <MiniStatisticsCard
                title={{
                  text: task.title.length > 30 ? `${task.title.slice(0, 30)}...` : task.title,
                  color: "text.primary",
                  fontWeight: "bold",
                  fontSize: "h6.fontSize"
                }}
                status={task.status}
                priority={{
                  text: task.priority,
                  color:
                    task.priority === "high"
                      ? "error"
                      : task.priority === "medium"
                      ? "warning"
                      : "success",
                }}
                icon={task.icon}
                startDateTime={task.createdAt}
                endDateTime={task.expirationDate}
                color={cardContent.blue}
                onClick={() => history.push(`/tasks/${task._id}`)}
                sx={{
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "background.default",
                  },
                }}
              />
            </Grid>
          ))}
        </Grid>
      )}
      {assignedTasks.length > 3 && (
        <VuiBox
          mt={3}
          sx={{
            cursor: "pointer",
          }}
        >
          <Card
            sx={{
              borderRadius: "12px",
              backgroundColor: "primary.main",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.05)",
              transition: "all 0.3s ease",
              "&:hover": {
                filter: "brightness(1.2)",
                cursor: "pointer",
              },
            }}
          >
            <VuiBox
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              p={3}
              sx={{
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onClick={() => history.push("/tasks")}
            >
              <VuiTypography variant="subtitle2" color="white" mr={1}>
                Ver {assignedTasks.length - 3} tareas más
              </VuiTypography>
              <ReadMoreIcon fontSize="subtitle2.fontSize" color="white" />
            </VuiBox>
          </Card>
        </VuiBox>
      )}
    </VuiBox>
  );
};

export default TaskSummary;

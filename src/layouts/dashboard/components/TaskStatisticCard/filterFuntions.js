const getFilteredTasks = (tasks, status) => {
  const filteredTasks = getFilteredTasksByMonth(getFilteredTasksByStatus(tasks, status));
  return filteredTasks;
};

const getFilteredTasksByStatus = (tasks, status) => {
  return tasks.filter((task) => task.status === status);
};

const getFilteredTasksByMonth = (tasks) => {
  return tasks.filter((task) => {
    const date = new Date(task.updatedAt);
    const month = date.getMonth();
    const year = date.getFullYear();
    const today = new Date();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();
    return month === todayMonth && year === todayYear;
  });
};

export { getFilteredTasks, getFilteredTasksByMonth, getFilteredTasksByStatus };

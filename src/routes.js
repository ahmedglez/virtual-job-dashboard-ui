// Vision UI Dashboard React layouts
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Dashboard from "layouts/dashboard";
import Profile from "layouts/profile";
import Tables from "layouts/tables";
import UsersTables from "layouts/tables/usersTables";

// Vision UI Dashboard React icons
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { BsCreditCardFill, BsFillPersonFill } from "react-icons/bs";
import { IoHome, IoStatsChart } from "react-icons/io5";
import GroupsIcon from "@mui/icons-material/Groups";
import HailIcon from "@mui/icons-material/Hail";
import AssignmentIcon from "@mui/icons-material/Assignment";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <IoHome size="15px" color="inherit" />,
    component: Dashboard,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Users",
    key: "users",
    route: "/users",
    icon: <GroupsIcon size="15px" color="inherit" />,
    component: UsersTables,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Clients",
    key: "clients",
    route: "/clients",
    icon: <HailIcon size="15px" color="inherit" />,
    component: Tables,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "Tasks",
    key: "tasks",
    route: "/tasks",
    icon: <AssignmentIcon size="15px" color="inherit" />,
    component: Tables,
    noCollapse: true,
  },
  { type: "title", title: "Account Pages", key: "account-pages" },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <BsFillPersonFill size="15px" color="inherit" />,
    component: Profile,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: <LoginIcon size="15px" color="inherit" />,
    component: SignIn,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    route: "/authentication/sign-up",
    icon: <PersonAddIcon size="15px" color="inherit" />,
    component: SignUp,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Log Out",
    key: "log-out",
    route: "/authentication/sign-in",
    icon: <LogoutIcon size="15px" color="inherit" />,
    component: SignIn,
    noCollapse: true,
  },
];

export default routes;

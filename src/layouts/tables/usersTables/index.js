import { useState, useEffect } from "react";
import { axiosInstance } from "constants/axiosInstance";
// @mui material components
import Card from "@mui/material/Card";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiBadge from "components/VuiBadge";
import VuiAvatar from "components/VuiAvatar";
import VuiButton from "components/VuiButton";
import VuiInput from "components/VuiInput";
import Table from "examples/Tables/Table";
import TableSortLabel from "@mui/material/TableSortLabel";
import { useSelector, useDispatch } from "react-redux";
import { columns } from "./data";

const UsersTables = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState([]);
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.administrator);

  useEffect(() => {
    setLoading(true);
    async function getUsers() {
      const response = await axiosInstance.get("users");
      setUsers(response.data.data);
      dispatch({ type: "SET_USERS", payload: response.data.data });
    }
    getUsers();
    setLoading(false);
  }, [selector.users]);

  const handleSelectAll = (event) => {
    let newSelecteds;

    if (event.target.checked) {
      newSelecteds = users.map((n) => n.id);
    } else {
      newSelecteds = [];
    }
    setSelected(newSelecteds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Card>
            <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="22px">
              <VuiTypography variant="lg" color="white">
                Users table
              </VuiTypography>
            </VuiBox>
            <VuiBox
              sx={{
                "& th": {
                  borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                    `${borderWidth[1]} solid ${grey[700]}`,
                },
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                      `${borderWidth[1]} solid ${grey[700]}`,
                  },
                },
              }}
            >
              {loading ? (
                <VuiBox display="flex" justifyContent="center" alignItems="center" mb="22px">
                  <VuiTypography variant="lg" color="white">
                    Loading...
                  </VuiTypography>
                </VuiBox>
              ) : (
                <Table
                  columns={[
                    { name: "nickname", align: "center" },
                    { name: "fullname", align: "center" },
                    { name: "phone", align: "center" },
                    { name: "mobile", align: "center" },
                    { name: "email", align: "center" },
                    { name: "ci", align: "center" },
                    { name: "address", align: "center" },
                  ]}
                  rows={users.map((user) => {
                    return {
                      nickname: user.nickname,
                      fullname: user.fullname,
                      phone: user.phone,
                      mobile: user.mobile,
                      email: user.email,
                      ci: user.ci,
                      address: user.address,
                    };
                  })}
                  selected={selected}
                  onSelect={handleSelectOne}
                  onSelectAll={handleSelectAll}
                />
              )}
            </VuiBox>
          </Card>
        </VuiBox>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
};

export default UsersTables;

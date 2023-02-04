import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { Grid, TextField } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiButton from "components/VuiButton";
import VuiTypography from "components/VuiTypography/index";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "actions/profile.actions";
import ProfileServices from "services/profile.services";

const EditFields = (props) => {
  const service = ProfileServices();
  const { label, value, setChangingPassword } = props;
  const [inputValue, setInputValue] = useState(value);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const profileSelector = useSelector((state) => state.profile);
  const authSelector = useSelector((state) => state.auth);

  const handleSave = async (value) => {
    setLoading(true);
    try {
      const payload = {
        ...profileSelector.user,
        [label]: inputValue,
        password: authSelector.password,
      };
      const response = await service.updatePersonalInfo(payload);
      if (response.status === 200) {
        dispatch(setProfile({ ...profileSelector, [label]: value }));
        setEditMode(false);
        setLoading(false);
      }
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return (
    <Grid
      container
      spacing={3}      
    >
      <Grid
        item
        xs={12}
        xl={12}
        xxl={12}
        mb={2}
        display="flex"
        alignItems="center"
        justifyContent={"center"}
        noValidate
        autoComplete="off"
      >
        <Grid item display="flex" alignItems="center" marginRight={1}>
          <TextField
            key={0}
            disabled={!editMode}
            id="outlined-basic"
            variant="outlined"
            label={label === "ci" ? `Edit ${label.toUpperCase()}` : `Edit ${label.toLowerCase()} `}
            InputLabelProps={{
              style: {
                color: "#9f7aea",
                fontSize: "1.2rem",
                fontWeight: "bold",
                textShadow: "0px 0px 1px #000",
                top: "-8px",
              },
            }}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
        </Grid>
        <Grid display="flex" alignItems="center" direction="row">
          {loading ? (
            <Grid display="flex" alignItems="center" direction="row">
              <VuiButton
                variant="contained"
                color="primary"
                size="small"
                startIcon={<HourglassEmptyIcon />}
              ></VuiButton>
            </Grid>
          ) : (
            <>
              {!editMode ? (
                <Grid display="flex" alignItems="center" direction="row">
                  <VuiButton
                    onClick={() => {
                      setEditMode(true);
                    }}
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<EditIcon />}
                  ></VuiButton>
                </Grid>
              ) : (
                <Grid display="flex" alignItems="center" direction="row">
                  <VuiButton
                    onClick={() => {
                      handleSave(false);
                    }}
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<SaveIcon />}
                  ></VuiButton>
                </Grid>
              )}
            </>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EditFields;

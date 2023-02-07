import EditIcon from "@mui/icons-material/Edit";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import HourglassFullIcon from "@mui/icons-material/HourglassFull";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import SaveIcon from "@mui/icons-material/Save";
import { Grid, TextField, Button, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { green } from "@mui/material/colors";
import { setProfile } from "actions/profile.actions";
import VuiButton from "components/VuiButton";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileServices from "services/profile.services";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

const EditFields = (props) => {
  const classes = useStyles();  
  const service = ProfileServices();
  const { label, value, setInputValues } = props;
  const [inputValue, setInputValue] = useState(value);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const profileSelector = useSelector((state) => state.profile);

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleSave = (value) => {
    setLoading(true);
    async function handle() {
      try {
        const payload = {
          ...profileSelector.user,
          [label]: inputValue,
        };
        const response = await service.updatePersonalInfo(payload);
        if (response.status === 200) {
          dispatch(setProfile(payload));
          setEditMode(false);
          setLoading(false);
        }
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    handle();
  };

  return (
    <Grid container spacing={3}>
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
            fullWidth
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
            onChange={handleChange}
          />
        </Grid>
        <Grid display="flex" alignItems="center" direction="row">
          {loading ? (
            <VuiButton
              fullWidth
              variant="contained"
              color="primary"
              size="small"
              startIcon={<CircularProgress size={25} className={classes.buttonProgress} />}
              disabled={loading}
            ></VuiButton>
          ) : (
            <>
              {!editMode && loading === false ? (
                <VuiButton
                  onClick={() => {
                    setEditMode(true);
                  }}
                  variant="contained"
                  color="primary"
                  size="small"
                  startIcon={<EditIcon />}
                ></VuiButton>
              ) : (
                <VuiButton
                  onClick={() => {
                    handleSave(false);
                  }}
                  variant="contained"
                  color="primary"
                  size="small"
                  startIcon={<SaveIcon />}
                ></VuiButton>
              )}
            </>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EditFields;

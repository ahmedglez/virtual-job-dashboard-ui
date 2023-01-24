import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { Grid, TextField } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiButton from "components/VuiButton";
import VuiTypography from "components/VuiTypography/index";
import { useState } from "react";

const EditFields = (props) => {
  const { label, value } = props;
  const [editMode, setEditMode] = useState(false);
  return (
    <Grid item xs={12} xl={12} xxl={12}>
      <VuiBox
        display="flex"
        alignItems="center"
        justifyContent={{
          xs: "space-between",
          xl: "flex-start",
          xxl: "flex-start",
        }}
        mb={2}
      >
        <VuiBox display="flex" alignItems="center">
          <VuiTypography variant="h6" fontWeight="bold" color="white">
            {label}:
          </VuiTypography>
          <TextField
            key={0}
            disabled={!editMode[0]}
            id="outlined-basic"
            variant="outlined"
            value={value}
            sx={{
              width: "fit-content",
              maxWidth: {
                xs: "200px",
                xl: "300px",
              },
              borderRadius: "5px",
              backgroundColor: "#F5F5F5",
              marginLeft: "10px",
              marginRight: "10px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#F5F5F5",
                },
                "&:hover fieldset": {
                  borderColor: "#F5F5F5",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#F5F5F5",
                },
              },
            }}
          />
        </VuiBox>
        {!editMode[0] ? (
          <VuiButton
            onClick={() => setEditMode({ ...editMode, 0: !editMode[0] })}
            variant="contained"
            color="primary"
            size="small"
            startIcon={<EditIcon />}
          >
            Edit
          </VuiButton>
        ) : (
          <VuiButton
            onClick={() => setEditMode({ ...editMode, 0: !editMode[0] })}
            variant="contained"
            color="primary"
            size="small"
            startIcon={<SaveIcon />}
          >
            Save
          </VuiButton>
        )}
      </VuiBox>
    </Grid>
  );
};

export default EditFields;

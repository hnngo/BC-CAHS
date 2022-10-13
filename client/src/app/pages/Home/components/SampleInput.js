import React from "react";

import {
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem,
  TextareaAutosize,
  Button
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const SampleInput = ({ label, name, type = "text" }) => {
  const theme = useTheme();

  return (
    <Grid container direction={"row"} paddingY={1}>
      <Grid item xs={6} container justifyContent={"start"} alignItems={"center"} paddingX={5}>
        <Typography fontSize={18} color={theme.primary.dark}>
          {label}
        </Typography>
      </Grid>
      <Grid item xs={6} paddingX={2}>
        {type == "text" ? (
          <TextField
            name={name}
            fullWidth
            size="small"
            sx={{ backgroundColor: theme.primary.light }}
          />
        ) : type == "select" ? (
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={10}
            fullWidth
            sx={{ backgroundColor: theme.primary.light }}
            onChange={() => {}}>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        ) : type == "text-area" ? (
          <TextareaAutosize
            minRows={5}
            style={{ backgroundColor: theme.primary.light, width: "100%" }}
          />
        ) : (
          <Button variant="contained" fullWidth sx={{ backgroundColor: theme.primary.dark }}>
            Submit
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default SampleInput;

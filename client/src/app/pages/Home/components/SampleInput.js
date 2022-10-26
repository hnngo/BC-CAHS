import React from "react";

import {
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem,
  TextareaAutosize,
  Button,
  Checkbox,
  FormGroup,
  FormControlLabel,
  OutlinedInput,
  Box,
  Chip
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const SampleInput = ({
  label,
  name,
  type,
  labelStyle = {},
  options = {},
  placeholder = "",
  disableText = false
}) => {
  // This is for type select
  const [selectedOptions, setSelectedOptions] = React.useState([]);
  const theme = useTheme();

  const handleChangeSelect = (event) => {
    const {
      target: { value }
    } = event;
    setSelectedOptions(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <Grid container direction={"row"} paddingY={1}>
      <Grid
        item
        xs={type ? 5 : 12}
        container
        justifyContent={"start"}
        alignItems={"center"}
        paddingX={5}>
        <Typography fontSize={18} color={theme.primary.dark} sx={labelStyle}>
          {label}
        </Typography>
      </Grid>
      <Grid item xs={type ? 7 : 0} paddingX={2}>
        {type == "text" ? (
          <TextField
            name={name}
            fullWidth
            size="small"
            placeholder={placeholder}
            disabled={disableText}
            sx={{ backgroundColor: theme.primary.light }}
          />
        ) : type == "select" ? (
          <Select fullWidth sx={{ backgroundColor: theme.primary.light }} onChange={() => {}}>
            {Object.entries(options).map((option) => (
              <MenuItem key={option[0]} value={option[0]}>
                {option[1]}
              </MenuItem>
            ))}
          </Select>
        ) : type == "text-area" ? (
          <TextareaAutosize
            minRows={5}
            style={{ backgroundColor: theme.primary.light, width: "100%" }}
          />
        ) : type == "submit" ? (
          <Button variant="contained" fullWidth sx={{ backgroundColor: theme.primary.dark }}>
            Submit
          </Button>
        ) : type == "checkbox" ? (
          <FormGroup
            sx={{
              display: "flex",
              flexDirection: "row",
              backgroundColor: theme.primary.light,
              borderRadius: "5px",
              padding: "5px 10px",
              border: `1px solid ${theme.primary.standard}`
            }}>
            {Object.entries(options).map((option) => (
              <FormControlLabel key={option[0]} control={<Checkbox />} label={option[1]} />
            ))}
          </FormGroup>
        ) : type == "multi-select" ? (
          <FormGroup>
            <Select
              multiple
              value={selectedOptions}
              onChange={handleChangeSelect}
              input={<OutlinedInput id="select-multiple-chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={options[value]}
                      sx={{ backgroundColor: theme.primary.standard, color: theme.primary.dark }}
                    />
                  ))}
                </Box>
              )}
              sx={{ backgroundColor: theme.primary.light, color: theme.primary.dark }}
              MenuProps={MenuProps}>
              {Object.entries(options).map((option) => (
                <MenuItem key={option[0]} value={option[0]}>
                  {option[1]}
                </MenuItem>
              ))}
            </Select>
          </FormGroup>
        ) : (
          <div />
        )}
      </Grid>
    </Grid>
  );
};

export default SampleInput;
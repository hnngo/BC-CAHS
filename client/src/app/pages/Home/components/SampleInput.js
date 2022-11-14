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
  Chip,
  CircularProgress
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
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
  value,
  errorMessage,
  error,
  onChange = () => {},
  onClick = () => {},
  required,
  onSelectionUpdate,
  type,
  labelStyle = {},
  options = {},
  placeholder = "",
  disableText = false,
  submitText = "Submit",
  ...props
}) => {
  // This is for type select
  const [selectedOptions, setSelectedOptions] = React.useState([]);
  const theme = useTheme();

  React.useEffect(() => {
    if (type == "multi-select") {
      setSelectedOptions(value);
    }
  }, [value]);

  const handleChangeSelect = (event) => {
    const {
      target: { value: targetValue }
    } = event;
    setSelectedOptions(
      // On autofill we get a stringified value.
      typeof targetValue === "string" ? targetValue.split(",") : targetValue
    );
    onSelectionUpdate(event);
  };

  return (
    <Grid
      container
      direction={"row"}
      paddingY={1}
      sx={{
        ".DatePicker-Div": {
          width: "100%",
          backgroundColor: theme.primary.light,
          color: theme.primary.dark
        }
      }}>
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
            error={error}
            helperText={errorMessage}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            fullWidth
            size="small"
            placeholder={placeholder}
            disabled={disableText}
            sx={{ backgroundColor: theme.primary.light }}
          />
        ) : type == "select" ? (
          <Select
            defaultValue={value}
            value={value}
            fullWidth
            required={required}
            sx={{ backgroundColor: theme.primary.light }}
            onChange={onChange}>
            {Object.entries(options).map((option) => (
              <MenuItem key={option[0]} value={option[0]}>
                {option[1]}
              </MenuItem>
            ))}
          </Select>
        ) : type == "text-area" ? (
          <TextareaAutosize
            minRows={5}
            value={value}
            placeholder={placeholder}
            required={required}
            onChange={onChange}
            style={{ backgroundColor: theme.primary.light, width: "100%" }}
          />
        ) : type == "submit" ? (
          <Button
            variant="contained"
            fullWidth
            required={required}
            sx={{ backgroundColor: theme.primary.dark }}
            onClick={onClick}
            disabled={props.loading}>
            {submitText}
            {props.loading && <CircularProgress sx={{ marginLeft: "10px" }} size={"14px"} />}
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
              required={required}
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
        ) : type == "date" ? (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              className={"DatePicker-Div"}
              inputFormat="MM/DD/YYYY"
              value={value}
              required={required}
              closeOnSelect
              onChange={onChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        ) : type == "time" ? (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              className={"DatePicker-Div"}
              label={placeholder}
              required={required}
              value={value}
              onChange={onChange}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
        ) : type == "doubleInput" ? (
          <Grid container>
            <Grid xs={6} item>
              <TextField
                name={name + "_lower"}
                label={props.lowerText || "Lower"}
                value={value[0] || ""}
                onChange={onChange}
                required={required}
                fullWidth
                size="small"
                placeholder={placeholder}
                disabled={disableText}
                sx={{ backgroundColor: theme.primary.light }}
                {...props}
              />
            </Grid>
            <Grid xs={6} item>
              <TextField
                name={name + "_upper"}
                label={props.upperText || "Upper"}
                value={value[1] || ""}
                onChange={onChange}
                required={required}
                fullWidth
                size="small"
                placeholder={placeholder}
                disabled={disableText}
                sx={{ backgroundColor: theme.primary.light }}
                {...props}
              />
            </Grid>
          </Grid>
        ) : (
          <div />
        )}
      </Grid>
    </Grid>
  );
};

export default SampleInput;

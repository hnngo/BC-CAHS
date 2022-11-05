import * as React from "react";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Box
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const EditSampleDialog = ({ open, title, message, onClose = () => {} }) => {
  const theme = useTheme();

  return (
    <Dialog sx={{ zIndex: 999 }} open={open} onClose={onClose}>
      <Box width={"400px"} bgcolor={theme.primary.lighter}>
        {title && (
          <DialogTitle id="alert-dialog-title" color={theme.primary.dark}>
            {title}
          </DialogTitle>
        )}
        <DialogContent>
          <DialogContentText id="alert-dialog-description" color={theme.primary.dark}>
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onClose}
            variant="contained"
            sx={{ backgroundColor: theme.primary.dark }}>
            Okay
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default EditSampleDialog;

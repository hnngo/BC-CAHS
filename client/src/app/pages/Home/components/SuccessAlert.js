import * as React from "react";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog() {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };  

  const navigate = useNavigate();

  const navigateUser = () => {
    navigate("/login")
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"You have successfully signed up!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You may now login using your login credentials.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={navigateUser} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

import { Alert, Snackbar } from "@mui/material";
import React, { useState } from "react";

function AlertSucces() {
  const [open, setOpen] = useState(true);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Le contenue à bien été mis à jour.
        </Alert>
      </Snackbar>
    </div>
  );
}

export default AlertSucces;

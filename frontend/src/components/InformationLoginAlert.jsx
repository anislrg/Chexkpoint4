import { Alert, Snackbar } from "@mui/material";
import React, { useState } from "react";

function InformationLoginAlert() {
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
        <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
          Vous devez fournir un email ainsi qu'un mot de passe valide.
        </Alert>
      </Snackbar>
    </div>
  );
}

export default InformationLoginAlert;

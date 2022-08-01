import { Alert, Snackbar } from "@mui/material";
import React, { useState } from "react";

function WarningPreorder() {
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
        <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
          Il y a une erreur dans un des champs rempli
        </Alert>
      </Snackbar>
    </div>
  );
}

export default WarningPreorder;

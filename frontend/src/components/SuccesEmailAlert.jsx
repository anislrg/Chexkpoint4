import { Alert, Snackbar } from "@mui/material";
import React, { useState } from "react";

function SuccesEmailAlert() {
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
          Nous vous avons envoyé un mail et vous redirigeons...
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SuccesEmailAlert;

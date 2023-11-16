"use client";

import React from "react";
import { useSingersContext } from "../shared";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";


export const SnackBar = () => {
  const { snackBar } = useSingersContext();
  const { openSnackBar, message, handleCloseSnackBar } = snackBar ?? {};

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleCloseSnackBar}>
        Cerrar
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnackBar}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      open={openSnackBar}
      autoHideDuration={6000}
      onClose={handleCloseSnackBar}
      message={message}
      action={action}
    />
  );
};

"use client";

import { useState } from "react";

export interface UseSnackBarType {
  openSnackBar: boolean;
  message: string;
  handleClickSnackBar: (text: string) => void;
  handleCloseSnackBar: (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => void;
}

export const useSnackBar = (): UseSnackBarType => {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [message, setMessage] = useState("");

  const handleClickSnackBar = (text: string) => {
    setOpenSnackBar(true);
    setMessage(text);
  };

  const handleCloseSnackBar = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  return {
    openSnackBar,
    message,
    handleClickSnackBar,
    handleCloseSnackBar,
  };
};

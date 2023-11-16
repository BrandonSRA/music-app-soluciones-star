"use client";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import React from "react";
import { SingerType, useSingersContext } from "../shared";
import { ThemeProvider, createTheme } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export const TableMenu = ({ singer }: { singer: SingerType }) => {
  const { handlerDeleteSinger, handleOpenModal } = useSingersContext();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const theme = createTheme({
    palette: {
      text: {
        primary: "black",
      },
    },
  });
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        sx={{ color: "white" }}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </Button>
      <ThemeProvider theme={theme}>
        <Menu
          sx={{
            background: "rgba(28,28,28,0.51)",
            transition: "all 0.5s ease-in-out",
            opacity: 1.5,
            backdropFilter: "blur(5px)",
          }}
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              handleOpenModal("update", singer);
            }}
          >
            <EditIcon />
            Editar
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              singer.id ? handlerDeleteSinger(singer.id) : () => {};
            }}
          >
            <DeleteIcon />
            Eliminar
          </MenuItem>
        </Menu>
      </ThemeProvider>
    </div>
  );
};

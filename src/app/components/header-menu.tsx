"use client";

import { Stack, ThemeProvider, createTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useSingersContext } from "../shared";

export const HeaderMenu = () => {
  const { handleOpenModal } = useSingersContext();

  const button = createTheme({
    palette: {
      primary: {
        main: "rgba(59,69,170,0.65)",
      },
      secondary: {
        main: "#3caddd",
      },
    },
  });
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{
          background: "rgba(28,28,28,0.81)",
          backdropFilter: "blur(2px)",
        }}
        position="fixed"
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Cantantes
          </Typography>

          <ThemeProvider theme={button}>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                onClick={() => handleOpenModal("create")}
              >
                Crear
              </Button>
            </Stack>
          </ThemeProvider>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

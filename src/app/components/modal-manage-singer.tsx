"use client";

import React, { useEffect, useState } from "react";
import { SingerType, useSingersContext } from "../shared";
import clsx from "clsx";
import { styled, Box } from "@mui/system";
import { Modal as BaseModal } from "@mui/base/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
const initialState: SingerType = {
  name: "",
  gender: "",
  age: 0,
};

export default function ModalManageSinger() {
  const {
    openModalManage,
    typeCurrentModal,
    selectedSinger,
    loadingActionSinger,
    handleCloseModal,
    handlerCreateSinger,
    handlerUpdateSinger,
  } = useSingersContext();

  console.log({ selectedSinger });

  const [singer, setSinger] = useState<SingerType>(initialState);

  const isEnableToEdit = Object.keys(singer).some((key) => {
    return (
      selectedSinger?.[key as keyof SingerType] !==
      singer[key as keyof SingerType]
    );
  });

  const isEmptyData = Object.keys(singer).some((key) => {
    return (
      singer[key as keyof SingerType] === "" ||
      singer[key as keyof SingerType] === 0
    );
  });

  console.log(isEmptyData);

  useEffect(() => {
    if (selectedSinger) {
      setSinger(selectedSinger);
    } else {
      setSinger(initialState);
    }
  }, [selectedSinger]);

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const key = e.target.name;
    const value = e.target.value;
    const type = e.target.type;

    setSinger({
      ...singer,
      [key]: type === "number" ? Number(value) : value,
    });
  };

  return (
    <div>
      <Modal
        sx={{
          background: "rgba(28,28,28,0.51)",
          transition: "all 0.5s ease-in-out",
          opacity: 1.5,
          backdropFilter: "blur(5px)",
        }}
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={openModalManage}
        onClose={handleCloseModal}
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent sx={style}>
          <h3 id="unstyled-modal-title" className="modal-title">
            {typeCurrentModal === "create" ? "Crear" : "Editar"}
          </h3>
          <TextField
            required
            id="outlined-required"
            label="Nombre"
            variant="filled"
            placeholder="Ingresa el nombre del cantante"
            defaultValue={singer.name}
            onChange={handleOnChange}
            name="name"
            sx={{ input: { color: "#000" } }}
          />
          <TextField
            id="outlined-disabled"
            label="Edad"
            variant="filled"
            type="number"
            placeholder="Ingresa la edad del cantante"
            defaultValue={singer.age}
            onChange={handleOnChange}
            name="age"
            sx={{ input: { color: "#000" } }}
          />
          <TextField
            id="outlined-disabled"
            label="Genero Musical"
            variant="filled"
            placeholder="Ingresa el genero musical"
            defaultValue={singer.gender}
            onChange={handleOnChange}
            name="gender"
            sx={{ input: { color: "#000" } }}
          />
          <div className="flex gap-3 justify-end">
            <Button
              variant="contained"
              color="inherit"
              onClick={handleCloseModal}
            >
              cerrar
            </Button>
            <Button
              variant="contained"
              disabled={
                !isEnableToEdit || isEmptyData || loadingActionSinger
                  ? true
                  : false
              }
              color="success"
              onClick={() => {
                typeCurrentModal === "create"
                  ? handlerCreateSinger(singer, handleCloseModal)
                  : handlerUpdateSinger(singer);
              }}
            >
              {typeCurrentModal === "create" ? "Crear" : "Actualizar"}
            </Button>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
}

const Backdrop = React.forwardRef<
  HTMLDivElement,
  { open?: boolean; className: string }
>((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ "MuiBackdrop-open": open }, className)}
      ref={ref}
      {...other}
    />
  );
});

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 400,
};

const ModalContent = styled(Box)(
  ({ theme }) => `
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
  background-color: ${theme.palette.mode === "dark" ? grey[900] : "#FFF"};
  border-radius: 8px;
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 4px 12px ${
    theme.palette.mode === "dark" ? "rgba(0,0,0, 0.50)" : "rgba(0,0,0, 0.20)"
  };
  padding: 1rem;
  color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 500;
  text-align: start;
  position: relative;


  & .modal-title {
    margin: 0;
    line-height: 1.5rem;
    margin-right: 0.5rem;
  }

  & .modal-description {
    margin: 0;
    line-height: 1.5rem;
    font-weight: 400;
    color: ${theme.palette.mode === "dark" ? grey[400] : grey[800]};
  }
  `
);

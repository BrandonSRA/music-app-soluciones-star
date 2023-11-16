"use client";

import { useState, useEffect } from "react";
import { SingerType } from "../models";
import { UseSnackBarType, useSnackBar } from ".";

type ModalType = "create" | "update" | "";
export interface UseSingersType {
  singers: SingerType[];
  loading: boolean;
  openModalManage: boolean;
  typeCurrentModal: ModalType;
  selectedSinger: SingerType | null;
  loadingActionSinger: boolean;
  snackBar: UseSnackBarType;
  handlerCreateSinger: (singer: SingerType, callBack: () => void) => void;
  handlerDeleteSinger: (id: string) => void;
  handlerUpdateSinger: (singer: SingerType) => void;
  handlerGetAllSinger: () => void;
  handleOpenModal: (type: ModalType, singer?: SingerType) => void;
  handleCloseModal: () => void;
}

export const useSingers = (): UseSingersType => {
  const [singers, setSingers] = useState<SingerType[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingActionSinger, setLoadingActionSinger] = useState(false);
  const [typeCurrentModal, setTypeCurrentModal] = useState<ModalType>("");
  const [selectedSinger, setSelectedSinger] = useState<SingerType | null>(null);

  const [openModalManage, setOpenModalManage] = useState(false);

  const snackBar = useSnackBar();

  const { handleClickSnackBar } = snackBar ?? {};

  const handleOpenModal = (type: ModalType, singer?: SingerType) => {
    setTypeCurrentModal(type);
    setOpenModalManage(true);
    if (singer) setSelectedSinger(singer);
    else setSelectedSinger(null);
  };
  const handleCloseModal = () => setOpenModalManage(false);

  const handlerGetAllSinger = () => {
    fetch("/api/singers")
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setSingers(data);
      });
  };

  const handlerUpdateSinger = (singer: SingerType) => {
    console.log({ singer });
    setLoadingActionSinger(true);
    fetch(`/api/singers/${singer.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(singer),
    })
      .then((res) => res.json())
      .then((data: SingerType) => {
        setLoadingActionSinger(false);
        setSelectedSinger(data);
        handlerGetAllSinger();
        handleClickSnackBar("Singer updated successfully");
        console.log(data);
      })
      .catch((error) => {
        setLoadingActionSinger(false);
        handleClickSnackBar("Error updating singer");
        console.log(error);
      });
  };

  const handlerDeleteSinger = (id: string) => {
    fetch(`/api/singers/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        handlerGetAllSinger();
        handleClickSnackBar("Singer deleted successfully");
        console.log(data);
      });
  };

  const handlerCreateSinger = (singer: SingerType, callBack: () => void) => {
    setLoadingActionSinger(true);
    fetch(`/api/singers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(singer),
    })
      .then((res) => res.json())
      .then((data) => {
        callBack();
        setLoadingActionSinger(false);
        handlerGetAllSinger();
        handleClickSnackBar("Singer created successfully");
        console.log(data);
      })
      .catch((error) => {
        setLoadingActionSinger(false);
        handleClickSnackBar("Error creating singer");
        console.log(error);
      });
  };

  useEffect(() => {
    handlerGetAllSinger();
  }, []);

  return {
    singers,
    openModalManage,
    loading,
    typeCurrentModal,
    selectedSinger,
    loadingActionSinger,
    snackBar,
    handlerCreateSinger,
    handlerDeleteSinger,
    handlerUpdateSinger,
    handlerGetAllSinger,
    handleOpenModal,
    handleCloseModal,
  };
};

"use client";

import { useState, useEffect } from "react";
import { SingerType } from "../models";

export interface UseSingersType {
  singers: SingerType[];
}

export const useSingers = (): UseSingersType => {
  const [singers, setSingers] = useState<SingerType[]>([]);

  const handlerGetAllSinger = () => {
    fetch("/api/singers")
      .then((res) => res.json())
      .then((data) => setSingers(data));
  };

  useEffect(() => {
    handlerGetAllSinger();
  }, []);

  return {
    singers,
  };
};

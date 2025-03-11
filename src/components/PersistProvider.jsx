"use client";

import { persistor } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { Loader } from "./Loader";

export const PersistProvider = ({ children }) => {
  return (
    <PersistGate loading={<Loader />} persistor={persistor}>
      {children}
    </PersistGate>
  );
};

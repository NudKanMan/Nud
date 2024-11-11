// /src/app/contexts/ModalContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type ModalType = "none" | "createActivity" | "menu" | "profile";

interface ModalContextType {
  activeModal: ModalType;
  openModal: (modalType: ModalType) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [activeModal, setActiveModal] = useState<ModalType>("none");

  const openModal = (modalType: ModalType) => setActiveModal(modalType);
  const closeModal = () => setActiveModal("none");

  return (
    <ModalContext.Provider value={{ activeModal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
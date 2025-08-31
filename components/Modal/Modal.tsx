"use client";

import { useState, useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  const [modalRoot, setModalRoot] = useState<Element | null>(null);

  useEffect(() => {
    // Ця функція буде виконуватися тільки на клієнті
    function ensureModalRoot() {
      let root = document.getElementById("modal-root");
      if (!root) {
        root = document.createElement("div");
        root.setAttribute("id", "modal-root");
        document.body.appendChild(root);
      }
      return root;
    }

    setModalRoot(ensureModalRoot());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  if (!modalRoot) {
    return null; // Не рендеримо, поки `modalRoot` не визначено на клієнті
  }

  return createPortal(
    <div className={css.backdrop} role="dialog" aria-modal="true" onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    modalRoot
  );
}

import modal from "./modal.module.css";
import ReactDOM from "react-dom";
import { ModalOverlay } from "../ModalOverlay/modalOverlay";
import React from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";
//без проверки на null
const modalRoot = document.getElementById("react-modals")!;

interface IModal {
  onClose: () => void;
  title: string;
  type?: string;
}

export const Modal: FC<IModal> = (props) => {
  const escButtonClose = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      props.onClose();
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", escButtonClose);
    return () => {
      document.removeEventListener("keydown", escButtonClose);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className={modal.wrapper}>
        <div className={modal.popup}>
          <div className={"pl-10 pt-10 pr-10 " + modal.header}>
            <div>
              <h2 className={"text text_type_main-large "}>{props.title}</h2>
            </div>
            <div className={modal.close}>
              <CloseIcon onClick={props.onClose} type="primary" />
            </div>
          </div>
          {props.children}
        </div>
        <ModalOverlay onClose={props.onClose} />
      </div>
    </>,
    modalRoot
  );
};

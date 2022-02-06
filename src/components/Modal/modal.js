import modal from "./modal.module.css";
import ReactDOM from "react-dom";
import { ModalOverlay } from "../ModalOverlay/modalOverlay.js";
import React from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("react-modals");

export const Modal = (props) => {
  const escButtonClose = (e) => {
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
            <h2 className={"text text_type_main-large "}>{props.title}</h2>
            <div className={modal.close}>
              <CloseIcon onClick={props.onClose} />
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

Modal.propTypes = {
  onClose: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.element,
};

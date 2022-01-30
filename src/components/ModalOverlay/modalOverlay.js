import modalOverlay from "./modalOverlay.module.css";
import PropTypes from "prop-types";

export const ModalOverlay = (props) => {
  return (
    <section className={modalOverlay.section} onClick={props.onClose}>
      {props.children}
    </section>
  );
};

ModalOverlay.PropType = {
  onClose: PropTypes.func,
  children: PropTypes.element,
};

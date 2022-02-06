import modalOverlay from "./modalOverlay.module.css";
import PropTypes from "prop-types";

export const ModalOverlay = (props) => {
  return (
    <div className={modalOverlay.main} onClick={props.onClose}></div>
  );
};
ModalOverlay.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.element,
};

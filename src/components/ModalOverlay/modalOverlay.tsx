import modalOverlay from "./modalOverlay.module.css";
import { FC } from 'react';

interface IModalOverlayProps {
  onClose: () => void;
}

export const ModalOverlay: FC<IModalOverlayProps> = ({ onClose })=> {
  return (
    <div className={modalOverlay.main} onClick={onClose}>
    </div>
  );
};




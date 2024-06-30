import DefaultModal from 'react-modal';
import { FC, ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  children: ReactNode | ReactNode[];
  onRequestClose: () => void;
}

export const Modal: FC<ModalProps> = ({ isOpen, children, onRequestClose }) => {
  return (
    <DefaultModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal-content"
      appElement={document.getElementById('root')}
      overlayClassName="modal-overlay">
      {children}
    </DefaultModal>
  );
};

import { Button } from '@components/Button';
import { Modal } from '@components/Modal';
import { FC } from 'react';

interface DialogProps {
  isOpen: boolean;
  onRequestClose: () => void;
  title: string;
  text: string;
}

export const Dialog: FC<DialogProps> = ({
  isOpen,
  title,
  text,
  onRequestClose,
}) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <div className="flex flex-col items-center">
        <h2 className="text-2xl">{title}</h2>
        <p className="text-gray-500 my-4">{text}</p>
        <Button onClick={onRequestClose}>OK</Button>
      </div>
    </Modal>
  );
};

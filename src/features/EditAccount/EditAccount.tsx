import { User } from '@/types';
import { UpdatePasswordForm } from '@features/EditAccount/UpdatePasswordForm';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { FC } from 'react';

interface EditAccountProps {
  user: User;
  onEdit: () => void;
}

export const EditAccount: FC<EditAccountProps> = ({ user, onEdit }) => {
  return (
    <div className="flex flex-col">
      <button
        className="w-6 h-6 mb-4"
        onClick={onEdit}>
        <ArrowLeftIcon className="w-6 h-6" />
      </button>
      <UpdatePasswordForm />
    </div>
  );
};

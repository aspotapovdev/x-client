import { PATHNAMES } from '@constants/pathnames.ts';
import { PulseLoader } from 'react-spinners';
import { Dialog } from '@components/Dialog';
import { AuthService } from '@services/AuthService.ts';
import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router';

interface ConfirmEmailPageProps {}

export const ConfirmEmailPage: FC<ConfirmEmailPageProps> = () => {
  const location = useLocation();
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const confirm = async () => {
      try {
        const token = new URLSearchParams(location.search).get('token') || '';
        await AuthService.confirmEmail(token);
        setIsOpenSuccessModal(true);
      } catch (error) {
        setLoading(false);
        setShowErrorMessage(true);
      }
    };
    confirm();
  }, [location.search]);

  const handleSuccessModalClose = () => {
    setIsOpenSuccessModal(false);
    window.location.href = PATHNAMES.root;
  };

  return (
    <>
      {loading && (
        <div className="w-full h-screen flex justify-center items-center">
          <PulseLoader color="#1d6187" size={20} />
        </div>
      )}
      <Dialog
        isOpen={isOpenSuccessModal}
        title="Email подтвержден"
        text="Войдите в аккаунт используя свои данные при регистрации."
        onRequestClose={handleSuccessModalClose}
      />
      {showErrorMessage && (
        <div className="h-screen flex flex-col items-center justify-center">
          <h1 className="font-bold text-lg">Ошибка подтверждения email</h1>
          <p>
            Произошла ошибка при подтверждении email. Попробуйте снова или
            обратитесь в службу поддержки.
          </p>
        </div>
      )}
    </>
  );
};

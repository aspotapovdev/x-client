import { Avatar } from '@components/Avatar';
import { Button } from '@components/Button';
import { FC, useState, useRef, useEffect, ChangeEvent } from 'react';
import { ReactComponent as EmptyUserAvatar } from '@/assets/empty-user-avatar.svg';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { SIGN_UP_FIELD_NAMES, SignUpFormValues } from '@/types';
import AvatarEditor from 'react-avatar-editor';
import { Modal } from '@/components/Modal';

interface AvatarUploadProps {
  register: UseFormRegister<SignUpFormValues>;
  setValue: UseFormSetValue<SignUpFormValues>;
  isSuccessfulUpload: boolean;
  errorMessage?: string;
}

export const AvatarUpload: FC<AvatarUploadProps> = ({
  register,
  setValue,
  isSuccessfulUpload,
}) => {
  const hiddenInputRef = useRef(null);
  const editorRef = useRef<AvatarEditor | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [scale, setScale] = useState<number>(2);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (isSuccessfulUpload) {
      setFile(null);
      setPreview(null);
    }
  }, [isSuccessfulUpload]);

  const handleUploadedFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setIsModalOpen(true);
    }
  };

  const handleScaleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setScale(parseFloat(event.target.value));
  };

  const handleSave = () => {
    if (editorRef.current && editorRef.current instanceof AvatarEditor) {
      const canvas = editorRef.current.getImage();
      canvas.toBlob((blob) => {
        if (blob) {
          const avatarFile = new File([blob], 'avatar.png', {
            type: 'image/png',
          });

          setValue(SIGN_UP_FIELD_NAMES.avatar, avatarFile);

          setPreview(URL.createObjectURL(avatarFile));
        }
      });
    }
    setIsModalOpen(false);
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className="flex flex-col items-center w-full">
      <label className="btn" htmlFor="avatar-upload-input">
        {preview ? (
          <Avatar preview={preview} />
        ) : (
          <EmptyUserAvatar className="mt-4 w-32 h-32" />
        )}
      </label>
      <input
        id="avatar-upload-input"
        type="file"
        className="hidden"
        accept="image/*"
        {...register(SIGN_UP_FIELD_NAMES.avatar, {
          onChange: handleUploadedFile,
        })}
        ref={hiddenInputRef}
      />
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        {file && (
          <div className="flex flex-col items-center">
            <AvatarEditor
              ref={editorRef}
              image={file}
              width={250}
              height={250}
              border={50}
              borderRadius={100}
              scale={scale}
            />
            <input
              type="range"
              min="1"
              max="2"
              step="0.01"
              value={scale}
              onChange={handleScaleChange}
              className="mt-4 w-full"
            />
            <div className="flex gap-4 w-full mt-6">
              <Button className="w-full" onClick={() => setIsModalOpen(false)}>
                Отмена
              </Button>
              <Button className="w-full" onClick={handleSave}>
                Сохранить
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

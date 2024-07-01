import { Avatar } from '@components/Avatar';
import { Button } from '@components/Button';
import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { ReactComponent as EmptyUserAvatar } from '@/assets/empty-user-avatar.svg';
import {
  FieldValues,
  Path,
  PathValue,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import AvatarEditor from 'react-avatar-editor';
import { Modal } from '@/components/Modal';

interface AvatarUploadProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  setValue: UseFormSetValue<T>;
  isSuccessfulUpload: boolean;
  errorMessage?: string;
  initialAvatarUrl?: string;
  fieldName: Path<T>;
  isEditable?: boolean;
}

export const AvatarUpload = <T extends FieldValues>({
  register,
  setValue,
  isSuccessfulUpload,
  initialAvatarUrl,
  fieldName,
  isEditable,
  errorMessage,
}: AvatarUploadProps<T>) => {
  const hiddenInputRef = useRef(null);
  const editorRef = useRef<AvatarEditor | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [scale, setScale] = useState<number>(1.5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(
    initialAvatarUrl || null
  );

  useEffect(() => {
    if (isSuccessfulUpload) {
      setFile(null);
      if (!initialAvatarUrl) {
        setPreview(null);
      }
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

          setValue(fieldName, avatarFile as PathValue<T, Path<T>>);

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
      <label className="cursor-pointer" htmlFor="avatar-upload-input">
        {preview ? (
          <Avatar preview={preview} isEditable={isEditable} />
        ) : (
          <EmptyUserAvatar className="mt-4 w-32 h-32" />
        )}
      </label>
      {errorMessage && (
        <span className="text-xs text-red-500">{errorMessage}</span>
      )}
      <input
        id="avatar-upload-input"
        type="file"
        className="hidden"
        accept="image/*"
        {...register(fieldName, {
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

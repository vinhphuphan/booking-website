"use client";

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    setShowModal(false);
    onClose();
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if ((disabled && secondaryAction) || typeof secondaryAction != "function") {
      return;
    }
    secondaryAction();
  }, [disabled, secondaryAction]);

  const handleOverlayClick = useCallback((event : React.MouseEvent<HTMLDivElement>) => {
    const targetClassList = (event.target as HTMLElement).classList;
    if (
        targetClassList.contains("modal-overlay") ||
        targetClassList.contains("modal-container")
        ) {
            handleClose();
        }
  }, [handleClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Modal Overlay */}
      <div onClick={handleOverlayClick} className="modal-overlay flex items-center justify-center fixed w-full inset-0 z-50 overflow-hidden bg-neutral-800/70">
        {/* Modal Container */}
        <div
          className={`
                modal-container
                flex flex-col items-center justify-center
                w-full p-10 h-full
                translate duration-300
                ${
                  showModal
                    ? "translate-y-0 opacity-100"
                    : "translate-y-full opacity-0"
                }
                `}
        >
          {/* Modal Header */}
          <header
            className="
                    relative
                    w-full md:w-4/6 xl:w-2/6
                    h-auto
                    flex flex-row items-center justify-center
                    bg-white rounded-t-xl py-4 border-b-[1px] 
                    "
          >
            <div onClick={handleClose} className="absolute left-4 p-2 rounded-full hover:bg-neutral-100 transition">
              <IoMdClose size={20} />
            </div>
            <div className="text-lg font-bold">{title}</div>
          </header>
          {/* Modal Main Content */}
          <div
            className="
            flex flex-col gap-8
            w-full md:w-4/6 xl:w-2/6
            h-auto
            bg-white rounded-b-xl px-6 py-4 
            "
          >
            {/* Modal Body */}
            {body}
            <div className="flex flex-row items-center gap-4 mt-4">
              {/* Button */}
            {secondaryAction && secondaryActionLabel && (
              <Button
                outline
                disabled={disabled}
                onClick={secondaryAction}
                label={secondaryActionLabel}
              />
            )}
            <Button
              disabled={disabled}
              onClick={onSubmit}
              label={actionLabel}
            />
            </div>
            {/* Modal footer */}
            {footer}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;

"use client";

import { IconType } from "react-icons";

interface ButtonForSmallScreenProps {
  label?: string;
  onClick: () => void;
  disabled?: boolean;
  icon?: IconType;
  iconStyle?: {};
}

const ButtonForSmallScreen: React.FC<ButtonForSmallScreenProps> = ({
  label,
  onClick,
  disabled,
  icon: Icon,
  iconStyle,
}) => {
  return (
    <button onClick={onClick} className="flex flex-col gap-1">
      {Icon && (
        <div className="flex items-center justify-center w-full text-neutral-700">
          <Icon size={20} />
        </div>
      )}

      <div className="text-neutral-700 text-xs">{label}</div>
    </button>
  );
};

export default ButtonForSmallScreen;

import { ButtonHTMLAttributes, FC, ReactNode, MouseEventHandler } from 'react';
import classNames from 'classnames';

interface ButtonProps {
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = ({
  type,
  children,
  onClick,
  className,
  variant = 'primary',
  size = 'md',
  disabled = false,
}) => {
  const baseStyles =
    'font-semibold h-14 px-5 py-3 rounded-lg focus:outline-none focus:shadow-outline';

  const variantStyles: Record<
    'primary' | 'secondary' | 'success' | 'danger',
    string
  > = {
    primary: 'bg-cornflower-600 hover:bg-cornflower-700 text-white',
    secondary: 'bg-gray-400 hover:bg-gray-600 text-white',
    success: 'bg-green-500 hover:bg-green-700 text-white',
    danger: 'bg-red-500 hover:bg-red-700 text-white',
  };

  const sizeStyles: Record<'sm' | 'md' | 'lg', string> = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-lg',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className,
        { 'opacity-50 cursor-not-allowed': disabled }
      )}
      disabled={disabled}>
      {children}
    </button>
  );
};

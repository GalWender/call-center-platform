import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  label?: string;
  children?: ReactNode;
}

export const IconButton = ({ icon, label, children, className = '', ...rest }: IconButtonProps) => {
  const ariaLabel = label || rest.title || icon;
  const btnClass = `icon-button${className ? ` ${className}` : ''}`;
  return (
    <button type="button" aria-label={ariaLabel} className={btnClass} {...rest}>
      <span className="material-symbols-rounded" aria-hidden="true">
        {icon}
      </span>
      {children}
    </button>
  );
};

export default IconButton;

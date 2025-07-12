import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

interface BaseProps {
  children: ReactNode;

  selected?: boolean;
  className?: string;
}

type PillAsSpan = BaseProps &
  HTMLAttributes<HTMLSpanElement> & {
    as?: 'span';
  };

type PillAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as: 'button';
  };

type TagPillProps = PillAsSpan | PillAsButton;

export const TagPill = ({
  as = 'span',
  selected,
  className = '',
  children,
  ...rest
}: TagPillProps) => {
  const cls = `tag-pill${selected ? ' selected' : ''}${className ? ` ${className}` : ''}`;
  if (as === 'button') {
    return (
      <button type="button" className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
        {children}
      </button>
    );
  }

  return (
    <span className={cls} {...(rest as HTMLAttributes<HTMLSpanElement>)}>
      {children}
    </span>
  );
};

export default TagPill;

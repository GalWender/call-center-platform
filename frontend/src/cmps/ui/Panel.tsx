import type { HTMLAttributes, ReactNode } from 'react';

interface PanelProps extends HTMLAttributes<HTMLElement> {
  title: string;
  children: ReactNode;
  className?: string;
}

export const Panel = ({ title, children, className = '', ...rest }: PanelProps) => (
  <section className={`panel ${className}`.trim()} {...rest}>
    <h2 className="panel-title">{title}</h2>
    {children}
  </section>
);

export default Panel;

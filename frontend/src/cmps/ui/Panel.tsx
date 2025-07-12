import type { HTMLAttributes, ReactNode } from 'react';

interface PanelProps extends HTMLAttributes<HTMLElement> {
  title: string;
  children: ReactNode;
  className?: string;
  actions?: ReactNode;
}

export const Panel = ({ title, children, className = '', actions, ...rest }: PanelProps) => (
  <section className={`panel ${className}`.trim()} {...rest}>
    <header className="panel-header">
      <h2 className="panel-title">{title}</h2>
      {actions}
    </header>
    {children}
  </section>
);

export default Panel;

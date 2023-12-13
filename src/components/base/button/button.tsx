import clsx from 'clsx';
import { forwardRef } from 'react';

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {}

export const ButtonComponent = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ ...props }, ref) => {
    return <button ref={ref} className={clsx('button-container')} {...props} />;
  },
);

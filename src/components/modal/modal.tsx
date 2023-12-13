import clsx from 'clsx';
import { forwardRef } from 'react';
import Portal from '../base/portal';

interface ModalProps {
  id: string;
  children?: React.ReactNode;
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
  open: boolean;
  onClose?: () => void;
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ id, children, open, className }, ref) => {
    return (
      <Portal wrapperId={id}>
        <div
          ref={ref}
          className={clsx('modal-container', { show: open }, className)}
        >
          {children}
        </div>
      </Portal>
    );
  },
);

Modal.displayName = 'Modal';
export default Modal;

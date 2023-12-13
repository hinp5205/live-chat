import clsx from 'clsx';
import { forwardRef } from 'react';
import './input.scss';

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  formRef?: React.RefObject<HTMLFormElement>;
  error?: boolean;
  errorText?: string;
}

export const InputComponent = forwardRef<HTMLInputElement, InputProps>(
  ({ formRef, className, error, errorText, ...rest }, ref) => {
    const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.keyCode === 13) {
        e.preventDefault();
        e.stopPropagation();
        formRef?.current?.dispatchEvent(new Event('submit', { bubbles: true }));
      }
    };

    return (
      <div className='input-container'>
        <input
          {...rest}
          ref={ref}
          onKeyDown={onEnterPress}
          className={clsx('input', className)}
        />
        {error && (
          <div className='error'>
            <small>{errorText}</small>
          </div>
        )}
      </div>
    );
  },
);

InputComponent.displayName = 'Input';

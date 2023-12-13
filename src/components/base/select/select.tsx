import clsx from 'clsx';
import { forwardRef } from 'react';

interface Options {
  label: string;
  value: string | number;
}

interface SelectProps extends React.HTMLProps<HTMLSelectElement> {
  options: Options[];
}

export const SelectComponent = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, placeholder, ...props }, ref) => {
    return (
      <div className={clsx('select-container', className)}>
        <select ref={ref} {...props}>
          {[
            {
              label: placeholder,
              value: '',
            },
            ...options,
          ].map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  },
);

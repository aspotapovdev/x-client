import { forwardRef } from 'react';
import cn from 'classnames';

interface TextFieldProps {}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      type = 'text',
      placeholder,
      classes,
      required = false,
      errorMessage,
      ...inputProps
    },
    ref
  ) => {
    return (
      <div className={cn('flex flex-col relative w-full', classes)}>
        {label && (
          <label className="label">
            {label}
            {required && <span className="ml-0.5 text-red-500">*</span>}
          </label>
        )}
        <input
          {...inputProps}
          type={type}
          placeholder={placeholder}
          ref={ref}
          className={cn('input', {
            ['border-error']: Boolean(errorMessage),
          })}
        />
        <span className="text-xs text-red-500">{errorMessage}</span>
      </div>
    );
  }
);

TextField.displayName = 'TextField';

export { TextField };

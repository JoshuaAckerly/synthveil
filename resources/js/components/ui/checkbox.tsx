import { cn } from '@/lib/utils';
import { forwardRef, InputHTMLAttributes } from 'react';

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement>;

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ className, ...props }, ref) => {
        return (
            <input
                type="checkbox"
                className={cn(
                    'h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:focus:ring-indigo-400',
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Checkbox.displayName = 'Checkbox';

export { Checkbox };

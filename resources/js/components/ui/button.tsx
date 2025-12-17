import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'default', size = 'md', asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button';
        return (
            <Comp
                className={cn(
                    'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                    {
                        'bg-indigo-600 text-white hover:bg-indigo-700': variant === 'default',
                        'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700': variant === 'secondary',
                        'border border-gray-300 bg-transparent hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800': variant === 'outline',
                        'hover:bg-gray-100 dark:hover:bg-gray-800': variant === 'ghost',
                        'h-8 px-3 text-sm': size === 'sm',
                        'h-10 px-4': size === 'md',
                        'h-12 px-6 text-lg': size === 'lg',
                    },
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);

Button.displayName = 'Button';

export { Button };

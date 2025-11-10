import { cn } from '@/lib/utils';
import { createContext, forwardRef, HTMLAttributes, useContext, useId } from 'react';

interface FormFieldContextValue {
    id: string;
    name: string;
    error?: string;
}

const FormFieldContext = createContext<FormFieldContextValue>({} as FormFieldContextValue);

interface FormFieldProps {
    name: string;
    error?: string;
    children: React.ReactNode;
}

const FormField = ({ name, error, children }: FormFieldProps) => {
    const id = useId();
    
    return (
        <FormFieldContext.Provider value={{ id, name, error }}>
            <div className="space-y-2">
                {children}
            </div>
        </FormFieldContext.Provider>
    );
};

const FormLabel = forwardRef<HTMLLabelElement, HTMLAttributes<HTMLLabelElement>>(
    ({ className, ...props }, ref) => {
        const { id } = useContext(FormFieldContext);
        
        return (
            <label
                ref={ref}
                htmlFor={id}
                className={cn('text-sm font-medium text-gray-700 dark:text-gray-300', className)}
                {...props}
            />
        );
    }
);
FormLabel.displayName = 'FormLabel';

const FormControl = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ ...props }, ref) => {
        const { id, name, error } = useContext(FormFieldContext);
        
        return (
            <div ref={ref} {...props}>
                {props.children && 
                    typeof props.children === 'object' && 
                    'props' in props.children
                        ? {
                            ...props.children,
                            props: {
                                ...props.children.props,
                                id,
                                name,
                                'aria-invalid': error ? 'true' : 'false',
                                'aria-describedby': error ? `${id}-error` : undefined,
                            }
                        }
                        : props.children
                }
            </div>
        );
    }
);
FormControl.displayName = 'FormControl';

const FormMessage = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
    ({ className, children, ...props }, ref) => {
        const { error, id } = useContext(FormFieldContext);
        const body = error || children;
        
        if (!body) return null;
        
        return (
            <p
                ref={ref}
                id={`${id}-error`}
                className={cn('text-sm text-red-500', className)}
                {...props}
            >
                {body}
            </p>
        );
    }
);
FormMessage.displayName = 'FormMessage';

export { FormField, FormLabel, FormControl, FormMessage };
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

// Mock @radix-ui/react-slot (Slot component)
vi.mock('@radix-ui/react-slot', () => ({
    Slot: ({ children, ...props }: React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }) =>
        React.cloneElement(children as React.ReactElement, props),
}));

describe('Button', () => {
    it('renders a button element by default', () => {
        render(<Button>Click me</Button>);
        expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
    });

    it('applies default variant class', () => {
        render(<Button>Submit</Button>);
        expect(screen.getByRole('button')).toHaveClass('bg-indigo-600');
    });

    it('applies secondary variant', () => {
        render(<Button variant="secondary">Cancel</Button>);
        expect(screen.getByRole('button')).toHaveClass('bg-gray-100');
    });

    it('applies outline variant', () => {
        render(<Button variant="outline">Outline</Button>);
        expect(screen.getByRole('button')).toHaveClass('border');
    });

    it('applies small size class', () => {
        render(<Button size="sm">Small</Button>);
        expect(screen.getByRole('button')).toHaveClass('h-8');
    });

    it('applies large size class', () => {
        render(<Button size="lg">Large</Button>);
        expect(screen.getByRole('button')).toHaveClass('h-12');
    });

    it('fires onClick handler', async () => {
        const user = userEvent.setup();
        const handleClick = vi.fn();
        render(<Button onClick={handleClick}>Click</Button>);
        await user.click(screen.getByRole('button'));
        expect(handleClick).toHaveBeenCalledOnce();
    });

    it('is disabled when disabled prop is set', () => {
        render(<Button disabled>Disabled</Button>);
        expect(screen.getByRole('button')).toBeDisabled();
    });
});

describe('Input', () => {
    it('renders an input element', () => {
        render(<Input placeholder="Enter text" />);
        expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });

    it('accepts typed input', async () => {
        const user = userEvent.setup();
        render(<Input placeholder="Type here" />);
        const input = screen.getByPlaceholderText('Type here');
        await user.type(input, 'hello');
        expect(input).toHaveValue('hello');
    });

    it('applies type attribute', () => {
        render(<Input type="email" placeholder="email" />);
        expect(screen.getByPlaceholderText('email')).toHaveAttribute('type', 'email');
    });

    it('is disabled when disabled prop is set', () => {
        render(<Input disabled placeholder="disabled" />);
        expect(screen.getByPlaceholderText('disabled')).toBeDisabled();
    });
});

describe('Card', () => {
    it('renders children', () => {
        render(<Card><span>content</span></Card>);
        expect(screen.getByText('content')).toBeInTheDocument();
    });

    it('applies rounded border class', () => {
        const { container } = render(<Card />);
        expect(container.firstChild).toHaveClass('rounded-lg');
    });

    it('merges className', () => {
        const { container } = render(<Card className="custom-class" />);
        expect(container.firstChild).toHaveClass('custom-class');
    });
});

describe('CardHeader + CardTitle + CardContent', () => {
    it('renders card with header and title', () => {
        render(
            <Card>
                <CardHeader>
                    <CardTitle>My Card</CardTitle>
                </CardHeader>
                <CardContent><p>Body text</p></CardContent>
            </Card>
        );
        expect(screen.getByText('My Card')).toBeInTheDocument();
        expect(screen.getByText('Body text')).toBeInTheDocument();
    });
});

describe('Textarea', () => {
    it('renders a textarea element', () => {
        render(<Textarea placeholder="Write here" />);
        expect(screen.getByPlaceholderText('Write here')).toBeInTheDocument();
    });

    it('accepts typed input', async () => {
        const user = userEvent.setup();
        render(<Textarea placeholder="Write" />);
        const textarea = screen.getByPlaceholderText('Write');
        await user.type(textarea, 'hello world');
        expect(textarea).toHaveValue('hello world');
    });
});

import React from 'react';

type ButtonSize = 'large' | 'default-size' | 'small';
type ButtonVariant = 'primary' | 'default' | 'secondary' | 'text' | 'icon';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * The size of the button.
     * @default 'default-size'
     */
    size?: ButtonSize;
    /**
     * The visual emphasis of the button.
     * @default 'default'
     */
    variant?: ButtonVariant;
    /**
     * Optional leading icon. For the icon variant, this is the only content.
     */
    icon?: React.ReactNode;
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

export { Button, type ButtonProps, type ButtonSize, type ButtonVariant };

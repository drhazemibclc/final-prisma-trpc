import { cn } from '@/lib/utils';

import type { ButtonProperties } from '../ui/button';
import { Button as SCN_Button } from '../ui/button';
import type { TLucideIconName } from './lucide';
import LucideIcon from './lucide';

type TButton = ButtonProperties & {
    iconNameLeft?: TLucideIconName;
    iconNameRight?: TLucideIconName;
    isLoading?: boolean;
};

export default function Button({
    iconNameLeft,
    iconNameRight,
    isLoading,
    children,
    className,
    disabled,
    ...otherProperties
}: TButton) {
    return (
        <SCN_Button
            aria-busy={isLoading}
            aria-disabled={isLoading || disabled}
            className={cn('w-full gap-x-1 font-semibold', className)}
            disabled={isLoading || disabled}
            {...otherProperties}
        >
            {/* Always show the loader icon on the left, when in loading */}
            {isLoading && (
                <Icon
                    iconName='Loader'
                    isLoading
                />
            )}

            {/* Show the icon on the left, when not in loading */}
            {!isLoading && iconNameLeft && <Icon iconName={iconNameLeft} />}

            {children}

            {/* Show the icon on the right, when not in loading */}
            {!isLoading && iconNameRight && <Icon iconName={iconNameRight} />}
        </SCN_Button>
    );
}

type TIcon = {
    iconName: TLucideIconName;
    isLoading?: boolean;
};

function Icon({ iconName, isLoading }: Readonly<TIcon>) {
    return (
        <LucideIcon
            aria-hidden='true'
            className={cn('', { 'animate-spin': isLoading })}
            name={isLoading ? 'Loader' : iconName}
        />
    );
}

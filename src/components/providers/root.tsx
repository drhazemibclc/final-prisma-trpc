import type { PropsWithChildren } from 'react';

import { AuthProvider } from '@/components/providers/auth-provider';
import ThemeProvider from '@/components/providers/theme-provider';
import { TRPCProvider } from '@/components/providers/trpc-provider';

type TRootProvider = PropsWithChildren;

export default function RootProvider({ children }: Readonly<TRootProvider>) {
    return (
        <AuthProvider auth={null}>
            <ThemeProvider>
                <TRPCProvider>{children}</TRPCProvider>
            </ThemeProvider>
        </AuthProvider>
    );
}

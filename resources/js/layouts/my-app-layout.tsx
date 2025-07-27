import { LeftSidebar } from '@/components/feed/LeftSidebar';
import { MainNavbar } from '@/components/feed/MainNavbar';
import { Toaster } from '@/components/ui/sonner';
import { ReactNode } from 'react';

interface MyAppLayoutProps {
    children: ReactNode;
}

export default function MyAppLayout({ children }: MyAppLayoutProps) {
    return (
        <>
            <MainNavbar />
            <main className="flex min-h-[calc(100vh-56px)] justify-center bg-gray-50 py-6">
                <div className="flex w-full max-w-7xl gap-8">
                    <LeftSidebar />
                    <div className="ml-0 flex max-w-2xl flex-1 flex-col gap-6 md:mr-[336px] md:ml-[336px]">{children}</div>
                </div>
            </main>
            <Toaster position="top-center" />
        </>
    );
}

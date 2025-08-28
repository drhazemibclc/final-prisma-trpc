import Image from "next/image";
import type React from "react";

interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    return (
        <div className="flex h-screen w-full">
            {/* Left side: form/content */}
            <div className="flex w-full flex-1 items-center justify-center p-6 md:w-1/2">{children}</div>

            {/* Right side: image and overlay */}
            <div className="relative hidden h-full w-1/2 md:flex">
                <Image
                    src="/images/clinic.webp"
                    alt="Doctors at clinic"
                    fill
                    className="object-cover"
                    priority
                />

                {/* Overlay */}
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-t from-black/70 via-black/30 to-transparent px-4 text-center">
                    {/* <h1 className='font-bold text-4xl text-white sm:text-5xl md:text-6xl 2xl:text-7xl'>Smart Clinic</h1>
                    <p className='mt-4 text-blue-400 text-lg sm:text-xl'>You're welcome</p> */}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;

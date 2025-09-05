'use client'

import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {usePathname} from "next/navigation";

interface LoadingContextType {
    isLoading: boolean;
    showLoading: () => void;
    hideLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({children}: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const pathname = usePathname();

    const showLoading = () => setIsLoading(true);
    const hideLoading = () => setIsLoading(false);

    useEffect(() => {
        hideLoading();
    }, [pathname])

    return (
        <LoadingContext.Provider value={{isLoading, showLoading, hideLoading}}>
            {children}
        </LoadingContext.Provider>
    )
}

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (context === undefined) {
        throw new Error('useLoading must be used within.')
    }
    return context;
}

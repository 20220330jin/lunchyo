'use client'
import {createContext, ReactNode, useContext, useState} from "react";

interface HeaderContextType {
    leftControls: ReactNode;
    rightControls: ReactNode;
    setControls: (controls: { left?: ReactNode; right?: ReactNode }) => void;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export const HeaderProvider = ({children}: { children: ReactNode }) => {
    const [leftControls, setLeftControls] = useState<ReactNode>(null);
    const [rightControls, setRightControls] = useState<ReactNode>(null);
    const setControls = (controls: { left?: ReactNode; right?: ReactNode }) => {
        if (controls.left != undefined) setLeftControls(controls.left);
        if (controls.right != undefined) setRightControls(controls.right);
    }
    return (
        <HeaderContext.Provider value={{leftControls, rightControls, setControls}}>
            {children}
        </HeaderContext.Provider>
    )
}

export const useHeader = () => {
    const context = useContext(HeaderContext);
    if (!context) {
        throw new Error("useHeader must be used within header");
    }
    return context;
}

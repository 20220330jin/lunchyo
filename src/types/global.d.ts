export {}

declare global {
    interface Window {
        ReactNativeWebView?: {
            postMessage: (message: string) => void;
        };
        testAppLocation?: (lat: number, lng: nubmer) => void;
    }
}

'use client'
import { createContext, useContext, useEffect, useState } from "react";

interface LocationData {
    latitude: number;
    longitude: number;
}

interface LocationContextType {
    location: LocationData | null;
    isInApp: boolean;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined)

export const useLocationInfo = () => {
    const context = useContext(LocationContext);

    if (context === undefined) {
        throw new Error('useLocationInfo must be used within a location context');
    }
    return context;
}

export const LocationProvider = ({ children }: LocationProviderProps) => {
    const [location, setLocation] = useState<LocationData | null>(null);
    const [isInApp, setIsInApp] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        const checkIfInApp = () => {
            const isReactNativeWebView = window.ReactNativeWebView !== undefined;
            const isAppUserAgent = /SatmbeApp/.test(navigator.userAgent);
            return isReactNativeWebView || isAppUserAgent;
        };

        const inApp = checkIfInApp();
        setIsInApp(inApp);

        const handleAppLocation = (event: CustomEvent) => {
            const { latitude, longitude } = event.detail;
            setLocation({ latitude, longitude });

            if (window.ReactNativeWebView) {
                window.ReactNativeWebView.postMessage(
                    JSON.stringify({
                        type: 'LOCATION_RECEIVED',
                        payload: { latitude, longitude },
                    }),
                );
            }
        };

        if (inApp) {
            // 전역 에러 핸들러 설정 (디버깅 용이)
            window.onerror = function (message, source, lineno, colno, error) {
                if (window.ReactNativeWebView) {
                    window.ReactNativeWebView.postMessage(
                        JSON.stringify({
                            type: 'WEB_ERROR',
                            payload: { message, source, lineno, colno, error: error?.toString() },
                        }),
                    );
                }
                return false;
            };

            // 'app-location' 커스텀 이벤트 리스너 등록
            window.addEventListener('app-location', handleAppLocation as EventListener);

            // 네이티브 앱에 웹이 위치 이벤트를 받을 준비가 되었음을 알림
            if (window.ReactNativeWebView) {
                window.ReactNativeWebView.postMessage(
                    JSON.stringify({
                        type: 'RETURN_LOCATION_MAIN_LAYOUT_EventListener',
                        payload: { message: 'Web is ready for location events' },
                    }),
                );

                // 네이티브 앱에 위치 정보 요청 (타이머를 두어 앱이 준비될 시간을 줌)
                setTimeout(() => {
                    if (window.ReactNativeWebView) {
                        window.ReactNativeWebView.postMessage(
                            JSON.stringify({
                                type: 'REQUEST_LOCATION',
                                payload: { message: 'Please send location' },
                            }),
                        );
                    }
                }, 1000);
            }
        } else if (navigator.geolocation) {
            // 앱 내부가 아닐 경우 (일반 브라우저 환경)
            // 브라우저의 Geolocation API를 사용하여 위치 정보 획득
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error('Error getting browser location:', error);
                },
                {
                    enableHighAccuracy: true,
                    maximumAge: 30000,
                    timeout: 27000,
                },
            );
        }

        // 테스트용 커스텀 이벤트 (수동 테스트 가능)
        window.testAppLocation = (lat: number, lng: number) => {
            const testEvent = new CustomEvent('app-location', {
                detail: { latitude: lat, longitude: lng },
            });
            window.dispatchEvent(testEvent);
        };

        // 컴포넌트 언마운트 시 이벤트 리스너 정리
        return () => {
            if (inApp) {
                window.removeEventListener('app-location', handleAppLocation as EventListener);
            }
        };
    }, []); // 의존성 배열을 비워 컴포넌트 마운트 시 한 번만 실행되도록 합니다.

    return (
        <LocationContext.Provider value={{ location, isInApp }}>
            {children}
        </LocationContext.Provider>
    );
};

interface LocationProviderProps {
    children: React.ReactNode;
}

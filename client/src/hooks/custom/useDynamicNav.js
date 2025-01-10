import { useEffect, useState } from 'react';

export function useDynamicNav() {
    const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);

    useEffect(() => {
        let timeout;

        const handleResize = () => {
            clearTimeout(timeout);

            timeout = setTimeout(() => {
                console.log('resizing');
                setDeviceWidth(window.innerWidth);
            }, 100);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            clearTimeout(timeout);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return { deviceWidth };
}

import { useEffect, useState } from 'react';

export function useSearch(searchParams) {
    const [search, setSearch] = useState({
        category: searchParams.get('category') || 'All categories',
        name: searchParams.get('name') || '',
    });

    useEffect(() => {
        setSearch((oldSearch) => ({
            category: searchParams.get('category') || 'All categories',
            name: searchParams.get('name') || '',
        }));
    }, [searchParams]);

    return { search, setSearch };
}

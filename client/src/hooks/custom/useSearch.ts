import { useEffect, useState } from 'react';
import { Category } from '../../types/product';

interface SearchType {
    category: Category | 'All categories';
    name: string;
}

export function useSearch(searchParams: URLSearchParams) {
    const [search, setSearch] = useState<SearchType>({
        category: (searchParams.get('category') || 'All categories') as Category | 'All categories',
        name: searchParams.get('name') || '',
    });

    useEffect(() => {
        setSearch(
            (oldSearch) =>
                ({
                    category: searchParams.get('category') || 'All categories',
                    name: searchParams.get('name') || '',
                } as SearchType)
        );
    }, [searchParams]);

    return { search, setSearch };
}

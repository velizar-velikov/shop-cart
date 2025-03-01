import { useEffect, useState } from 'react';
import { Category } from '../../types/product';
import { Search } from '../../types/search';

export function useSearch(searchParams: URLSearchParams) {
    const [search, setSearch] = useState<Search>({
        category: (searchParams.get('category') || 'All categories') as Category | 'All categories',
        name: searchParams.get('name') || '',
    });

    useEffect(() => {
        setSearch(
            (oldSearch) =>
                ({
                    category: searchParams.get('category') || 'All categories',
                    name: searchParams.get('name') || '',
                } as Search)
        );
    }, [searchParams]);

    return { search, setSearch };
}

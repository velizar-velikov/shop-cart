import { Category } from './product';

export interface Search {
    category: Category | 'All categories';
    name: string;
}

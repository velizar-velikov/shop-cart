import { Category } from './product';

export type Search = {
    category: Category | 'All categories';
    name: string;
};

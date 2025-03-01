import { OrderedProduct } from "./product";

export type PaymentType = 'visa' | 'mastercard' | 'cash';

export type Order = {
    _ownerId: string;
    _id: string;
    _createdOn: string;
    address: string;
    paymentType: PaymentType;
    products: [OrderedProduct];
};
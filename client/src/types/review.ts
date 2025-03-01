export interface ReviewResponse {
    _ownerId: string;
    _id: string;
    productId: string;
    _createdOn: number;
    _updatedOn?: number;
    rating: string;
    text: string;
    reviewerFullName: string;
}

# Features

## Catalog page

-   paginated
-   search by category and product name

## Authentication

-   Register page ( users are able to register with first name, last name, email and password )
-   Login page

## Products interaction

-   Create page ( authenticated users are able to add new products in the store )
-   Edit page ( autenticated users can edit their own products )
-   Delete ( authenticated users are able to delete their products with a confirmation modal )

## Reviews interaction

-   All users/guests are able to read product reviews
-   Add review page ( authenticated users can leave reviews to products that are not their own )
-   Edit review ( authenticated users see their own review of the product (if any) at the top and can edit it inline )
-   Delete review ( authenticated users can delete their reviews (if any) )

## Items in stock interaction

-   When creating a product, product is added automatically with one in stock from all sizes
-   When users make an order, the items quantity is removed from stock
-   Authenticated users can add items in stock to their product with a modal dialog from the product details page

## Wishlist

-   All users/guests can add products to their wishlist
-   All users/guests can remove products from their wishlist
-   Authenticated users can add products from wishlist to cart with a modal dialog to choose size

## Cart (for authenticated users)

-   Users can add products that are not their own to their cart
-   Users can remove products from their cart
-   Users can update the quantity of the products in cart

## Orders (for authenticated users)

-   All products that are in cart and are not out of stock are forwarded to making an order with "next step" button
-   User enters his info and confirms an order
-   Confirmation page is shown
-   My orders section - users can see their order from newest to oldest

## Dynamic navigation

-   Desktop - single line with all buttons visible
-   Mobile - only wishlist, cart and logo (link to home) buttons are visible with a hamburger menu for the rest. The menu is a sliding menu from the left side.

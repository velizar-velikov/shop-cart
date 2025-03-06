const singleDigitStyle = { fontSize: '0.85rem', padding: '0.03rem 0.28rem 0.12rem 0.28rem' };
const doubleDigitStyle = { fontSize: '0.8rem', padding: '0.09rem 0.13rem 0.2rem 0.12rem' };

interface CartBubbleProps {
    cartItemsCount: number;
}

export default function CartBubble({ cartItemsCount }: CartBubbleProps) {
    return (
        <span
            style={cartItemsCount < 10 ? singleDigitStyle : doubleDigitStyle}
            className="position-absolute top-25 start-75 translate-middle badge rounded-circle bg-danger py-0.125 px-0.25"
        >
            {cartItemsCount}
        </span>
    );
}

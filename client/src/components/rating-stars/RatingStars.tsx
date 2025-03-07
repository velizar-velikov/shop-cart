interface RatingStarsProps {
    rating: number;
}

export default function RatingStars({ rating }: RatingStarsProps) {
    return (
        <div className="stars">
            {new Array(Math.round(rating)).fill('star').map((star, i) => (
                <i key={i} className="fa fa-star text-warning"></i>
            ))}
            {new Array(5 - Math.round(rating)).fill('star').map((star, i) => (
                <i key={i + 5} className="fa-regular fa-star"></i>
            ))}
        </div>
    );
}

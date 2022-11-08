import "./Rating.css";

const RATINGS = [1, 2, 3, 4, 5];

function Star({ selected = false, rating, onSelect, onHover }) {
    const className = `Rating-star ${selected ? "selected" : ""}`;

    const handleClick = onSelect ? () => onSelect(rating) : undefined;

    const hanelMouseOver = onHover ? () => onHover(rating) : undefined;

    return (
        <span
            className={className}
            onClick={handleClick}
            onMouseOver={hanelMouseOver}
        >
            ★
        </span>
    );
}

function Rating({ className, value = 0, onSelect, onHover, onMouseOut }) {
    // return (
    //     <div>
    //         <Star selected={value >= 1} />
    //         <Star selected={value >= 2} />
    //         <Star selected={value >= 3} />
    //         <Star selected={value >= 4} />
    //         <Star selected={value >= 5} />
    //     </div>
    // );

    // map 메서드를 이용해서 정리
    return (
        <div className={className} onMouseOut={onMouseOut}>
            {RATINGS.map((rating) => (
                <Star
                    key={rating}
                    selected={value >= rating}
                    rating={rating}
                    onSelect={onSelect}
                    onHover={onHover}
                />
            ))}
        </div>
    );
}

export default Rating;

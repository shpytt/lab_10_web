import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ animal }) {
    return (
        <div className="ProductCard">
            <Link to={`/catalog/${animal.id}`} className="ProductCard-imageLink">
                <div className="ProductCard-imageWrapper">
                    <img src={animal.img} alt={animal.title} />
                </div>
            </Link>
            <div className="ProductCard-content">
                <h3 className="ProductCard-title">{animal.title}</h3>
                <p className="ProductCard-description">
                    {animal.description.substring(0, 100)}...
                </p>
                <div className="ProductCard-price">Price: ${animal.expense}</div>

                <Link to={`/catalog/${animal.id}`} className="Button Button-small">
                    View more
                </Link>
            </div>
        </div>
    );
}

export default ProductCard;
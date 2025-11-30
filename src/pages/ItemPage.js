import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions';
import Loader from '../components/Loader';
import { fetchAnimalById } from '../api/api';

function ItemPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [animal, setAnimal] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadAnimal = async () => {
            setLoading(true);
            try {
                const data = await fetchAnimalById(id);
                setAnimal(data);
            } catch (error) {
                console.error("Failed to load animal");
            } finally {
                setLoading(false);
            }
        };
        loadAnimal();
    }, [id]);

    const handleAddToCart = () => {
        if (animal) {
            dispatch(addToCart(animal));
            alert(`${animal.title} added to cart!`);
        }
    };

    if (loading) return <Loader />;
    if (!animal) return <h2>Animal not found</h2>;

    return (
        <div className="ItemPage">
            <div className="ItemPage-top">
                <div className="ItemPage-image">
                    <img 
                        src={animal.img.startsWith('http') || animal.img.startsWith('/') ? animal.img : `/${animal.img}`} 
                        alt={animal.title} 
                    />
                </div>

                <div className="ItemPage-details">
                    <div className="ItemPage-tags">
                        <span className="Tag">{animal.type}</span>
                        <span className="Tag">Characteristic 2</span>
                    </div>

                    <h1 className="ItemPage-title">{animal.title}</h1>
                    <p className="ItemPage-description">{animal.description}</p>

                    <div className="ItemPage-fields">
                        <div>
                            <label>Countable field</label>
                            <input type="number" defaultValue="1" min="1" />
                        </div>
                        <div>
                            <label>Selectable Field</label>
                            <select>
                                <option>Select</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="ItemPage-bottom">
                <div className="ItemPage-price">Price: ${animal.expense}</div>

                <div className="ItemPage-buttons">
                    <button className="Button Button-secondary" onClick={() => navigate(-1)}>
                        Go back
                    </button>
                    <button className="Button" onClick={handleAddToCart}>Add to cart</button>
                </div>
            </div>
        </div>
    );
}

export default ItemPage;
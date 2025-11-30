import React, { useState, useEffect } from 'react';
import { fetchAnimals } from '../api/api';
import Loader from '../components/Loader';

function HomePage() {
    const [animals, setAnimals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        const loadFeaturedAnimals = async () => {
            try {
                const data = await fetchAnimals();
                setAnimals(data);
            } catch (error) {
                console.error("Failed to load animals for home page");
            } finally {
                setLoading(false);
            }
        };
        loadFeaturedAnimals();
    }, []);

    const featuredAnimals = animals.slice(0, 3);
    const extraAnimals = animals.slice(3);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="HomePage">
            <section className="Hero">
                <div className="Hero-image">
                    <img src="/img/hero-placeholder.png" alt="Hero" />
                </div>
                <div className="Hero-content">
                    <h2>Heading</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus, nulla ut commodo sagittis, sapien dui mattis dui, non pulvinar lorem felis nec erat.</p>
                </div>
            </section>

            <section className="Tiles">
                {featuredAnimals.map(animal => (
                    <div className="Tile" key={animal.id}>
                        <div className="Tile-image">
                            <img src={animal.img} alt={animal.title} />
                        </div>
                        <h3>{animal.title}</h3>
                        <p>{animal.description.substring(0, 50)}...</p>
                    </div>
                ))}
            </section>

            <div className="Tiles-viewMore">
                <button className="Button" onClick={() => setShowMore(!showMore)}>
                    {showMore ? 'Hide extra animals' : 'View more animals'}
                </button>
            </div>

            {showMore && (
                <section className="Tiles" style={{ marginTop: '30px' }}>
                    {extraAnimals.map(animal => (
                        <div className="Tile" key={animal.id}>
                            <div className="Tile-image">
                                <img src={animal.img} alt={animal.title} />
                            </div>
                            <h3>{animal.title}</h3>
                            <p>{animal.description.substring(0, 50)}...</p>
                        </div>
                    ))}
                </section>
            )}

        </div>
    );
}

export default HomePage;
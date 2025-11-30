import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader'; // Імпортуємо спінер
import { fetchAnimals } from '../api/api'; // Імпортуємо наш API сервіс

function CatalogPage() {
    // 1. Ініціалізуємо animals порожнім масивом [], щоб не було помилки undefined
    const [animals, setAnimals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');

    // 2. Функція завантаження даних з сервера
    const loadAnimals = async () => {
        setLoading(true);
        try {
            const params = {};
            if (filterType !== 'all') {
                params.type = filterType;
            }
            // Запит до бекенду
            const data = await fetchAnimals(params);
            setAnimals(data);
        } catch (error) {
            console.error("Failed to load animals");
        } finally {
            setLoading(false);
        }
    };

    // 3. Завантажуємо дані при зміні фільтра (або при старті)
    useEffect(() => {
        loadAnimals();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterType]);

    // 4. Локальний пошук (фільтрація вже завантажених даних по назві)
    const displayedAnimals = animals.filter(animal => 
        animal.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="CatalogPage">
            {/* Пошук зверху (Твій дизайн) */}
            <div className="SearchBar">
                <input
                    type="search"
                    placeholder="Search by text..."
                    className="SearchBar-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Панель фільтрів (Твій дизайн) */}
            <div className="FilterBar">
                <div className="FilterBar-left">
                    <select
                        className="FilterBar-select"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        <option value="all">All types</option>
                        <option value="cat">Cat</option>
                        <option value="dog">Dog</option>
                        <option value="parrot">Parrot</option>
                        <option value="hamster">Hamster</option>
                        <option value="turtle">Turtle</option>
                    </select>

                    {/* Заглушки для інших фільтрів */}
                    <select className="FilterBar-select">
                        <option>Filter 2</option>
                    </select>
                    <select className="FilterBar-select">
                        <option>Filter 3</option>
                    </select>
                </div>
                
                {/* Кнопка Apply */}
                <button className="Button" onClick={loadAnimals}>Apply</button>
            </div>

            {/* Контент: або спінер, або сітка товарів */}
            {loading ? (
                <Loader />
            ) : (
                <div className="ProductGrid">
                    {displayedAnimals.length > 0 ? (
                        displayedAnimals.map(animal => (
                            <ProductCard key={animal.id} animal={animal} />
                        ))
                    ) : (
                        <p>No animals found.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default CatalogPage;
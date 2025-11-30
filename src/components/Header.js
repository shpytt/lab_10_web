import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

function Header() {
    const location = useLocation();

    return (
        <header className="Header">
            <div className="Header-container">
                <NavLink to="/" className="Header-logo">
                    <img src="/img/logo.png" alt="My Zoo Logo" className="Header-logoImg" />
                </NavLink>

                <nav className="Header-nav">
                    <NavLink to="/" className={({ isActive }) => isActive ? 'Header-navLink active' : 'Header-navLink'}>Home</NavLink>
                    <NavLink to="/catalog" className={({ isActive }) => isActive ? 'Header-navLink active' : 'Header-navLink'}>Catalog</NavLink>
                    <NavLink to="/cart" className={({ isActive }) => isActive ? 'Header-navLink active' : 'Header-navLink'}>Cart</NavLink>
                </nav>

                <div className="Header-search">
                </div>
            </div>
        </header>
    );
}

export default Header;
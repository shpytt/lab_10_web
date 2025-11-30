import React from 'react';

function Footer() {
    return (
        <footer className="Footer">
            <div className="Footer-container">
                <div className="Footer-branding">
                    <h3>Branding stuff</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
                <div className="Footer-logo">
                    <img src="/img/logo.png" alt="My Zoo Logo" className="Footer-logoImg" />
                </div>
                <div className="Footer-social">
                    <button className="Footer-socialButton">FB</button>
                    <button className="Footer-socialButton">TW</button>
                    <button className="Footer-socialButton">LI</button>
                    <button className="Footer-socialButton">G+</button>
                </div>
            </div>
            <div className="Footer-copyright">
                <p>2025 IoT © Copyright all rights reserved, bla bla</p>
            </div>
        </footer>
    );
}

export default Footer;
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, decrementQuantity } from '../redux/actions';
import { Link } from 'react-router-dom';

function CartPage() {
    const cartItems = useSelector((state) => state.cartItems);
    const dispatch = useDispatch();

    const totalPrice = cartItems.reduce((sum, item) => sum + item.expense * item.quantity, 0);

    return (
        <div className="CartPage">
            <h1 className="CartPage-title">Shopping Cart</h1>
            
            <div className="CartItems">
                {cartItems.length === 0 ? (
                    <p style={{textAlign: 'center'}}>Your cart is empty.</p>
                ) : (
                    cartItems.map((item) => (
                        <div key={item.id} className="CartItem">
                            <div className="CartItem-left">
                                <div className="CartItem-image">
                                    <img 
                                        src={item.img.startsWith('http') || item.img.startsWith('/') ? item.img : `/${item.img}`} 
                                        alt={item.title} 
                                    />
                                </div>
                                <div className="CartItem-name">
                                    {item.title}
                                </div>
                            </div>
                            
                            <div className="CartItem-right">
                                <div className="CartItem-controls">
                                    <button 
                                        className="QtyBtn" 
                                        onClick={() => dispatch(decrementQuantity(item.id))}
                                    >
                                        -
                                    </button>
                                    <span className="QtyValue">{item.quantity}</span>
                                    <button 
                                        className="QtyBtn" 
                                        onClick={() => dispatch(addToCart(item))}
                                    >
                                        +
                                    </button>
                                </div>

                                <div className="CartItem-price">
                                    ${item.expense * item.quantity}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {cartItems.length > 0 && (
                <div className="CartFooter">
                    <div className="CartTotal">
                        <span className="CartTotal-label">Total amount:</span>
                        <span className="CartTotal-value">${totalPrice}</span>
                    </div>
                    
                    <div className="CartActions">
                        <Link to="/catalog" className="Button Button-secondary">
                            Back to Catalog
                        </Link>
                        <button className="Button">Continue</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CartPage;
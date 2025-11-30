export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const DECREMENT_QUANTITY = 'DECREMENT_QUANTITY';

export const addToCart = (item) => {
    return {
        type: ADD_TO_CART,
        payload: item,
    };
};

export const removeFromCart = (itemId) => {
    return {
        type: REMOVE_FROM_CART,
        payload: itemId,
    };
};

export const decrementQuantity = (itemId) => {
    return {
        type: DECREMENT_QUANTITY,
        payload: itemId,
    };
};
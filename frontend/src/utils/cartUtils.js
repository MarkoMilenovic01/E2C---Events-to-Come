export const addDecimals = (num) => {
    return (Math.round(num*100)/100).toFixed(2);
}

export const updateCart = (state) => {
       // Calculate items price

       state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0));
   
       state.shippingPrice = addDecimals(state.itemsPrice > 100? 0 : 10);

       // Calculate total price
       state.totalPrice = (
           Number(state.itemsPrice) + Number(state.shippingPrice)
       ).toFixed(2);

       localStorage.setItem('cart', JSON.stringify(state));

       return state;
}





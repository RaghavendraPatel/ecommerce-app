
import React, { useEffect } from 'react';
import { useSelector,useDispatch} from 'react-redux';
import { RootState } from '../store/store';
import {addItem, removeItem, removeOneItem, clearCart} from '../reducers/cartSlice';
import { initiateCheckoutMultipleItems } from '../reducers/checkoutSlice';
import { Link, useNavigate} from 'react-router-dom';
import './cart.scss';
const Cart: React.FC = () => {
    const cart = useSelector((state:RootState) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formatCurerency = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
        }).format(price);
      };

    useEffect(() => {
        document.title = 'React Ecommerce | Cart';
    }, []);
    return (
        <div className='Cart'>
            <div className="shopping__cart">
                <div className="shopping__cart__header">
                    <h2>Shopping Cart</h2>
                    <button className="btn btn-danger cart__clear" onClick={() => dispatch(clearCart())}>Clear Cart</button>
                </div>
                <div className="products">
                    {cart.items.length === 0 && <div className='cart__empty'>No items in cart.</div>}
                    {cart.items.map((item) => (
                        <div className="product" key={item.id}>
                            <div className="product__image">
                                <img src={item.image} alt={item.name} />
                            </div>
                            <div className="product__info">
                                <div className="product__details">
                                    <h3>{item.name}</h3>
                                    <p>{formatCurerency(item.price)}</p>
                                </div>
                                <div className="product__btns">
                                    <div className="quantity__control">
                                        <button className="btn btn-primary" onClick={() => dispatch(removeOneItem(item.id))}>-</button>
                                        <div className="product__quantity">{item.quantity}</div>
                                        <button className="btn btn-primary" onClick={() => dispatch(addItem(item))}>+</button>
                                    </div>
                                    <button className="btn btn-danger" onClick={() => dispatch(removeItem(item.id))}>Remove</button>
                                    <Link to={`/product/${item.id}`}>View Product Page</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="shopping__cart__footer">
                    <div className="total-price">
                        <h3>Total Price: {formatCurerency(cart.totalPrice)}</h3>
                    </div>
                </div>
            </div>
            <div className="checkout">
                <h3>Total Quantity: {cart.totalQuantity}</h3>
                <h3>Total Price: {formatCurerency(cart.totalPrice)}</h3>
                <button 
                    className="btn checkout-btn"
                    disabled={cart.items.length === 0}
                    style={{cursor: cart.items.length === 0 ? 'not-allowed' : 'pointer', opacity: cart.items.length === 0 ? 0.5 : 1}}
                    onClick={() => {
                        if (cart.items.length === 0) {
                            return;
                        }
                        dispatch(initiateCheckoutMultipleItems(cart.items))
                        navigate('/checkout');
                    }}
                >Checkout</button>
            </div>
        </div>
    );
};

export default Cart;

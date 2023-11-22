
import React, { useEffect } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {RootState} from '../store/store';
import { completeCheckout } from '../reducers/checkoutSlice';
import { clearCart } from '../reducers/cartSlice';
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';

import './checkout.scss';


const Checkout: React.FC = () => {
    const dispatch = useDispatch();
    const checkout = useSelector((state: RootState) => state.checkout);
    const navigate = useNavigate();

    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(deliveryDate.getDate() + 2);
    const freeDelivery = new Date(today);
    freeDelivery.setDate(freeDelivery.getDate() + 5);
    // format the date to a readable format
    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    };

    // format the price to a readable format
    const formatCurerency = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
        }).format(price);
    };
    

    useEffect(() => {
        document.title = 'Checkout';
        if(checkout.items.length === 0) {
            navigate('/');
            toast.error('Cart is empty');
        }
    }, []);

    const handleCheckout = () => {
        if (checkout.type === 0) {
            dispatch(clearCart());
        } 
        dispatch(completeCheckout());
        navigate('/');
    }
  return (
    <div className="checkout">

        <div className="checkout__left">
            <div className="checkout__header">
                <h2>Checkout</h2>
            </div>
            <div className="checkout__delivery-type">
                <h3>Select Delivery Method</h3>
                <div className="delivery__options options">
                            <div className="delivery__option">
                                <input type="radio" name="delivery" id="free-delivery" checked/>
                                <label htmlFor="delivery"><b>FREE</b> Delivery by <b>{formatDate(freeDelivery)}</b></label>
                            </div>
                            <div className="delivery__option">
                                <input type="radio" name="delivery" id="fast-delivery"/>
                                <label htmlFor="fast-delivery">
                                    <b>Fastest</b> Delivery by <b>{formatDate(deliveryDate)}</b> <span className="delivery__charges">+ ₹40</span>
                                </label>
                            </div>
                        </div>
                </div>
            <div className="checkout__address">
                <h3>Select Delivery Address</h3>
                <div className="address__options options">
                    <div className="address__option" >
                        <input type="radio" name="address" id="home" checked/>
                        <label htmlFor="home"><b>Home:</b> House no. xyz, Some Street, Some City, IN</label>
                    </div>
                    <div className="address__option">
                        <input type="radio" name="address" id="office" />
                        <label htmlFor="office"><b>Office:</b> Some Tech Park, Some Building, Some Floor, Some Street, Some City, IN</label>
                    </div>
                </div>
            </div>
            <div className="checkout__payment">
                <h3>Select Payment Method</h3>
                <div className="payment__options options">
                    <div className="payment__option">
                        <input type="radio" name="payment" id="card" checked/>
                        <label htmlFor="card">Credit/Debit/ATM Card</label>
                    </div>
                    <div className="payment__option">
                        <input type="radio" name="payment" id="upi" />
                        <label htmlFor="upi">UPI</label>
                    </div>
                    <div className="payment__option">
                        <input type="radio" name="payment" id="cod" />
                        <label htmlFor="cod">Cash on Delivery</label>
                    </div>
                </div>
            </div>
        </div>
        <div className="checkout__right">
            <div className="checkout__summary">
                <h2>Summary</h2>
                <div className="checkout__summary__total">
                    <div className="checkout__summary__total__quantity">Total Quantity: {checkout.totalQuantity}</div>
                    <div className="checkout__summary__total__price">Total Price: {formatCurerency(checkout.totalPrice)}</div>
                </div>
                <div className="checkout__summary__btns">
                    <button 
                        className="btn btn-primary" 
                        onClick={handleCheckout}
                    >Checkout</button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Checkout;

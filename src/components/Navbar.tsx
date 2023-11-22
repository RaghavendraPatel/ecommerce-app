
import React from 'react';
import { LiaOpencart } from "react-icons/lia";
import { BsCart3 } from "react-icons/bs";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link,NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import './navbar.scss';

const Navbar: React.FC = () => {
    const cartCount = useSelector((state: RootState) => state.cart.totalQuantity);
  return (
    <nav>
        <div className="nav__logo">
            <i><LiaOpencart /></i>
            <span>React Ecommerce</span>
        </div>
        <div className="nav__contents">
            <div className="nav__links">
                <NavLink to='/' className = {({isActive})=> isActive ? 'active' : ''}>Buy</NavLink>
                <NavLink to='/sell'  className = {({isActive})=> isActive ? 'active' : ''}>Sell</NavLink>
            </div>
            <div className="nav__right">
                <div className="cart">
                    <Link to='/cart'>
                        <i className='cart__icon'><BsCart3 /></i>
                        <div className="cart__count">
                            {cartCount}
                        </div>
                    </Link>
                </div>
                <div className="nav__user">
                    <div className="nav__user__avatar">
                        <FaRegCircleUser />
                    </div>
                    <div className="nav__user__name">Guest</div>
                </div>
            </div>
        </div>
    </nav>
  );
};

export default Navbar;

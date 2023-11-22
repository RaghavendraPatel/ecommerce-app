
import React from 'react';
import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeProduct } from '../reducers/productSlice';
import { useState } from 'react';

import EditProduct from './EditProduct';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
}

interface ProductCardProps {
  product: Product;
}

const SellerProductCard: React.FC<ProductCardProps> = ({ product }) => {

    const formatCurerency = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
        }).format(price);
    };

    const [editForm, setEditForm] = useState(false);
    const hideForm = () => {
        setEditForm(false);
    };
    const price = formatCurerency(product.price);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <div className="ProductCard card">
            {editForm && <EditProduct product={product} hideForm={hideForm} />}
            <div className="clickable" onClick={() => navigate(`/product/${product.id}`)}>
                <img src={product.images[0]} alt={product.name} className="product__image"/>
                <div className="product__title">{product.name}</div>
                <div className="product__price">{price}</div>
            </div>
            <div className="product__btns">
                <button 
                    className="btn btn-primary"
                    onClick={() => setEditForm(true)}
                >Edit</button>
                <button 
                    className="btn btn-secondary"
                    onClick={() => dispatch(removeProduct(product.id))}
                >Delete</button>
            </div>
        </div>
    );
};

export default SellerProductCard;

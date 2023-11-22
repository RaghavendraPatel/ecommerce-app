
import React from 'react';
import {useDispatch} from 'react-redux';
import { addItem } from '../reducers/cartSlice';
import { initiateCheckoutSingleItem } from '../reducers/checkoutSlice';
import { useNavigate } from 'react-router-dom';


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

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const formatCurerency = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };
  const price = formatCurerency(product.price);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="ProductCard card">
      <div className="clickable" onClick={() => navigate(`/product/${product.id}`)}>
        <img src={product.images[0]} alt={product.name} className="product__image"/>
        <div className="product__title">{product.name}</div>
        <div className="product__price">{price}</div>
      </div>
      <div className="product__btns">
        <button className="btn btn-primary" 
          onClick={
            () => {
              dispatch(addItem({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                image: product.images[0],
                })
              )
            }
          }
        >Add to Cart</button>
        <button 
          className="btn btn-secondary"
          onClick={
            () => {
              dispatch(initiateCheckoutSingleItem({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                image: product.images[0],
                })
              )
              navigate('/checkout');
            }
          }
        >Buy Now</button>
      </div>
    </div>
  );
};

export default ProductCard;


import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useSelector, useDispatch} from 'react-redux';
import { addItem } from '../reducers/cartSlice';
import { initiateCheckoutSingleItem } from '../reducers/checkoutSlice';
import { RootState } from '../store/store';
import { useNavigate } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';

import './product.scss';


const Product = () => {
  // get the id from the url
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector((state: RootState) => state.products.products.find((product) => product.id === Number(id)));
  // create a random rating between 1 and 5 for the product
  const rating = Math.min(Math.floor(Math.random() * 400)/100 + 1 ,5);
  // create a random discount between 0 and 50 for the product
  const discount = Math.floor(Math.random() * 50);
  // create a random delivery date between 2 and 5 days from today
  const today = new Date();
  const deliveryDate = new Date(today);
  deliveryDate.setDate(deliveryDate.getDate() + 2);
  const freeDelivery = new Date(today);
  freeDelivery.setDate(freeDelivery.getDate() + 5);
  // format the date to a readable format
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };
  useEffect(() => {
        if (product) {
            document.title = `${product.name}`;
            const image = document.querySelectorAll('.product__container__left__images img')[0] as HTMLImageElement;
            image.classList.add('active');
        }
        else {
            document.title = 'Product Not Found';
        }
    }, [product]);
    // format the price to a readable format
    const formatCurerency = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
        }).format(price);
      };

  return (
    <div className="Product">
        {!product && <h2>Product Not Found</h2>}
        {product && <>
            <div className="product__container">
                <div className="product__container__left">
                    <div className="product__container__left__image">
                        <img src={product.images[0]} alt={product?.name} id='display'/>
                    </div>
                    <div className="product__container__left__images">
                        {product.images.map((image) => {
                            return(
                                <img 
                                src={image} 
                                alt={product?.name}
                                onMouseOver={(event) => {
                                    const display = document.getElementById('display') as HTMLImageElement;
                                    display.src = image;
                                    const images = document.querySelectorAll('.product__container__left__images img');
                                    images.forEach((image) => image.classList.remove('active'));
                                    event.currentTarget.classList.add('active');
                                }}
                            />)}
                        )}
                    </div>
                </div>
                <div className="product__container__right">
                    <div className="product__name">
                        <h2>{product.name}</h2>
                    </div>
                    <div className="product__rating">
                        <div className="rating">{rating.toFixed(1)}</div>
                        <div className="stars">
                            <Rating initialValue={rating} fillColor='orange' allowFraction size={20}/>
                        </div>
                        <div className="total-ratings">
                            {Math.floor(Math.random() * 10000)} ratings
                        </div>
                    </div>
                    <div className="product__price">
                        <div className="final-price">
                            <div className="discount">{discount}% off</div>
                            <h3>{formatCurerency(product.price)}</h3>
                        </div>
                        <div className="mrp">M.R.P. {formatCurerency(product.price/((100-discount)/100))}</div>
                    </div>
                    <div className="product__description">
                        <h4>About this Product</h4>
                        <ul>
                            {product.description.split('\n').map((line) => (
                                <li>{line}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="checkout">
                <div className="price">{formatCurerency(product?.price)}</div>
                <div className="delivery">
                    <div className="delivery__options">
                        <div className="delivery__option">
                            <input type="radio" name="delivery" id="free-delivery" />
                            <label htmlFor="delivery"><b>FREE</b> Delivery by <b>{formatDate(freeDelivery)}</b></label>
                        </div>
                        <div className="delivery__option">
                            <input type="radio" name="delivery" id="fast-delivery" />
                            <label htmlFor="fast-delivery">
                                <b>Fastest</b> Delivery by <b>{formatDate(deliveryDate)}</b> <span className="delivery__charges">+ ₹40</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="quantity">
                    <div className="quantity__dropdown">
                        <label htmlFor="quantity-selected">Quantity: </label>
                        <select name="" 
                            id="quantity-selected" 
                            defaultValue={1} 
                            onChange={
                                () => {
                                    const total = document.querySelector('.total') as HTMLDivElement;
                                    total.innerHTML = `Total: ${formatCurerency(Number((document.getElementById('quantity-selected') as HTMLSelectElement)?.value || 1) * product.price)}`;
                                }
                            }
                        >
                            {[...Array(9)].map((_, index) => (
                                <option value={index+1}>{index+1}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="total">Total: {formatCurerency(product.price)}</div>
                <button 
                    className="checkout__btn"
                    onClick={() => dispatch(addItem({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.images[0],
                        quantity: Number((document.getElementById('quantity-selected') as HTMLSelectElement)?.value || 1),
                    }))}
                >Add to Cart</button>
                <button 
                    className="checkout__btn"
                    onClick={() => {
                        dispatch(initiateCheckoutSingleItem({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.images[0],
                            quantity: Number((document.getElementById('quantity-selected') as HTMLSelectElement)?.value || 1),
                        }))
                        navigate('/checkout');
                    }}
                >Buy Now</button>
            </div>
        </>}
    </div>
  );
};

export default Product;

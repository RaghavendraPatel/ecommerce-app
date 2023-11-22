
import React, { useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import {useSelector} from 'react-redux';
import { RootState } from '../store/store';


import './style.scss';


const Home: React.FC = () => {

  const products = useSelector((state:RootState) => state.products.products);

  useEffect(() => {
    document.title = 'React Commerce | Home';
  }, []);
  return (
    <div className='Home'>
      <div className="products__container">
        <div className='products'>
          <div className="products__header">
            <h2>Products</h2>
          </div>
          <div className="products__list">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

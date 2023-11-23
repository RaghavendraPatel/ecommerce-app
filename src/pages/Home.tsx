
import React, { useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import {useSelector,useDispatch} from 'react-redux';
import { sortProducts,clearSort } from '../reducers/productSlice';
import { RootState } from '../store/store';


import './style.scss';

const Home: React.FC = () => {

  const sortedProducts = useSelector((state:RootState) => state.products.sortedProducts);
  const dispatch = useDispatch();
  const [sort, setSort] = React.useState('');
  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
    dispatch(sortProducts(e.target.value));
  };

  useEffect(() => {
    document.title = 'React Commerce | Home';
    dispatch(clearSort());
  }, []);
  return (
    <div className='Home'>
      <div className="products__container">
        <div className='products'>
          <div className="products__header">
            <h2>Products</h2>
            <div className="sort">
              {
                  sort &&
                  <div className="clear">
                    <button onClick={() => {
                        setSort('');
                        dispatch(clearSort())
                      }}>Clear</button>
                  </div>
              }
              <select name="sort" id="sort" onChange={handleSort} value={sort} className='sort__select'>
                <option value="" selected disabled>Sort</option>
                <option value="high">High to Low</option>
                <option value="low">Low to High</option>
              </select>
            </div>
          </div>
          <div className="products__list">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

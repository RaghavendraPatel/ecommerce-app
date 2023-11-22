
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import SellerProductCard from '../components/SellerProductCard';
import AddProduct from '../components/AddProduct';
import './style.scss';

const Sell: React.FC = () => {
    const products = useSelector((state: RootState) => state.products.products);
    const [addForm, setAddForm] = React.useState<boolean>(false);
    const hideForm = () => {
        setAddForm(false);
    };

    useEffect(() => {
        document.title = 'React Commerce | Sell';
    }, []);
    return (
        <div className="Sell">
            {addForm && <AddProduct hideForm={hideForm} />}
            <div className="products__container">
                <div className="products">
                    <div className="products__header">
                        <h2>Products</h2>
                        <button 
                        className='add-btn'
                        onClick={() => setAddForm(true)}
                        >
                            Add Product
                        </button>
                    </div>
                    <div className="products__list">
                        {products.map((product) => (
                            <SellerProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sell;

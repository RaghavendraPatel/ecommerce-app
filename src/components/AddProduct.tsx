
import React, { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addProduct } from '../reducers/productSlice';

import './form.scss';
import axios from 'axios';
import { toast } from 'react-toastify';

interface AddProductProps {
    hideForm: () => void;
}
const AddProduct: React.FC<AddProductProps> = ({hideForm}) => {
    const dispatch = useDispatch();
    const id = useSelector((state: RootState) => state.products.products[state.products.products.length-1].id + 1);
    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<number>();
    const [description, setDescription] = useState<string>('');
    const [images, setImages] = useState<string[]>([]);
    const [image, setImage] = useState<string>('');

    const addImage = () => {
        //check if the image url is valid
        const regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;
        if (image && regex.test(image)) {
            setImages([...images, image]);
            setImage('');
        }
        else {
            alert('Please enter a valid image url');
            setImage('');
        }
    };

    //add product to the database
    const handleAddProduct = () => {
        axios.post('https://my-json-server.typicode.com/raghavendraPatel/db/products', {
            id, 
            name,
            price:price||0,
            description,
            images,
        }).then((response) => {
            console.log(response);
            dispatch(addProduct({
                id, 
                name,
                price:price||0,
                description,
                images,
            }));
        }).catch((error) => {
            console.log(error);
            toast.error(error.message);
        });
        hideForm();
    }

  return (
    <div className='AddProductForm form'>
            <div className="form__container">
                <div className="form__header">
                    <h2>Add New Product</h2>
                    <div onClick={hideForm} className='form__close'>X</div>
                </div>
                <div className='form__group'>
                    <label htmlFor='name'>Name</label>
                    <input
                        type='text'
                        name='name'
                        id='name'
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder='Enter product name'
                    />
                </div>
                <div className='form__group'>
                    <label htmlFor='price'>Price <small>(In ₹)</small></label>
                    <input
                        type='number'
                        name='price'
                        id='price'
                        value={price}
                        onChange={(event) => setPrice(Number(event.target.value))}
                        placeholder='Enter product price'
                    />
                </div>
                <div className='form__group'>
                    <label htmlFor='description'>Description</label>
                    <textarea
                        name='description'
                        id='description'
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        placeholder='Enter product description'
                    />
                </div>
                <div className='form__group'>
                    <label htmlFor='images'>Images</label>
                    <div className="image__input">
                        <input
                            type='text'
                            name='images'
                            id='images'
                            placeholder='Enter image url'
                            value={image}
                            onChange={(event) => setImage(event.target.value)}
                        />
                        <button onClick={addImage}>Add</button>
                    </div>
                </div>
                <div className="preview">
                    {images.map((image) => (
                        <div className='preview__image'>
                            <img src={image} alt={name} />
                            <div 
                                className="remove"
                                onClick={() => setImages(images.filter((img) => img !== image))}
                            >X</div>
                        </div>
                    ))}
                </div>
                <button 
                    className='btn btn-primary'
                    onClick={handleAddProduct}
                    >Add Product</button>
            </div>
        </div>
    
  );
};

export default AddProduct;

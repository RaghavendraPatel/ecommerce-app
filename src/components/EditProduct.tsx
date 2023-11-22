import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProduct } from '../reducers/productSlice';
import './form.scss';
interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    images: string[];
}

interface EditProductProps {
    product: Product;
    hideForm: () => void;
}

const EditProduct: React.FC<EditProductProps> = ({ product , hideForm }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price);
    const [description, setDescription] = useState(product.description);
    const [images, setImages] = useState(product.images);
    const [image, setImage] = useState('');

    const addImage = () => {
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

    return (
        <div className='ProductUpdateForm form'>
            <div className="form__container">
                <div className="form__header">
                    <h2>Edit Product</h2>
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
                    />
                </div>
                <div className='form__group'>
                    <label htmlFor='description'>Description</label>
                    <textarea
                        name='description'
                        id='description'
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
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
                    onClick={() => {
                        dispatch(updateProduct({
                            id: product.id,
                            name,
                            price,
                            description,
                            images,
                        }));
                        hideForm();
                    }}
                    >Update</button>
            </div>
        </div>
    );
};

export default EditProduct;

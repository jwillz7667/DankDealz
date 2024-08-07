import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../slices/productSlice';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductList.css';
import QuickView from './QuickView';

const cardClasses = "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300";
const productDescriptionClasses = "text-gray-600 mt-2 text-sm";
const buttonClasses = "bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition duration-300";

const ProductCard = ({ product, openQuickView, addToCart }) => {
    return (
        <div className={cardClasses}>
            <img src={product.image || "https://placehold.co/300x200"} alt={product.name} className="w-full h-40 object-cover rounded-t-lg transition duration-300"/>
            <h3 className="mt-2 text-xl font-semibold text-accent">{product.name}</h3>
            <p className={productDescriptionClasses}>{product.description}</p>
            <div className="mt-4 flex justify-between items-center">
                <span className="text-primary text-lg font-bold">${product.price}</span>
                <button className={buttonClasses} onClick={() => addToCart(product._id)}>Buy Now</button>
            </div>
        </div>
    );
};

function ProductList({ categorySlug }) {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector(state => state.products || { products: [], loading: false, error: null });
    const [quickViewProduct, setQuickViewProduct] = useState(null);
    const { slug } = useParams();

    useEffect(() => {
        dispatch(fetchProducts(categorySlug || slug));
    }, [dispatch, categorySlug, slug]);

    const addToCart = async (productId) => {
        try {
            await axios.post('/api/cart', { productId }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` }
            });
            alert('Product added to cart successfully');
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Failed to add product to cart. Please try again.');
        }
    };

    const openQuickView = (product) => setQuickViewProduct(product);
    const closeQuickView = () => setQuickViewProduct(null);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="bg-background min-h-screen text-foreground">
            <main className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products && products.length > 0 ? (
                    products.map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                            openQuickView={openQuickView}
                            addToCart={addToCart}
                        />
                    ))
                ) : (
                    <div>No products available</div>
                )}
            </main>
            {quickViewProduct && (
                <QuickView product={quickViewProduct} onClose={closeQuickView} addToCart={addToCart} />
            )}
        </div>
    );
}

export default ProductList;

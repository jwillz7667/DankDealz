import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../slices/productSlice';
import axios from 'axios';
import './ProductList.css';
import QuickView from './QuickView';

// Shared constants for Tailwind class strings
const hoverUnderlineClass = "hover:underline text-accent hover:text-accent-foreground transition duration-200";
const cardClasses = "bg-card text-card-foreground p-4 rounded-lg transition-transform transform hover:scale-105 shadow-lg";
const buttonClasses = "bg-secondary text-secondary-foreground px-4 py-2 rounded-lg shadow transform hover:scale-105 transition duration-200";
const productDescriptionClasses = "mt-1 text-muted-foreground text-sm";

const Header = () => {
    return (
        <header className="bg-primary text-primary-foreground p-4 flex justify-between items-center shadow-md">
            <div className="text-3xl font-bold italic text-gradient">DankDealz</div>
            <nav className="flex space-x-6">
                <a href="#" className={hoverUnderlineClass}>Home</a>
                <a href="#" className={hoverUnderlineClass}>Shop</a>
                <a href="#" className={hoverUnderlineClass}>About</a>
                <a href="#" className={hoverUnderlineClass}>Contact</a>
            </nav>
        </header>
    );
};

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

function ProductList() {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector(state => state.products || { products: [], loading: false, error: null });
    const [quickViewProduct, setQuickViewProduct] = useState(null);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

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
            <Header />
            <main className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products && products.map((product) => (
                    <ProductCard
                        key={product._id}
                        product={product}
                        openQuickView={openQuickView}
                        addToCart={addToCart}
                    />
                ))}
            </main>
            {quickViewProduct && (
                <QuickView product={quickViewProduct} onClose={closeQuickView} addToCart={addToCart} />
            )}
        </div>
    );
}

export default ProductList;

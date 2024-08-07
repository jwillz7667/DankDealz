import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListings } from '../slices/productSlice';
import { Link, useParams } from 'react-router-dom';
import './ProductList.css';

const ListingCard = ({ listing }) => {
    return (
        <div className="listing-card">
            <img src={listing.image || "https://placehold.co/300x200"} alt={listing.title} className="listing-image"/>
            <h3 className="listing-title">{listing.title}</h3>
            <p className="listing-price">${listing.price}</p>
            <p className="listing-location">{listing.location}</p>
            <p className="listing-date">{new Date(listing.date).toLocaleDateString()}</p>
            <Link to={`/listing/${listing._id}`} className="view-listing-btn">View Listing</Link>
        </div>
    );
};

function ProductList({ categorySlug }) {
    const dispatch = useDispatch();
    const { listings, loading, error } = useSelector(state => state.listings || { listings: [], loading: false, error: null });
    const { slug } = useParams();
    const [location, setLocation] = useState('');

    useEffect(() => {
        dispatch(fetchListings({ categorySlug: categorySlug || slug, location }));
    }, [dispatch, categorySlug, slug, location]);

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="listings-container">
            <h2>{categorySlug || slug} Listings</h2>
            <div className="location-filter">
                <input
                    type="text"
                    placeholder="Enter location (e.g., city, state)"
                    value={location}
                    onChange={handleLocationChange}
                />
            </div>
            <div className="listings-grid">
                {listings && listings.length > 0 ? (
                    listings.map((listing) => (
                        <ListingCard key={listing._id} listing={listing} />
                    ))
                ) : (
                    <div>No listings available in this location</div>
                )}
            </div>
        </div>
    );
}

export default ProductList;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListings } from '../slices/productSlice';
import { Link, useParams } from 'react-router-dom';
import './ProductList.css';

const ListingCard = ({ listing, viewMode }) => {
    if (viewMode === 'gallery') {
        return (
            <Link to={`/listing/${listing._id}`} className="listing-card gallery-view">
                <img src={listing.image || "https://placehold.co/300x200"} alt={listing.title} className="listing-image"/>
                <h3 className="listing-title">{listing.title}</h3>
                <p className="listing-price">${listing.price}</p>
                <p className="listing-location">{listing.location}</p>
                <p className="listing-date">{new Date(listing.date).toLocaleDateString()}</p>
            </Link>
        );
    } else {
        return (
            <Link to={`/listing/${listing._id}`} className="listing-card list-view">
                <h3 className="listing-title">{listing.title}</h3>
                <p className="listing-price">${listing.price}</p>
            </Link>
        );
    }
};

function ProductList({ categorySlug }) {
    const dispatch = useDispatch();
    const { listings, loading, error } = useSelector(state => state.listings || { listings: [], loading: false, error: null });
    const { slug } = useParams();
    const [location, setLocation] = useState('');
    const [viewMode, setViewMode] = useState('gallery');

    useEffect(() => {
        const getUserLocation = async () => {
            try {
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });
                const { latitude, longitude } = position.coords;
                const response = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
                setLocation(response.data.city + ', ' + response.data.principalSubdivision);
            } catch (error) {
                console.error('Error getting user location:', error);
            }
        };

        getUserLocation();
    }, []);

    useEffect(() => {
        if (location) {
            dispatch(fetchListings({ categorySlug: categorySlug || slug, location }));
        }
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
            <div className="view-mode-toggle">
                <button onClick={() => setViewMode('gallery')} className={viewMode === 'gallery' ? 'active' : ''}>Gallery View</button>
                <button onClick={() => setViewMode('list')} className={viewMode === 'list' ? 'active' : ''}>List View</button>
            </div>
            <div className={`listings-${viewMode}`}>
                {listings && listings.length > 0 ? (
                    listings.map((listing) => (
                        <ListingCard key={listing._id} listing={listing} viewMode={viewMode} />
                    ))
                ) : (
                    <div>No listings available in this location</div>
                )}
            </div>
        </div>
    );
}

export default ProductList;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ListingDetails() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios.get(`/api/listings/${id}`);
        setListing(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching listing details');
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!listing) return <div>Listing not found</div>;

  return (
    <div className="listing-details">
      <h2>{listing.title}</h2>
      <img src={listing.image} alt={listing.title} className="listing-image" />
      <p className="price">${listing.price.toFixed(2)}</p>
      <p className="location">{listing.location}</p>
      <p className="description">{listing.description}</p>
      <p className="date">Listed on: {new Date(listing.createdAt).toLocaleDateString()}</p>
      {/* Add more details as needed */}
    </div>
  );
}

export default ListingDetails;

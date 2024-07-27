import React from 'react';
import { Link } from 'react-router-dom';

function VerificationScreen() {
  return (
    <div className="verification-screen">
      <h2>Verify Your Email</h2>
      <p>We've sent a verification email to your registered email address. Please check your inbox and click on the verification link to complete your registration.</p>
      <p>Once verified, you can proceed to set up your profile.</p>
      <Link to="/profile-setup" className="btn btn-primary">Continue to Profile Setup</Link>
    </div>
  );
}

export default VerificationScreen;

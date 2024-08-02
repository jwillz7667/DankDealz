import React from 'react';
import { Link } from 'react-router-dom';

function EmailVerificationScreen() {
  return (
    <div className="email-verification-screen">
      <h2>Verify Your Email</h2>
      <p>We've sent a verification email to your registered email address. Please check your inbox and follow the instructions to verify your email address.</p>
      <p>Once verified, you can proceed to set up your profile.</p>
      <Link to="/profile-setup" className="btn btn-primary">Continue to Profile Setup</Link>
    </div>
  );
}

export default EmailVerificationScreen;

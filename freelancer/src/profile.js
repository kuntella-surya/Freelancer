import React from 'react';
import { Link } from 'react-router-dom';
import { MdDashboard, MdOutlineSettings, MdSecurity } from 'react-icons/md';
import { FaIdBadge, FaMoneyCheckAlt } from 'react-icons/fa';
import { RiVipCrownFill } from 'react-icons/ri';
import './App.css'; // Optional custom styles

function Profile() {
  return (
    <div className="container-fluid mt-4">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 mb-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title fw-bold mb-3">Account</h5>
              <ul className="list-group list-group-flush">
                <Link to="/viewprofile" className="list-group-item list-group-item-action">
                  <FaIdBadge className="me-2" /> View Profile
                </Link>
                <Link to="/membership" className="list-group-item list-group-item-action">
                  <RiVipCrownFill className="me-2" /> Membership
                </Link>
                <Link to="/settings" className="list-group-item list-group-item-action">
                  <MdOutlineSettings className="me-2" /> Settings
                </Link>
                <Link to="/security" className="list-group-item list-group-item-action">
                  <MdSecurity className="me-2" /> Security
                </Link>
                <Link to="/billing" className="list-group-item list-group-item-action">
                  <FaMoneyCheckAlt className="me-2" /> Billing
                </Link>
              </ul>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-md-9">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="card-title">Welcome to Your Profile</h2>
              <p className="card-text">Use the sidebar to navigate through your profile options, manage your membership, account settings, and security.</p>
              {/* You can embed default dashboard content or summary widgets here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

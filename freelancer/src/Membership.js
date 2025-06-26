import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import './App.css';

function Membership() {
  const plans = [
    {
      title: 'Free',
      price: '₹0/month',
      features: ['Browse jobs', 'Basic support', 'Create profile'],
      color: 'secondary',
    },
    {
      title: 'Pro',
      price: '₹499/month',
      features: ['Priority support', 'Verified badge', 'Access premium jobs', '10 bids/day'],
      color: 'primary',
    },
    {
      title: 'Premium',
      price: '₹999/month',
      features: ['24/7 Support', 'Top Freelancer Badge', 'Unlimited bids', 'Featured listing'],
      color: 'success',
    },
  ];

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Try a Freelancer<br></br> Membership</h2>
      <div className="row justify-content-center">
        {plans.map((plan, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className={`card border-${plan.color} shadow h-100`}>
              <div className={`card-header bg-${plan.color} text-white text-center`}>
                <h4 className="mb-0">{plan.title}</h4>
              </div>
              <div className="card-body text-center">
                <h5 className="card-title">{plan.price}</h5>
                <ul className="list-unstyled mt-3 mb-4 text-start">
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>
                      <FaCheckCircle className="text-success me-2" /> {feature}
                    </li>
                  ))}
                </ul>
                <button className={`btn btn-${plan.color} w-100`}>
                  Choose {plan.title}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Membership;

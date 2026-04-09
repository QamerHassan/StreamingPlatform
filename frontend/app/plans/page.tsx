"use client";

import React, { useState } from 'react';
import Header from '@/components/Header';
import { Check, CreditCard, Lock, Shield } from 'lucide-react';
import axios from 'axios';
import { API_ENDPOINTS } from '../../lib/api';

type Plan = {
  id: string;
  name: string;
  price: string;
  priceId?: string;
  features: string[];
  popular?: boolean;
};

const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: '$5.99',
    priceId: 'price_basic',
    features: [
      '720p Resolution',
      '1 Device',
      'Limited Content Library',
      'Ads Supported',
      'Standard Audio'
    ]
  },
  {
    id: 'standard',
    name: 'Standard',
    price: '$9.99',
    priceId: 'price_standard',
    features: [
      '1080p Full HD',
      '2 Devices Simultaneous',
      'Full Content Library',
      'Ad-Free Experience',
      'Download Option',
      'Premium Audio'
    ],
    popular: true
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$14.99',
    priceId: 'price_premium',
    features: [
      '4K Ultra HD + HDR',
      '4 Devices Simultaneous',
      'Full Content Library',
      'Ad-Free Experience',
      'Download Option',
      'Early Access to New Releases',
      'Dolby Atmos Audio'
    ]
  }
];

export default function PlansPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    setShowPaymentForm(true);
  };

  const handleSubscribe = async (planId: string) => {
    setIsProcessing(true);
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        alert('Please login first');
        window.location.href = '/login';
        return;
      }

      const response = await axios.post(
        API_ENDPOINTS.PAYMENT.CREATE_CHECKOUT,
        {
          planId,
          paymentMethod: selectedPaymentMethod
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        // Redirect to success page
        window.location.href = `/success?subscription=${response.data.subscriptionId}`;
      } else {
        alert('Subscription failed. Please try again.');
      }
    } catch (error: any) {
      console.error('Subscription error:', error);
      if (error.response?.status === 401) {
        alert('Please login first');
        window.location.href = '/login';
      } else {
        alert(error.response?.data?.message || 'Subscription failed. Please try again.');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: '💳', description: 'Visa, Mastercard, American Express' },
    { id: 'paypal', name: 'PayPal', icon: '🔵', description: 'Fast & Secure payment through PayPal' },
    { id: 'apple_pay', name: 'Apple Pay', icon: '🍎', description: 'Pay with Apple Pay' },
    { id: 'google_pay', name: 'Google Pay', icon: '📱', description: 'Pay with Google Pay' }
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      
      <div className="pt-24 pb-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Choose Your Plan</h1>
            <p className="text-gray-400 text-xl mb-2">No commitments. Cancel anytime.</p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <Shield className="w-4 h-4" />
              <span>Secure payment • 256-bit SSL encryption</span>
            </div>
          </div>
          
          {/* Plans Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {plans.map((plan) => (
              <div 
                key={plan.id} 
                className={`relative border-2 rounded-xl p-8 transition-all hover:scale-105 ${
                  plan.popular 
                    ? 'border-red-600 bg-gradient-to-b from-red-900/20 to-transparent shadow-2xl shadow-red-900/20' 
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    MOST POPULAR
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    <span className="text-lg text-gray-400">/month</span>
                  </div>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  onClick={() => handleSelectPlan(plan.id)}
                  disabled={isProcessing}
                  className={`w-full py-4 rounded-lg font-bold text-lg transition ${
                    plan.popular 
                      ? 'bg-red-600 hover:bg-red-700 text-white' 
                      : 'bg-gray-700 hover:bg-gray-600 text-white'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isProcessing ? 'Processing...' : 'Select Plan'}
                </button>
              </div>
            ))}
          </div>

          {/* Payment Method Selection */}
          {showPaymentForm && selectedPlan && (
            <div className="bg-gray-900 rounded-xl p-8 mb-8 border border-gray-800">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <CreditCard className="w-6 h-6" />
                Choose Payment Method
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    onClick={() => setSelectedPaymentMethod(method.id)}
                    className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedPaymentMethod === method.id
                        ? 'border-red-600 bg-red-900/20'
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{method.icon}</span>
                        <div>
                          <h3 className="font-semibold text-lg">{method.name}</h3>
                          <p className="text-sm text-gray-400">{method.description}</p>
                        </div>
                      </div>
                      {selectedPaymentMethod === method.id && (
                        <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Security Badge */}
              <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-6">
                <Lock className="w-4 h-4" />
                <span>Your payment information is secure and encrypted</span>
              </div>

              {/* Confirm Button */}
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setShowPaymentForm(false);
                    setSelectedPlan(null);
                  }}
                  className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSubscribe(selectedPlan)}
                  disabled={isProcessing}
                  className="flex-1 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'Processing...' : `Subscribe to ${plans.find(p => p.id === selectedPlan)?.name}`}
                </button>
              </div>
            </div>
          )}
          
          {/* Payment Methods Info */}
          <div className="bg-gray-900 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Supported Payment Methods</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="border border-gray-700 rounded-lg p-4 hover:border-gray-500 transition text-center">
                <div className="text-4xl mb-2">💳</div>
                <h3 className="font-semibold mb-1">Credit/Debit Cards</h3>
                <p className="text-sm text-gray-400">Visa, Mastercard, Amex</p>
              </div>
              
              <div className="border border-gray-700 rounded-lg p-4 hover:border-gray-500 transition text-center">
                <div className="text-4xl mb-2">🔵</div>
                <h3 className="font-semibold mb-1">PayPal</h3>
                <p className="text-sm text-gray-400">Fast & Secure</p>
              </div>
              
              <div className="border border-gray-700 rounded-lg p-4 hover:border-gray-500 transition text-center">
                <div className="text-4xl mb-2">🍎</div>
                <h3 className="font-semibold mb-1">Apple Pay</h3>
                <p className="text-sm text-gray-400">Touch ID & Face ID</p>
              </div>
              
              <div className="border border-gray-700 rounded-lg p-4 hover:border-gray-500 transition text-center">
                <div className="text-4xl mb-2">📱</div>
                <h3 className="font-semibold mb-1">Google Pay</h3>
                <p className="text-sm text-gray-400">Quick & Easy</p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4 max-w-3xl mx-auto">
              <details className="bg-gray-900 rounded-lg p-6 cursor-pointer group">
                <summary className="font-semibold text-lg group-hover:text-red-600 transition">
                  Can I cancel anytime?
                </summary>
                <p className="mt-3 text-gray-400">
                  Yes, you can cancel your subscription at any time. There are no long-term contracts or cancellation fees. Your access will continue until the end of your current billing period.
                </p>
              </details>
              
              <details className="bg-gray-900 rounded-lg p-6 cursor-pointer group">
                <summary className="font-semibold text-lg group-hover:text-red-600 transition">
                  Can I change my plan?
                </summary>
                <p className="mt-3 text-gray-400">
                  Absolutely! You can upgrade or downgrade your plan at any time from your account settings. Changes will be reflected in your next billing cycle.
                </p>
              </details>
              
              <details className="bg-gray-900 rounded-lg p-6 cursor-pointer group">
                <summary className="font-semibold text-lg group-hover:text-red-600 transition">
                  Is there a free trial?
                </summary>
                <p className="mt-3 text-gray-400">
                  We offer a 7-day free trial for new subscribers. No credit card required to start. Cancel anytime during the trial period and you won't be charged.
                </p>
              </details>

              <details className="bg-gray-900 rounded-lg p-6 cursor-pointer group">
                <summary className="font-semibold text-lg group-hover:text-red-600 transition">
                  What payment methods do you accept?
                </summary>
                <p className="mt-3 text-gray-400">
                  We accept all major credit and debit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay. All payments are processed securely through Stripe.
                </p>
              </details>

              <details className="bg-gray-900 rounded-lg p-6 cursor-pointer group">
                <summary className="font-semibold text-lg group-hover:text-red-600 transition">
                  Can I watch on multiple devices?
                </summary>
                <p className="mt-3 text-gray-400">
                  Yes! The number of devices you can watch on simultaneously depends on your plan. Basic allows 1 device, Standard allows 2, and Premium allows 4 devices at the same time.
                </p>
              </details>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-8 text-gray-400">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                <span>256-bit SSL</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5" />
                <span>Money Back Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

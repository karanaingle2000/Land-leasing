import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with your publishable key
// In production, this should come from environment variables
const stripePromise = loadStripe('pk_test_51234567890abcdef...');

export default stripePromise;
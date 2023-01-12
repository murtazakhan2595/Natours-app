/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51MOGVbEWv6qtGZKwPGOdzP7CfI3HbdQb5dJlTvJ5uP0jYZ1syEcuzPhm7r4LxvUlsM6kIG4ecIEptC3hE25Tu1TU00V9QKJstl'
);

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // console.log(session);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};

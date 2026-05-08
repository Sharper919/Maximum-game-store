import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainScreen from './components/main-screen/MainScreen';
import SignUpPage from './components/authorization/SignUpPage';
import SignInPage from './components/authorization/SignInPage';
import GameScreen from './components/game_screen/GameScreen';
import UserProfilePage from './components/user_profile/UserProfilePage';
import Cart from './components/cart/Cart';
import CheckoutPage from './components/checkout/CheckoutPage';
import ThankYouPage from './components/thank-you-page/ThankYouPage';
import AdminPage from './components/admin/AdminPage';
import GameForm from './components/admin/GameForm';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/game/:id" element={<GameScreen />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/games/create" element={<GameForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

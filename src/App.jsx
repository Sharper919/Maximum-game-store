import './App.css';
//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import MainScreen from './components/main-screen/MainScreen';
// import SignUpPage from './components/authorization/SignUpPage';
// import SignInPage from './components/authorization/SignInPage';
// import GameScreen from './components/game_screen/GameScreen';
// import Cart from './components/cart/Cart';
import UserProfilePage from './components/user_profile/UserProfilePage';

function App() {
  return (
    <div className='App'>
      {/*<Router>
        <Routes>
           <Route path="/" element={<MainScreen />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/game" element={<GameScreen />} />
          <Route path="/cart" element={<Cart />} /> 
        </Routes>
      </Router>*/}
      <UserProfilePage />
    </div>
  );
}

export default App;

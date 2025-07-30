import './App.css';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import MainScreen from './components/MainScreen';
// import SignUpPage from './components/SignUpPage';
// import SignInPage from './components/SignInPage';
import GameScreen from './components/GameScreen';

function App() {
  return (
    <div className='App'>
      {/* <Router>
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
        </Routes>
      </Router> */
      }
      <GameScreen />
    </div>
  );
}

export default App;

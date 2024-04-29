import logo from './logo.svg';
import './App.css';
import LoginPageComponent from './pages/LoginPage';
import AuthProvider from './context/AuthProvider';
import StrategyProvider from './context/StrategyProvider';
import LayoutComponent from './pages/Layout';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      <StrategyProvider>
        <LayoutComponent />
      </StrategyProvider>
    </AuthProvider>
    </BrowserRouter>
    
  );
}

export default App;

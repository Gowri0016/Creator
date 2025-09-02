
import { Route, Routes } from 'react-router-dom';
import Details from './Component/Details'
import './App.css';
import Header from './Component/Header';
import Footer from './Component/Footer';
import Galery from './Component/Galery';
import Login from './Component/Login';


function App() {
  return (
    <div className="App">

      <Header />
      <Routes>
        <Route path='/' element={<Details />} />
        <Route path='/galery' element={<Galery />} />
        <Route path='/login' element={<Login /> } />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

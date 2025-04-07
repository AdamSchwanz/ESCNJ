import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from "react-redux";
import Loader from './components/Loader/Loader';
import Login from './pages/Login/Login';

const App = () => {
  const { counter } = useSelector((state) => state.loader);
  const loading = counter > 0;

  return (
    <div className='App'>
      {loading && <Loader />}
      <Routes>
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  )
};

export default App;

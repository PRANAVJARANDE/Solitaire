import React from 'react';
import './Header.css';
import logo from '../../logo.png'
import { useSelector, useDispatch } from 'react-redux';
import { clicked, initialize,togglestock } from '../../store/stateslice';
import { useNavigate ,useLocation} from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();
  let navigate=useNavigate();
  const location=useLocation();
  return (
    <header>
      <img src={logo}/>
      <h1>Solitaire</h1>

      {location.pathname === '/rules' ? (
        <button className='newgame' onClick={()=>{
          navigate('');
        }}>Back</button>
      ):(
        <div className='headerbuttons'>
          <button className='newgame' onClick={()=>{
          dispatch(initialize());
          navigate('');
          }}>New Game</button>
        <button className='newgame' onClick={()=>{
          navigate('/rules');
        }}>Rules</button>
      </div>
      )}


      


    </header>
  );
};

export default Header;

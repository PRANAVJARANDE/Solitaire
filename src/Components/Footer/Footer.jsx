import React, { useEffect, useState } from 'react';
import './Footer.css';
import { useSelector,useDispatch} from 'react-redux';
import { incrementTime } from '../../store/stateslice';

const Footer = () => {
  const dispatch=useDispatch();
  let moves=useSelector((state)=>{return state.moves});
  let time=useSelector((state)=>{return state.time});
  let best=useSelector((state)=>{return state.best});
  const [lbest,setlbest]=useState(best);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  useEffect(() => {
    const storedBest = JSON.parse(localStorage.getItem('best'));
    if (storedBest) {
      setlbest(storedBest);
    }
  }, []);

  useEffect(() => {
    let timer;
    if (moves > 0) {
      timer = setInterval(() => {
        dispatch(incrementTime());
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [moves==0, dispatch]);


  useEffect(() => {
    if (best.moves !== null && best.time !== null) {
      localStorage.setItem('best', JSON.stringify(best));
      setlbest(best);
    }
  }, [best]);

  return (
    <footer>
        <div className="footer-section">
          <span>Moves: {moves}</span>
          <span>Time: {formatTime(time)}</span>
        </div>
        <div className="footer-section">
          <div>BEST : </div>
          <div>Moves: {lbest.moves ? lbest.moves : 0}</div>
          <span>Time: {formatTime(lbest.time)}</span>
        </div>
    </footer>

  );
};

export default Footer;

import { Link } from 'react-router-dom';
import kortele from '../../../assets/kortele.jpg'

const HomeWelcome = () => {
  return (
    <div className="create">
      <img src={kortele} alt="kortele" />
      <h2>Welcome to Category poster app</h2>
      <p>Check some posters from favourite categories</p>
      <Link to="/login">
        <button className='home-button'>Login</button>
      </Link>
      <Link to="/register">
        <button className='home-button'>Register</button>
      </Link>
    </div>
  );
}

export default HomeWelcome;
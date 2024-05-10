import { useNavigate } from 'react-router-dom';
import Footer from "../components/Footer";
import "./../App.css";

function HomePage() {
  const navigate = useNavigate();

  function handleLoginPageClick() {
    navigate('/login');     // Navigate to the Login/Register page
  }

  function handleBookshopPageClick() {
    navigate('/bookshop');  // Navigate to the Bookshop page
  }

  function handleRegisterPageClick() {
    navigate('/register');  // Navigate to the Register page
  }

  return (
    <>
    <div className = "div_general">

      <h1> Welcome to the Team 5 Bookstore! </h1>

      <button
        className   = "button_1" onClick = {handleLoginPageClick}
        onMouseOver = {e => e.currentTarget.style.backgroundColor = '#0056b3'}
        onMouseOut  = {e => e.currentTarget.style.backgroundColor = '#007BFF'}
      > Login / Register </button>

      <button
        className   = "button_1" onClick = {handleBookshopPageClick}
        onMouseOver = {e => e.currentTarget.style.backgroundColor = '#0056b3'}
        onMouseOut  = {e => e.currentTarget.style.backgroundColor = '#007BFF'}
      > Bookshop </button>

      <button
        className   = "button_1" onClick = {handleRegisterPageClick}
        onMouseOver = {e => e.currentTarget.style.backgroundColor = '#0056b3'}
        onMouseOut  = {e => e.currentTarget.style.backgroundColor = '#007BFF'}
      > Admin </button>

      <footer>  {/* Footer of the page */}
        <Footer />
      </footer>
    </div>
    </>
  );
}

export default HomePage;
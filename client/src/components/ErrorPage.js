import react from 'react';
import { NavLink } from 'react-router-dom';
import './css/errorPage.css';

const ErrorPage = () => {

  return(
    <>
    <p className="no-found">404</p>
    <h1 className="error">Error Page</h1>
    <h2 className="excuse">We are sorry, page not found</h2>
    <div className="form-group">
		<NavLink to="/">
            <input type="button" value="Back to Main Page" className="btn1"  />
        </NavLink>
	</div>

    </>
  )
}

export default ErrorPage;
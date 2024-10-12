import React from 'react';
import { Link } from 'react-router-dom';
import './login.css'

function Login() {
  return (
    <div className='login'>
      <h1>Login</h1>
      <div className='log'>
      <form>
        <fieldset>
          {/* <legend>Log In</legend> */}
          <label htmlFor="email"></label>
          <input type="email" id="email" placeholder="Email" autoComplete="on" /><br /><br />
          <label htmlFor="password"></label>
          <input type="password" id="password" placeholder="Password" /><br /><br />
          <input type="checkbox" name="remember" id="remember" />
          <label htmlFor="remember">Remember me</label><br /><br />
          <input type="submit" value="LOG IN" className='logbtn'/>
          <br /><br />
          <Link to="/SignUp" className='create'>Sign Up</Link>
        </fieldset>
      </form>
      </div>
    </div>
  );
}

export default Login;
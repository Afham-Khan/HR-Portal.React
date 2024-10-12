import React from 'react';
import { Link } from 'react-router-dom';
import './SignUp.css'

function SignUp() {
  return (
    <div className='sign'>
      <h1>Sign Up to HR PORTAL</h1>
      <form className='sgn' >
        <fieldset>
          <legend>Register</legend>
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" placeholder="First Name" required /><br /><br />
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" placeholder="Last Name" required /><br /><br />
          <label htmlFor="birthday">Birthday</label>
          <input type="date" id="birthday" required />
          <br /><br />
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Email" required /><br /><br />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Password" required /><br /><br />
          <input type="checkbox" name="remember" id="remember" />
          <label htmlFor="remember">Remember me</label><br /><br />
          <input type="submit" value="SIGN IN" className='sgnbtn' />
          <br /><br />
          <Link to="/login">Or Log in</Link>
        </fieldset>
      </form>
    </div>
  );
}

export default SignUp;
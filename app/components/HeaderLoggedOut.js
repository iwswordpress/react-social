import React, { useState, useContext } from 'react';
// import Axios from 'axios';
import DispatchContext from '../DispatchContext';

function HeaderLoggedOut(props) {
  const appDispatch = useContext(DispatchContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const options = {};
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    // Genereate URL
    let apiUrl = 'https://49plus.co.uk/wp-social/wp-json/social/v1/login';
    console.log('url: ' + apiUrl);
    // USE FETCH API
    fetch(apiUrl, {
      method: 'POST', // set FETCH type GET/POST, if none specified GET is default
      body: formData // append form data
    })
      .then(function (response) {
        console.log(response);
        return response.json(); // convert stream response tot text
      })
      .then(function (data) {
        console.log(data);
        const user = {
          token: data.token,
          username: data.username,
          email: data.email,
          id: data.userId,
          avatar: data.avatar
        };
        console.log('USER: ', user);
        appDispatch({ type: 'login', data: user });
      });
  }

  return (
    <form onSubmit={handleSubmit} className='mb-0 pt-2 pt-md-0'>
      <div className='row align-items-center'>
        <div className='col-md mr-0 pr-md-0 mb-3 mb-md-0'>
          <input
            onChange={e => setEmail(e.target.value)}
            name='email'
            className='form-control form-control-sm input-dark'
            type='text'
            placeholder='Email'
            autoComplete='off'
          />
        </div>
        <div className='col-md mr-0 pr-md-0 mb-3 mb-md-0'>
          <input
            onChange={e => setPassword(e.target.value)}
            name='password'
            className='form-control form-control-sm input-dark'
            type='password'
            placeholder='Password'
          />
        </div>
        <div className='col-md-auto'>
          <button className='btn btn-success btn-sm'>Sign In</button>
        </div>
      </div>
    </form>
  );
}

export default HeaderLoggedOut;

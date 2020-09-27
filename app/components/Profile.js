import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import Page from './Page';
import ProfilePosts from './ProfilePosts';
import StateContext from '../StateContext';
function Profile() {
  // const { username } = useParams()
  const appState = useContext(StateContext);
  const [profileData, setProfileData] = useState({
    profileUsername: '...',
    profileAvatar: 'https://gravatar.com/avatar/placeholder?s=128',
    isFollowing: false,
    counts: { postCount: '', followerCount: '', followingCount: '' }
  });
  const { id, username, avatar, email, token } = appState.user;
  console.log('PROFILE USER: ', appState.user);
  useEffect(() => {
    const formData = new FormData();
    formData.append('userId', id);

    // Genereate URL
    // let apiUrl = 'https://49plus.co.uk/wp-social/wp-json/social/v1/login';
    // console.log('url: ' + apiUrl);
    // // USE FETCH API
    // fetch(apiUrl, {
    //   method: 'POST', // set FETCH type GET/POST, if none specified GET is default
    //   body: formData // append form data
    // })
    //   .then(function (response) {
    //     console.log(response);
    //     return response.json(); // convert stream response tot text
    //   })
    //   .then(function (data) {
    //     console.log(data);
    //     const user = {
    //       token: data.token,
    //       username: data.username,
    //       email: data.email,
    //       id: data.id,
    //       avatar: data.avatar
    //     };
    //     console.log('USER: ', user);
    //     appDispatch({ type: 'login', data: user });
    //   });
    // fetchData();
  }, []);
  return (
    <Page title='Profile Screen'>
      <p style={{ fontSize: '12px', wordWrap: 'break-word' }}>Token: {token}</p>
      <p>
        {' '}
        ID : {id} Email: {email}
      </p>

      <h2>
        <img className='avatar-small' src={avatar} />
        {username}
        <button className='btn btn-primary btn-sm ml-2'>
          Follow <i className='fas fa-user-plus'></i>
        </button>
      </h2>
      <div className='profile-nav nav nav-tabs pt-2 mb-4'>
        <a href='#' className='active nav-item nav-link'>
          Posts: 3
        </a>
        <a href='#' className='nav-item nav-link'>
          Followers: 101
        </a>
        <a href='#' className='nav-item nav-link'>
          Following: 40
        </a>
      </div>
      <ProfilePosts />
    </Page>
  );
}

export default Profile;

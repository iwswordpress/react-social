import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import Page from './Page';
import StateContext from '../StateContext';
function Profile() {
  const { username } = useParams();
  console.log('USERNAME: ', username);
  const appState = useContext(StateContext);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await Axios.post(`/profile/${username}`, {
          token: appState.user.token
        });
        setProfileData(response.data);
      } catch (e) {
        console.log('PROFILE: There was a problem.');
      }
    }
    fetchData();
  }, []);
  return (
    <Page title='Profile Screen'>
      {' '}
      <h2>
        <img
          className='avatar-small'
          src='https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128'
        />{' '}
        brad
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
      <div className='list-group'>
        <a href='#' className='list-group-item list-group-item-action'>
          <img
            className='avatar-tiny'
            src='https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128'
          />{' '}
          <strong>Example Post #1</strong>
          <span className='text-muted small'>on 2/10/2020 </span>
        </a>
        <a href='#' className='list-group-item list-group-item-action'>
          <img
            className='avatar-tiny'
            src='https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128'
          />{' '}
          <strong>Example Post #2</strong>
          <span className='text-muted small'>on 2/10/2020 </span>
        </a>
        <a href='#' className='list-group-item list-group-item-action'>
          <img
            className='avatar-tiny'
            src='https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128'
          />{' '}
          <strong>Example Post #3</strong>
          <span className='text-muted small'>on 2/10/2020 </span>
        </a>
      </div>
    </Page>
  );
}

export default Profile;

import React, { useEffect, useState, useContext } from 'react';
import Page from './Page';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import DispatchContext from '../DispatchContext';

function CreatePost(props) {
  const [title, setTitle] = useState();
  const [body, setBody] = useState();

  const appDispatch = useContext(DispatchContext);

  // https://reactnetwork2020.firebaseio.com/
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await Axios.post('/create-post', {
        title,
        body,
        token: localStorage.getItem('complexappToken')
      });
      // Redirect to new post url
      console.log('[CONFIG ] ', response.config);
      console.log('[CONFIG DATA] ', response.config.data);
      let id = JSON.parse(response.config.data);
      console.log(id.title);
      id = id.title;
      appDispatch({
        type: 'flashMessage',
        value: 'Congrats. You have created a new post'
      });
      props.history.push(`/post/${id}`);
      console.log('New post was created.');
    } catch (e) {
      console.log('There was a problem.');
    }
  }

  return (
    <Page title='Create New Post'>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='post-title' className='text-muted mb-1'>
            <small>Title</small>
          </label>
          <input
            onChange={e => setTitle(e.target.value)}
            autoFocus
            name='title'
            id='post-title'
            className='form-control form-control-lg form-control-title'
            type='text'
            placeholder=''
            autoComplete='off'
          />
        </div>

        <div className='form-group'>
          <label htmlFor='post-body' className='text-muted mb-1 d-block'>
            <small>Body Content</small>
          </label>
          <textarea
            onChange={e => setBody(e.target.value)}
            name='body'
            id='post-body'
            className='body-content tall-textarea form-control'
            type='text'
          ></textarea>
        </div>

        <button className='btn btn-primary'>Save New Post</button>
      </form>
    </Page>
  );
}

export default withRouter(CreatePost);

import React, { useEffect, useState, useContext } from 'react';
import Page from './Page';
import { withRouter } from 'react-router-dom';
import DispatchContext from '../DispatchContext';
import StateContext from '../StateContext';

function CreatePost(props) {
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const id = 54;
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    formData.append('id', id);

    // Genereate URL
    let apiUrl = 'https://49plus.co.uk/wp-social/wp-json/social/v1/add-post';
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
        console.log('RESPONSE: ', data);
        console.log('postId: ', data.postId);
        props.history.push(`/post/${data.postId}`);
      });
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

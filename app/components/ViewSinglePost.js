import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import Page from './Page';
import StateContext from '../StateContext';

function ViewSinglePost() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const appState = useContext(StateContext);
  const [post, setPost] = useState();
  const { avatar, username } = appState.user;
  let apiUrl =
    'https://49plus.co.uk/wp-social/wp-json/social/v2/get-post-id/' + id;
  useEffect(() => {
    console.log('url: ' + apiUrl);
    // USE FETCH API
    fetch(apiUrl)
      .then(function (response) {
        console.log(response);
        return response.json(); // convert stream response tot text
      })
      .then(function (data) {
        setPost(data[0]);
        setIsLoading(false);
      });
  }, []);

  if (isLoading)
    return (
      <Page title='...'>
        <div>Loading...</div>
      </Page>
    );
  const date = new Date(post.posted_on);
  const dateFormatted = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
  return (
    <Page title={post.title}>
      <div className='d-flex justify-content-between'>
        <h2>
          {post.id}&nbsp;{post.title}
        </h2>
        <span className='pt-2'>
          <a href='#' className='text-primary mr-2' title='Edit'>
            <i className='fas fa-edit'></i>
          </a>
          <a className='delete-post-button text-danger' title='Delete'>
            <i className='fas fa-trash'></i>
          </a>
        </span>
      </div>

      <p className='text-muted small mb-4'>
        <Link to={`/profile/${username}`}>
          <img className='avatar-tiny' src={avatar} />
        </Link>
        Posted by <Link to={`/profile/${username}`}>{username}</Link> on{' '}
        {dateFormatted}
      </p>

      <div className='body-content'>{post.body}</div>
    </Page>
  );
}

export default ViewSinglePost;

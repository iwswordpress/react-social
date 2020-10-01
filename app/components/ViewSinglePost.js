import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, withRouter } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import ReactTooltip from 'react-tooltip';
import Page from './Page';
import LoadingDotsIcon from './LoadingDotsIcon';
import StateContext from '../StateContext';

function ViewSinglePost(props) {
  console.log(props);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const appState = useContext(StateContext);
  const [post, setPost] = useState();
  const { avatar, username } = appState.user;
  console.log('APP STATE: ', appState.user);
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
        console.log('POST', data[0]);
        setPost(data[0]);
        setIsLoading(false);
      })
      .catch(error => console.log('ERROR: ', error));
    return () => {
      console.log('cancel fetch token');
    };
  }, []);

  if (isLoading)
    return (
      <Page title='...'>
        <LoadingDotsIcon />
      </Page>
    );
  const date = new Date(post.posted_on);
  const dateFormatted = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  function isOwner() {
    const isPostOwner = appState.user.id == post.user_id;
    console.log('isOwner: ', isPostOwner);
    return isPostOwner;
  }
  function deleteHandler() {
    const areYouSure = window.confirm('Do you want to delete this post?');
    if (areYouSure) {
      // alert('Will delete');

      const formData = new FormData();
      formData.append('id', id);

      // Genereate URL
      let apiUrl =
        'https://49plus.co.uk/wp-social/wp-json/social/v2/delete-post';
      console.log('url: ' + apiUrl);
      // USE FETCH API
      fetch(apiUrl, {
        method: 'POST', // set FETCH type GET/POST, if none specified GET is default
        body: formData // append form data
      })
        .then(function (response) {
          return response.json(); // convert stream response tot text
        })
        .then(function (data) {
          console.log('Result ', data);
        });
      props.history.push(`/post/${username}`);
    }
  }
  return (
    <Page title={post.title}>
      <div className='d-flex justify-content-between'>
        <h2>
          {post.id}&nbsp;{post.title}
        </h2>
        {isOwner() && (
          <span className='pt-2'>
            <Link
              to={`/post/${id}/edit`}
              data-tip='Edit'
              data-for='edit'
              className='text-primary mr-2'
            >
              <i className='fas fa-edit'></i>
            </Link>
            <ReactTooltip id='edit' className='custom-tooltip' />{' '}
            <a
              data-tip='Delete'
              data-for='delete'
              className='delete-post-button text-danger'
              onClick={deleteHandler}
            >
              <i className='fas fa-trash'></i>
            </a>
            <ReactTooltip id='delete' className='custom-tooltip' />
          </span>
        )}
      </div>

      <p className='text-muted small mb-4'>
        <Link to={`/profile/${username}`}>
          <img className='avatar-tiny' src={avatar} />
        </Link>
        Posted by <Link to={`/profile/${username}`}>{username}</Link> on{' '}
        {dateFormatted}
      </p>

      <div className='body-content'>
        <ReactMarkdown source={post.body} />
      </div>
    </Page>
  );
}

export default withRouter(ViewSinglePost);

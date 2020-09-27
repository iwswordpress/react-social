import React, { useEffect, useState, useContext } from 'react';
import Axios from 'axios';
import StateContext from '../StateContext';
import { useParams, Link } from 'react-router-dom';
import LoadingDotsIcon from './LoadingDotsIcon';

function ProfilePosts(props) {
  const appState = useContext(StateContext);
  const { avatar } = appState.user;
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const formData = new FormData();

    formData.append('id', 54);

    // Genereate URL
    let apiUrl = `https://49plus.co.uk/wp-social/wp-json/social/v2/get-posts-user`;
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
        setPosts(data);
        setIsLoading(false);
        console.log(data);
        console.log('RESPONSE: ', data);
      });
  }, []);

  if (isLoading) return <LoadingDotsIcon />;

  return (
    <div className='list-group'>
      {posts.map(post => {
        const date = new Date(post.posted_on);
        const dateFormatted = `${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()}`;

        return (
          <Link
            key={post._id}
            to={`/post/${post._id}`}
            className='list-group-item list-group-item-action'
          >
            <img className='avatar-tiny' src={avatar} />{' '}
            <strong>
              {post.id} &nbsp;{post.title}
            </strong>
            <span className='text-muted small'>on {dateFormatted} </span>
          </Link>
        );
      })}
    </div>
  );
}

export default ProfilePosts;

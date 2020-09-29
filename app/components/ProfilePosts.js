import React, { useEffect, useState, useContext } from 'react';
import StateContext from '../StateContext';
import { Link } from 'react-router-dom';
import LoadingDotsIcon from './LoadingDotsIcon';

function ProfilePosts(props) {
  const appState = useContext(StateContext);
  const { avatar, id } = appState.user;
  console.log('ID: ', id);

  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  let apiUrl =
    'https://49plus.co.uk/wp-social/wp-json/social/v2/get-posts-userid/' + id;
  useEffect(() => {
    console.log('url: ' + apiUrl);
    // USE FETCH API
    fetch(apiUrl)
      .then(function (response) {
        console.log(response);
        return response.json(); // convert stream response tot text
      })
      .then(function (data) {
        setPosts(data);
        setIsLoading(false);
        console.log(data);
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
            key={post.id}
            to={`/post/${post.id}`}
            className='list-group-item list-group-item-action'
          >
            <img className='avatar-tiny' src={avatar} />{' '}
            <strong>
              {post.id} &nbsp;{post.title}
            </strong>
            <span className='text-muted small'> on {dateFormatted} </span>
          </Link>
        );
      })}
    </div>
  );
}

export default ProfilePosts;

import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import DispatchContext from '../DispatchContext';
function HeaderLoggedIn(props) {
  const appDispatch = useContext(DispatchContext);
  let history = useHistory();
  function handleLogout() {
    appDispatch({ type: 'logout' });
    localStorage.removeItem('complexappToken');
    localStorage.removeItem('complexappUsername');
    localStorage.removeItem('complexappAvatar');
    //redirect HomeGuest
    history.push('/');
  }
  return (
    <div className='flex-row my-3 my-md-0'>
      <a href='#' className='text-white mr-2 header-search-icon'>
        <i className='fas fa-search'></i>
      </a>
      <span className='mr-2 header-chat-icon text-white'>
        <i className='fas fa-comment'></i>
        <span className='chat-count-badge text-white'> </span>
      </span>
      <a href='#' className='mr-2'>
        <img
          className='small-header-avatar'
          src={localStorage.getItem('complexappAvatar')}
        />
      </a>
      <Link className='btn btn-sm btn-success mr-2' to='/create-post'>
        Create Post
      </Link>
      <button className='btn btn-sm btn-secondary' onClick={handleLogout}>
        Sign Out
      </button>
    </div>
  );
}

export default HeaderLoggedIn;

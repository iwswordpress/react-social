import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Page from './Page';

function EditPost() {
  const { id } = useParams();
  return <Page title='Edit Post'>{id} Edit Post</Page>;
}

export default EditPost;

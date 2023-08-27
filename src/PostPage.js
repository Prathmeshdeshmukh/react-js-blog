// import axios from 'axios';
import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useStoreActions, useStoreState } from 'easy-peasy';

const PostPage = () => {
  const URL = 'https://jsonplaceholder.typicode.com/posts';
  const { id } = useParams();
  const navigate = useNavigate();
  const deletePost = useStoreActions((actions) => actions.deletePost);
  const getPostById = useStoreState((state) => state.getPostById);
  const post = getPostById(id);

  const handleDelete = async (id) => {
    // console.log(post);
    console.log("deleted post", id);
    deletePost(id);
    navigate("/");
  }

  return (
    <main className='postPage'>
      <article className='post'>
        {post && <>
          <h2>{post.title}</h2>
          <p className='postDate'>{post.datetime}</p>
          <p className='postBody'>{post.body}</p>
          <Link to={`/edit/${id}`}><button id='editPost'>
            Edit Post
          </button></Link>

          <button id='deleteButton' onClick={() => handleDelete(post.id)}>
            Delete Post
          </button>
        </>
        }
        {!post &&
          <>
            <h2>Post Not Found</h2>
            <p>Well, that's disappointing.</p>
            <p>
              <Link to='/'>Visit Our Homepage</Link>
            </p>
          </>
        }
      </article>
    </main>
  )
}

export default PostPage
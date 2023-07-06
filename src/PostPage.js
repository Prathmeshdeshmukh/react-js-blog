import axios from 'axios';
import React, { useContext } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import DataContext from './context/DataContext';


const PostPage = () => {
  const URL = 'http://localhost:3500/posts';
  const { id }= useParams();
  const {posts ,setPosts} = useContext(DataContext);
  const post = posts.find(post => (post.id).toString() === id);
  const navigate = useNavigate();

  const handleDelete = async(id)=>{
    try {
      await axios.delete(`${URL}/${id}`);
      const newPosts = posts.filter(post=> post.id !== id);     
      setPosts(newPosts);
      navigate("/");
    } catch (error) {
       
    }
  }

  return (
    <main className='postPage'>
      <article className='post'>
          {post && <>
              <h2>{post.title}</h2>
              <p className='postDate'>{post.datetime}</p>
              <p className='postBody'>{post.body}</p>    
              <Link to = {`/edit/${id}`}><button id='editPost'>
                Edit Post
              </button></Link>
              
              <button id='deleteButton' onClick={()=> handleDelete(post.id)}>
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
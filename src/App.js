import './App.css';
import Header from './Header';
import Home from './Home';
import Footer from './Footer';
import Nav from './Nav'
import NewPost from  './NewPost'
import PostPage from './PostPage';
import EditPost from './EditPost';
import Missing from './Missing';
import About from './About.js'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect}  from 'react';
import { format } from 'date-fns';
import useWindowSize from './hooks/useWindowSize';
import useAxiosFetch from './hooks/useAxiosFetch';

function App() {
  const URL = 'http://localhost:3500/posts';
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const { width } = useWindowSize();
  const { data , fetchError, isLoading} = useAxiosFetch('http://localhost:3500/posts');
  
  useEffect(()=>{
    setPosts(data);
  },[data])

  useEffect(()=>{
    const filteredResults = posts.filter(post => 
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()))

      setSearchResults(filteredResults.reverse());
  }, [posts, search])
  
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

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const id = posts.length ? posts[posts.length-1].id +1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id , title : postTitle, datetime, body: postBody};
    try {
      const response = await axios.post(URL, newPost);
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      // setPosts(allPosts);
      setPostTitle('');
      setPostBody('');
      navigate('/');          
    } catch (error) {
      console.log(error)
    }
  }

  const handleEdit = async(id) =>{
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = { id, title: editTitle, datetime, body: editBody };
    try {
      const response = await axios.put(`${URL}/${id}`, updatedPost);
      setPosts(posts.map(post => post.id === id ? {...response.data} : post))
      setEditTitle('');
      setEditBody('');
      navigate('/');          
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  return (
    <div className="App">   
      <Header title= "React JS Blog" width ={width} />
      <Nav search={search} setSearch={setSearch}/>
      <Routes>
        <Route path="/" 
          element={<Home 
                      posts = {searchResults}
                      fetchError ={fetchError}
                      isLoading = {isLoading}
                  />} />
        <Route path="/post" element={<NewPost 
          handleSubmit ={handleSubmit}
          postBody= {postBody}
          setPostBody={setPostBody}
          postTitle={postTitle}
          setPostTitle={setPostTitle}
        />} />

        <Route path="/post/:id" element={<PostPage posts={posts} handleDelete={handleDelete}/>} />

        <Route path="/about" element={<About />} />
        <Route path= "/edit/:id" element= {<EditPost 
          handleEdit ={handleEdit}
          posts={posts}
          editTitle = {editTitle}
          setEditTitle= {setEditTitle}
          setEditBody= {setEditBody}
          editBody={editBody}
        />}/>

        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
      </div>
  );
}

export default App;

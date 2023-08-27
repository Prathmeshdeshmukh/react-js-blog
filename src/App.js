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
} from 'react-router-dom';
import useAxiosFetch from './hooks/useAxiosFetch';
import { useEffect } from 'react';
import { useStoreActions } from 'easy-peasy';
 

function App() {
  const { data, fetchError, isLoading } = useAxiosFetch('https://jsonplaceholder.typicode.com/posts');
  const setPosts = useStoreActions((actions) => actions.setPosts)

    useEffect(() => {
        setPosts(data); 
    }, [data])
  return (
    <div className="App">  
       
        <Header title= "React JS Blog"/>
        <Nav/>
        <Routes>
          <Route path="/" element={<Home 
            isLoading ={isLoading}
            fetchError={fetchError}
          />} />
          <Route path="/post" element={<NewPost/>} />
          <Route path="/post/:id" element={<PostPage/>} />
          <Route path="/about" element={<About />} />
          <Route path= "/edit/:id" element = {<EditPost />}/>
          <Route path="*" element={<Missing />} />
        </Routes>
      <Footer />
      </div>
  );
}

export default App;

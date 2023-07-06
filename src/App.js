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
import { DataProvider } from './context/DataContext';
 

function App() {
  return (
    <div className="App">  
      <DataProvider> 
        <Header title= "React JS Blog"/>
        <Nav/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/post" element={<NewPost/>} />
          <Route path="/post/:id" element={<PostPage/>} />
          <Route path="/about" element={<About />} />
          <Route path= "/edit/:id" element= {<EditPost />}/>
          <Route path="*" element={<Missing />} />
        </Routes>
      </DataProvider>
      <Footer />
      </div>
  );
}

export default App;

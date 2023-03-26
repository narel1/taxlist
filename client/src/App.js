import React from 'react'
import Header from './Header';
import Nav from './Nav';
import Home from './Home';
import NewPost from './NewPost';
import Missing from './Missing';
import { BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import api from './api/posts';
import axios from 'axios';

function App() {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [periodtype,setperiodtype]=useState('monthly');
  const navigate=useNavigate()
  useEffect(() => {
    const fetchPosts = async () => {
      const URI='http://localhost:3300/'
      try {
        const response = await axios.get(URI);
        const temp=[]
        response.data.forEach((rep) => {
          temp.push(rep.name)
        });
        setPosts(response.data)
        setSearchResults(response.data)
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    }
     fetchPosts();
  }, [])

  useEffect(() => {
    const filteredResults = posts.filter((post) =>
      ((post.name).toLowerCase()).includes(search.toLowerCase())
      || ((post.description).toLowerCase()).includes(search.toLowerCase()));

    //setSearchResults(filteredResults.reverse());
    setSearchResults(filteredResults)
  }, [search,posts])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp').toString();
    const newPost = { id,name: postTitle, description:postBody, period:datetime, periodtype};
    try {
      const response = await api.post('/post', newPost);
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostTitle('');
      setPostBody('');
      setSearch('')
      navigate('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  return (
    <div className="App">
      <Header title="Task List" />
       <Nav search={search} setSearch={setSearch} />
    <Routes>
        <Route exact path="/" element={<Home posts={searchResults} />}/>
        <Route exact path="/post" element={<NewPost
            handleSubmit={handleSubmit}
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
            periodtype={periodtype}
            setperiodtype={setperiodtype}
          />}/>
        <Route path="*" component={Missing} /> 
        </Routes>
    </div>
  );
}

export default App;

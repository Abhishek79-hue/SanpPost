import { useState, useEffect } from 'react';
import ProfileHeader from './Components/ProfileHeader';
import AddPost from './Components/AddPost';
import {SnappostProvider } from './Context/SnappostContext';
import axios from 'axios';

function App() {
  const [posts, setPosts] = useState([]);
  const [start, setStart] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); 

  const getData = async () => {
    if (loading || !hasMore) return; 
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:1200/api/get/post?&orderBy=-1$&limit=5&start=${start}`);
      if (res.data.posts.length === 0) {
        setHasMore(false); 
      } else {
        setPosts((prev) => [...prev,...res.data.posts]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [start]);

  useEffect(() => {
    const handleScroll = (e) => {
      const scrollHeight = e.target.documentElement.scrollHeight;
      const currentHeight = e.target.documentElement.scrollTop + window.innerHeight;
      if (currentHeight + 1 > scrollHeight) {
        setStart((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  const addPost = () => {
    getData()
  };

  const updatePost=(id,post) => {
    setPosts((prev) => prev.map((prevPost) => (prevPost.id === id ? post : prevPost)));
    getData()
  }

  const deletePost = (_id) => {
    setPosts((prev) => prev.filter((post) => post._id !== _id));
  };

  return (
    <SnappostProvider value={{posts,updatePost,addPost,deletePost}}>
      <ProfileHeader />
      <AddPost />
    </SnappostProvider>
  );
}

export default App;

import React, { useState} from 'react';
import image from '../Images/Profile.jpeg';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './AddPost.css';
import axios from 'axios';
import {useSnappost } from '../Context/SnappostContext';


function AddPost() {
  const [post, setPost] = useState("");
  const [background, setBackground] = useState("");
  const [initialBackground, setInitialBackground] = useState("");
  const [editPostId, setEditPostId] = useState(null);
  const[search,setsearch]=useState([])
  const[date,setdate]=useState("")

   const {posts,updatePost,addPost, deletePost} = useSnappost();
   
   
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("background", background);
    
    try {
      const response = await axios.post('http://localhost:1200/api/uplaod/image', fd, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
      await axios.post("http://localhost:1200/api/post", {post:post,background:response.data.filename });
      setPost("")
      setInitialBackground("")
      setBackground("")
      getData()
    } catch (error) {
      console.log("error", error);
    }};

    const getData=()=>{
      let res=axios.get(`http://localhost:1200/api/get/post?&orderBy=-1$&limit=5&start=0`)
    }
  const handleEdit = async (post) => {
    try {
      let response = await axios.get(`http://localhost:1200/api/post/${post._id}`);
      setPost(response.data.post)
      setEditPostId(response.data._id)
      setInitialBackground(response.data.background)
    } catch (error) {
      console.log("error", error)
    }
  };
  const handleUpdate=async (e) => {
    e.preventDefault(); 
    const fd = new FormData()
    if (background) {
      fd.append("background", background)
      try {
        let response = await axios.post("http://localhost:1200/api/uplaod/image", fd,{
          headers: {
              'Content-Type': 'multipart/form-data',
          },
      })
        await axios.put("http://localhost:1200/api/post/update", {id:editPostId,post:post,background:response.data.filename},{new:true})
        updatePost({post:post,background:response.data.filename})
        setInitialBackground("")
        setPost("")
        setEditPostId(null)
        setBackground("")
      } catch (error) {
        console.log("error")
      }
    } else {
      try {
        await axios.put(`http://localhost:1200/api/post/update`,{id:editPostId,post:post,background:initialBackground },{new:true})
        updatePost({id:editPostId,post:post,background:initialBackground})
        setInitialBackground("")
        setPost("")
        setEditPostId(null)
        setBackground("")
      } catch (error) {
        console.log("error")
      }
    }
  };
  const handleDelete = async (post) => {
    try {
   await axios.delete(`http://localhost:1200/api/post/delete/${post._id}`);
      deletePost(post._id);
    } catch (error) {
      console.log("error", error);
    }
  }
  const handleFilter=async()=>{
    try {
      let res=await axios.get(`http://localhost:1200/api/get/post?date=${date}`)
      setsearch(res.data.posts)
    } catch (error) {
      console.log("error")
    }
  }
const handleClear=()=>{
  setInitialBackground("")
  setPost("")
  setEditPostId(null)
  setBackground("")
  setsearch("")
  setdate("")
}
  return (
    <div>
     <div className='container'>
  <div className="post-header">
    <img src={image} alt="Profile" className="profile-pic" />
    <button type="button" data-toggle="modal" data-target="#myModal" className="btn btn-default navbar-btn">
      <span>What's on your mind?</span>
    </button>
  </div>

  <div className='modal-container'>
    <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{!editPostId ? "Create Post" : "Edit Post"}</h5>
            <button type="button" id="myModalClose" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" onClick={handleClear}>&times;</span>
            </button>
          </div>

          <div className="modal-body">
          <div className="post-body">
                    <img src={image} alt="Profile" className="profile-pic" />
                    <img src={!background ?`http://localhost:1200/upload/${initialBackground}`:
                    
                     URL.createObjectURL(background)} className="post-image" alt="Post" />
                  </div>

              <input
                type="text"
                className='text-area'
                placeholder='Whats on your mind'
                value={post}
                onChange={(e) => setPost(e.target.value)}
              />
            
            <div className="button_section">
              <div className="button_group">
                {!background && (
                  <label htmlFor="input1" className="upload-label">
                    Upload &nbsp; <i className="fa fa-upload"></i>
                  </label>
                )}
                <input
                  type="file"
                  id="input1"
                  style={{ display: 'none' }}
                  onChange={(e) => setBackground(e.target.files[0])}
                />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            {!editPostId ? (
              <button type="button" className="btn btn-primary" data-dismiss="modal" aria-label="Close" onClick={handleSubmit}>Post</button>
            ) : (
              <button type="button" className="btn btn-primary" data-dismiss="modal" aria-label="Close" onClick={handleUpdate}>Save & Change</button>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    
      <div className='container'>
        <div className='post-header'>
          <h3>Post</h3>

          <button type="button" className="filterbtn" data-toggle="modal" data-target="#myModal1">
    Filter
  </button>
  <div className="modal fade" id="myModal1">
    <div className="modal-dialog">
      <div className="modal-content">
    
        <div className="modal-header">
       
          <h4 className="modal-title">Select Date</h4>
          <button type="button" className="close" data-dismiss="modal" onClick={handleClear}>&times;</button>
          </div>
    
        <div className="modal-body">
        <p>Select date and get particular date post</p>
        <DatePicker selected={date} onChange={(date)=>setdate(date)}/>
        </div>
      
        <div className="modal-footer">
          <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={handleFilter}>Search</button>
        </div>
        
      </div>
    </div>
  </div>
  
</div>
      </div>
      
      {date?(
        search.map((item) => (
        <div className='post-wrapper'>
          <div className='post'>
            <div className='post-header'>
              <img src={image} className='profile-image' alt="Profile" />
              <span className='profile-name'>John Doe</span>
              <div className="dropdown">
                <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown">
                  ...
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item" href="#" data-toggle="modal" data-target="#myModal" onClick={() => handleEdit(item)}>Edit</a>
                  <a className="dropdown-item" href="#" onClick={() =>handleDelete(item)}>Delete</a>
                </div>
              </div>
            </div>
            <div className='post-body'>
              <div className='post-image-container'>
                <div className='post-text'>{item.post}</div>
                <img src={`http://localhost:1200/upload/${item.background}`} className='post-image' alt="Post" />
              </div>
            </div>
          </div>
        </div>
      ))
    ):(posts.map((post) => (
        <div className='post-wrapper'>
          <div className='post'>
            <div className='post-header'>
              <img src={image} className='profile-image' alt="Profile"/>
              <span className='profile-name'>John Doe</span>
              <div className="dropdown">
                <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown">
                  ...
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item" href="#" data-toggle="modal" data-target="#myModal" onClick={() => handleEdit(post)}>Edit</a>
                  <a className="dropdown-item" href="#" onClick={() =>handleDelete(post)}>Delete</a>
                </div>
              </div>
            </div>
            <div className='post-body'>
              <div className='post-image-container'>
                <div className='post-text'>{post.post}</div>
                <img src={`http://localhost:1200/upload/${post.background}`} className='post-image' alt="Post" />
              </div>
            </div>
          </div>
        </div>
      )))
    }
    </div>
  );
}
export default AddPost;

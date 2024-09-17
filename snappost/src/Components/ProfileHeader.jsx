import React from 'react'
import CoverImage from "../Images/Cover-Image.jpeg"
import image from "../Images/Profile.jpeg"
import "./ProfileHeader.css"
function ProfileHeader() {
  return (
    <div className='header-container'>
     <img src={CoverImage} alt='Cover Images'className='cover-pic'/>
     <img src={image} alt='profile-pic' className='Profile-pic'/>
     <h3 className='user-name'>John Doe</h3>
     <a href='#' className='timeline'>TimeLine</a>
    </div>
  )
}

export default ProfileHeader
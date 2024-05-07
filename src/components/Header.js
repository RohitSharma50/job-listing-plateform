import React from 'react'
import jobs_images from "../assets/jobs_images.jpeg"
export const Header = () => {
  return (
    <div className='Header' >

<a href="/"><img className="logo" src={jobs_images} alt="jobs-for-you logo" /></a>


    </div>
  )
} 
export default Header;

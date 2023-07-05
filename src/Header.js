import React from 'react';
import { Link } from 'react-router-dom';
import {FaTabletAlt , FaMobileAlt, FaLaptop } from 'react-icons/fa';

const Header = ({ title, width }) => {
  return (
    <h2 className='Header'>
      <h1 style={{textDecoration: "none"}}><Link to ='/'>{title}</Link></h1>
      {width < 785 ? < FaMobileAlt/> : width < 990 ? < FaTabletAlt/> : <FaLaptop/> }
    </h2>
  )
}

export default Header;
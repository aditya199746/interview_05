import React, { useState } from 'react';
import styled from 'styled-components';
import Continent from './Continent';
import Country from './Country';

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  li {
    padding: 18px 10px;
  }
  
    flex-flow: column nowrap;
    background-color: #0D2538;
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
    top: 0;
    left: 0;
    height: 100vh;
    width: 100px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    li {
      color: #fff;
    }
    `;





const RightNav = ({ open }) => {
    const [visible,setVisible]=useState(true)
  return (
      <>
      {visible ? <Country /> : <Continent />}
    <Ul open={open}>
      <li onClick={()=>setVisible(true)} >Country Wise</li>
      <li  onClick={()=>setVisible(false)}>Continent Wise</li>
     
    </Ul>
    </>
  )
}

export default RightNav


























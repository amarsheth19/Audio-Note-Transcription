import React, { Component } from 'react';

function ProfileButton(user) {
  
    const mystyle ={
      color: "inherit",
      height: "100%",
      display: "flex",
      alignItems: "center",
      padding: ".25rem"    
    };
    
    return <a style = {mystyle}> {user.firstName}  {user.lastName}</a>;

   
  }
  export default ProfileButton;
  
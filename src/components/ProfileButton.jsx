import React, { Component } from 'react';
import { useNavigation } from '@react-navigation/native';

function ProfileButton(user) {
  
    const mystyle ={
      color: "inherit",
      height: "100%",
      display: "flex",
      alignItems: "center",
      padding: ".25rem"    
    };
    const navigation = useNavigation();

    const changeText = () =>{
      
    }

    function handleSignIn(){
      console.log("in handleSign in profile");
      navigation.navigate('SignUp');
  }
    
    return <a style = {mystyle}  onClick={handleSignIn}> {user.username}</a>;

   
  }
  export default ProfileButton;
  
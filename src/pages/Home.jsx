import React, { Component } from 'react';
import ProfileButton from '../components/ProfileButton';
import {StyleSheet} from 'react-native';
import ScrollBox from '../components/ScrollBox';
function Home(){
    const mystyle = StyleSheet.create({
        div:{
            backgroundColor: 'lightblue',
            textAlign: 'center',
            height: '1000px'
        }
    });
    return( 
    <div style={mystyle.div}>
      <h1>Hello Welcome To Our Note Taking App</h1>
     
    </div>
    );
}
export default Home;
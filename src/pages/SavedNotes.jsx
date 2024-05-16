import React, { Component } from 'react';
import ProfileButton from '../components/ProfileButton';
import {StyleSheet} from 'react-native';
function SavedNotes(){
    const mystyle = StyleSheet.create({
        div:{
            backgroundColor: 'lightblue',
            textAlign: 'center',
            height: '1000px'
        }
    });
    return( 
    <div style={mystyle.div}>
      <h1>Saved Notes</h1>
    </div>
    );
}
export default SavedNotes;
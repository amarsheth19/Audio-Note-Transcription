import React, { Component } from 'react';
import ProfileButton from "./components/ProfileButton";
import ScrollBox from './components/ScrollBox';
import {StyleSheet} from 'react-native';
import Navbar from './components/NavBar';
import Home from './pages/Home';
import Settings from './pages/Settings'
import SavedNotes from './pages/SavedNotes';

function NewApp(){
    const mystyle = StyleSheet.create({
        div:{
            backgroundColor: 'lightblue',
            textAlign: 'center',
            height: '1000px'
        }
    });
    let component
    switch(window.location.pathname){
        case "/":
            component = <Home/>
            break
         case "/SavedNote":
             component = <SavedNotes/>
            break
         case "/Settings":
            component = <Settings/>
            break
    }
    return(
    <>
     <Navbar/>
     <div>
        {component}
     </div>
    </>
    
    
    );

}
export default NewApp;
import React from "react";
import "./NavBar.css"
import {StyleSheet} from 'react-native';
import ProfileButton from "./ProfileButton";
import { useNavigation, useRoute } from '@react-navigation/native';
const Navbar = (id) => {
    const mystyle = StyleSheet.create({
        nav:{
            backgroundColor: '#C8A2C8',
            color: "white",
            //height: "85px",
            display: "flex",
            justifyContent: "space-between",
            gap: "2rem",
            padding: "0.2rem calc((100vw - 1000px) / 2)",
            boxSizing: "border-box"
        },
        navlink:{
            color: "#808080",
            display: "flex",
            alignItems: 'center',
            padding: '0 1rem',
            height: '100%',
            cursor: 'pointer',
            boxSizing: "border-box"
        },
        bars:{
            display: 'none',
            color: '#808080',
            display: 'block',
            position: 'absolute',
            transform: 'translate(-100%, 75%)',
            fontSize: '1.8rem',
            cursor: 'pointer',
            boxSizing: "border-box"
        },
        navA:{
            color: "inherit",
            height: "100%",
            display: "flex",
            alignItems: "center",
            padding: ".25rem"    
        },
        navList:{
            padding: "0",
            margin: "0",
            listStyle: "none",
            display: "flex",
            gap: "2rem"
        },
        navListElement:{
          
        }
        
    });
    var userId = id;
    const navigation = useNavigation();
    const route = useRoute();

    function handleSavedNotes(){
        console.log("handling daved notes");
        console.log("user params: " + route.params);
        if(route.params!=null){
            userId  = route.params;
            console.log("handling daved notes id: " + userId);
            navigation.navigate('SavedNotes', { userId: userId });
        }
        else{
            console.log("error in handling saved notes");
        }

    }
    
    return (
       <nav className="nav" style={mystyle.nav}>
            <a href="/" className="siteTital"style={mystyle.navA}>Note Taking App</a>
            <ul style={mystyle.navList} className = "nav ul">
                <li style={mystyle.navList}>
                    <a href= "/" style={mystyle.navA}>Home</a>
                </li>
                <li style={mystyle.navListElement}>
                    <a style={mystyle.navA} onClick = {handleSavedNotes}>Saved Notes</a>  
                 </li>
                 <li>
                    <a href="/Settings" style={mystyle.navA}>Settings</a>
                </li>
                <li>
                   <ProfileButton username = "tempusername" mystyle = {mystyle.navA}></ProfileButton>
                </li>
            </ul>
       </nav>
    );
};

export default Navbar;
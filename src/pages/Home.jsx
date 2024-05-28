import React, { Component, useState, useEffect } from 'react';
import ProfileButton from '../components/ProfileButton';
import {StyleSheet} from 'react-native';
import ScrollBox from '../components/ScrollBox';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
function Home(){
    const [file, setFile] = useState(null);
    const [msg, setMsg] = useState(null);
    const [summary, setSummary] = useState(null);
    const [progress, setProgress] =useState({started: false, pc: 0});
    var temp = "";
    const navigation = useNavigation();
    const route = useRoute();
    var userId = "";
    const mystyle = StyleSheet.create({
        div:{
            backgroundColor: 'lightblue',
            textAlign: 'center',
            height: '1000px'
        }
    });
    function handleUpload(){
        if(!file){
          setMsg("No file selected");
          return;
        }
        
        if(route.params!=null){
          userId  = route.params;
          console.log("userId " + userId);
          const fd = new FormData();
          fd.append('file', file);
          fd.append('id_token', userId);
          
          setMsg("Uploading...");
          setProgress(prevState => {
            return {...prevState, started:true}
          })
        
          //sending to flask backend
          axios.post('/upload', fd, {
            onUploadProgress: (ProgressEvent) => { setProgress(prevState => {
              return {...prevState, pc: ProgressEvent.progress*100}
            })},
          })
          .then(res => {
            setMsg("Upload Successful");
            console.log("Data: " + res.data);
            setSummary("Summary: "  + res.data);
          })
          .catch(err => {
            setMsg("Upload Unsuccessful");
            console.error(err);
          });
      }

      else{
        setSummary("You must sign in first")
      }
      
      
      }
    return( 
    <div style={mystyle.div}>
      <h1>Hello Welcome To Our Note Taking App</h1>
      <h3>Uploading Audio File Below</h3>
      <input onChange={(e) => setFile(e.target.files[0])} type="file"/>
      <button onClick={handleUpload}>Upload</button>
      <p></p>
      {msg && <span>{msg}</span>}
      <p></p>
      {progress.started && <progress max = "100" value = {progress.pc}></progress>}
      <p></p>
      Summary: {summary}
      <p></p>
      userid: {userId}
    </div>
    );
}
export default Home;
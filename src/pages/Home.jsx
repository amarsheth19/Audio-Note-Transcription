import React, { Component, useState, useEffect } from 'react';
import ProfileButton from '../components/ProfileButton';
import {StyleSheet} from 'react-native';
import ScrollBox from '../components/ScrollBox';
import axios from 'axios';
function Home(){
    const [file, setFile] = useState(null);
    const [msg, setMsg] = useState(null);
    const [summary, setSummary] = useState(null);
    const [progress, setProgress] =useState({started: false, pc: 0});
    var temp = "";
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
      
        const fd = new FormData();
        fd.append('file', file);
        fd.append('id_token', 'token');
        
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
          setSummary(res.data);
        })
        .catch(err => {
          setMsg("Upload Unsuccessful");
          console.error(err);
        });
      
      
      
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
    </div>
    );
}
export default Home;
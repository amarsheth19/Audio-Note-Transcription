import React, { useState, useEffect } from 'react';
import ProfileButton from "./components/ProfileButton";
import ScrollBox from './components/ScrollBox';

function App() {
  const [data, setData] = useState([{}]);
  var output;


console.log("here1")

  /**useEffect(() => {

    fetch('/members').then(
      res => res.json()
    ).then(data => {console.log(data)})
  });*/

  return(
    <div>
      <ProfileButton firstName = "Shreyas" lastName = "Yellenki"></ProfileButton>
      
    </div>
  )
}

export default App



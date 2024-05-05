import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([{}]);
  var output;


console.log("here1")

  useEffect(() => {

    fetch('/members').then(
      res => res.json()
    ).then(data => {console.log(data)})
  });

  return(
    <div>

      {/** {(typeof data.members === 'undefined') ? (
        <p>Undefined...</p>
      ) : (
        data.members.map((member, i) => (
          <p key={i}>{member}</p>
        ))
      )} */}

      output


    </div>
  )
}

export default App



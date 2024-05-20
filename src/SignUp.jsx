import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
function SignUp(){
    const mystyle = StyleSheet.create({
        body:{
            backgroundColor: 'lightblue'
        },
        container:{
            display: 'flex',
            flexDirection: 'column',
            margin: 'auto',
            marginTop: '200px',
            background: '#fff',
            paddingBottomg: '30px',
            
        },
        header:{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2rem',
            width: '100%',
            marginTop: '30px'
        },
        title:{
            color: '#3c009d',
            fontSize: '48px',
            fontWeight:'700'
        },
        inputs:{
            marginTop: '50px',
            display: 'flex',
            flexDirection:'column',
            gap:'25px',
        },
        input:{
            display: 'flex',
            margin: 'auto',
            alignItems: 'center',
            width: '450px',
            height: '50px',
            backgroundColor: '#C8A2C8' 
        },
        enter:{
            height: '20px',
            width: '380px',
            backgroundColor: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#3c009d',
            fontSize: '19px'
        },
        signUpButton:{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '220px',
            height: '50px',
            color:'#fff',
            backgroundColor:'#3c009d',
            borderRadius: '50px',
            fontSize: '19px',
            fontWeight: '700',
            cursor: 'pointer'
        }
    });
    return(
       <body className='body' style={mystyle.body}>
         <div className='container' style={mystyle.container}>
            <div className='header' style={mystyle.header}>
                <div style={mystyle.title}>Sign Up</div>
            </div>
            <div className='inputs' style={mystyle.inputs} >
                <div className = 'input' style={mystyle.input}>
                    <input text = 'text' placeholder='Username' style={mystyle.enter}/>
                </div>
                <div className = 'input' style={mystyle.input}>
                    <input text = 'text' placeholder='Email' style={mystyle.enter}/>
                </div>
                <div className = 'input' style={mystyle.input}>
                    <input text = 'password' placeholder='Password' style={mystyle.enter}/>
                </div>
            </div>
            <div style = {{alignItems: 'center'}}>
                <h2 style={mystyle.signUpButton}>Sign Up</h2>
            </div>
           
        </div>
       </body>
       
        
    );
}
export default SignUp;
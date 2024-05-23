import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, collection, getDocs } from "firebase/firestore"; 

function SignUp() {
    const firebaseConfig = {
        apiKey: "AIzaSyAoHqmKxapjNj2_KI1PCwmYEpBhDzplwqI",
        authDomain: "note-taker-b550d.firebaseapp.com",
        projectId: "note-taker-b550d",
        storageBucket: "note-taker-b550d.appspot.com",
        messagingSenderId: "508381657343",
        appId: "1:508381657343:web:49f24213e68cf0693a74ca",
        measurementId: "G-ZB5LKXBKZ7"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth();
    const db = getFirestore(app);
    const [errorMsg, setErrorMsg] = useState(null);
    const [users, setUsers] = useState([]);

    const mystyle = StyleSheet.create({
        body: {
            backgroundColor: 'lightblue'
        },
        container: {
            display: 'flex',
            flexDirection: 'column',
            margin: 'auto',
            marginTop: '200px',
            background: '#fff',
            paddingBottom: '30px',
        },
        header: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2rem',
            width: '100%',
            marginTop: '30px'
        },
        title: {
            color: '#3c009d',
            fontSize: '48px',
            fontWeight: '700'
        },
        inputs: {
            marginTop: '50px',
            display: 'flex',
            flexDirection: 'column',
            gap: '25px',
        },
        input: {
            display: 'flex',
            margin: 'auto',
            alignItems: 'center',
            width: '450px',
            height: '50px',
            backgroundColor: '#C8A2C8'
        },
        enter: {
            height: '20px',
            width: '380px',
            backgroundColor: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#3c009d',
            fontSize: '19px'
        },
        signUpButton: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '220px',
            height: '50px',
            color: '#fff',
            backgroundColor: '#3c009d',
            borderRadius: '50px',
            fontSize: '19px',
            fontWeight: '700',
            cursor: 'pointer'
        },
        errorMessage: {
            color: 'red',
            textAlign: 'center',
            marginTop: '20px'
        },
        userList: {
            marginTop: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        userItem: {
            margin: '10px',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            width: '80%'
        }
    });

    function handleSignUp() {
        let username = document.getElementById("usernameinput").value;
        let password = document.getElementById("passwordinput").value;
        let email = document.getElementById("emailinput").value;
        console.log("Email:", email);
        console.log("Password:", password);
        console.log("Username:", username);

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                return setDoc(doc(db, "users", user.uid), {
                    username: username,
                    email: email
                });
            })
            .then(() => {
                console.log('User signed up and username saved successfully');
                fetchUsers(); // Fetch users after signing up
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMsg("Error: " + errorMessage);
                console.error('Error code:', errorCode);
                console.error('Error message:', errorMessage);
            });
    }

    function fetchUsers() {
        getDocs(collection(db, "users"))
            .then((querySnapshot) => {
                const usersList = querySnapshot.docs.map(doc => doc.data());
                console.log('Fetched users:', usersList); // Log fetched users
                setUsers(usersList);
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
            });
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className='body' style={mystyle.body}>
            <div className='container' style={mystyle.container}>
                <div className='header' style={mystyle.header}>
                    <div style={mystyle.title}>Sign Up</div>
                </div>
                <div className='inputs' style={mystyle.inputs}>
                    <div className='input' style={mystyle.input}>
                        <input type='text' id="usernameinput" placeholder='Username' style={mystyle.enter} />
                    </div>
                    <div className='input' style={mystyle.input}>
                        <input type='text' id="emailinput" placeholder='Email' style={mystyle.enter} />
                    </div>
                    <div className='input' style={mystyle.input}>
                        <input type='password' id="passwordinput" placeholder='Password' style={mystyle.enter} />
                    </div>
                </div>
                <div style={{ alignItems: 'center' }}>
                    <h2 style={mystyle.signUpButton} onClick={handleSignUp}>Sign Up</h2>
                    <p style={mystyle.errorMessage}>{errorMsg}</p>
                </div>
                <div className='userList' style={mystyle.userList}>
                    <h3>Users List</h3>
                    {users.map((user, index) => (
                        <div key={index} className='userItem' style={mystyle.userItem}>
                            <p>Username: {user.username}</p>
                            <p>Email: {user.email}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SignUp;

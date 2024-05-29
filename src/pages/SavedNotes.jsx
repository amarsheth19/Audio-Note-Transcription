/*import React, { Component } from 'react';
import ProfileButton from '../components/ProfileButton';
import {StyleSheet} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { db } from './firebaseConfig';
function SavedNotes(){
    const navigation = useNavigation();
    const route = useRoute();
    var userId = route.params;
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
export default SavedNotes;*/


import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

function SavedNotes() {
    const firebaseConfig = {
        apiKey: "AIzaSyAoHqmKxapjNj2_KI1PCwmYEpBhDzplwqI",
        authDomain: "note-taker-b550d.firebaseapp.com",
        projectId: "note-taker-b550d",
        storageBucket: "note-taker-b550d.appspot.com",
        messagingSenderId: "508381657343",
        appId: "1:508381657343:web:49f24213e68cf0693a74ca",
        measurementId: "G-ZB5LKXBKZ7"
    };

    // Check to prevent re-initialization of Firebase app
    firebase.initializeApp(firebaseConfig);


    const db = firebase.firestore();
    const navigation = useNavigation();
    const route = useRoute();
    const { userId } = route.params;
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log(`Fetching data for user ID: ${userId}`);
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                console.log(`Fetching data for user ID: ${userId}`);
                const docRef = db.collection("users").doc(userId);
                const doc = await docRef.get();
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                    const { username, email, ...filteredData } = doc.data();
                    console.log("filtered:", filteredData);
                    setUserData(filteredData);
                } else {
                    console.log("No such document!");
                    setUserData(null);
                }
            } catch (error) {
                console.error("Error fetching document: ", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    const mystyle = StyleSheet.create({
        container: {
            backgroundColor: 'lightblue',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
        },
        scrollView: {
            width: '100%',
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 20,
            textAlign: 'center',
        },
        content: {
            fontSize: 18,
            marginVertical: 10,
            textAlign: 'center',
        },
        error: {
            color: 'red',
            fontSize: 18,
            textAlign: 'center',
        },
        dataItem: {
            backgroundColor: 'white',
            padding: 10,
            marginVertical: 5,
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            width: '100%',
        }
    });

    return (
        <View style={mystyle.container}>
            <Text style={mystyle.title}>Saved Notes</Text>
            {loading ? (
                <Text style={mystyle.content}>Loading...</Text>
            ) : error ? (
                <Text style={mystyle.error}>Error: {error.message}</Text>
            ) : userData ? (
                <ScrollView style={mystyle.scrollView}>
                    {Object.entries(userData).map(([key, value]) => (
                        <View key={key} style={mystyle.dataItem}>
                            <Text style={mystyle.content}>
                                {key}: {typeof value === 'object' ? JSON.stringify(value) : value}
                            </Text>
                        </View>
                    ))}
                </ScrollView>
            ) : (
                <Text style={mystyle.content}>No user data found</Text>
            )}
        </View>
    );
}

export default SavedNotes;

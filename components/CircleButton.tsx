//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import styles from '../assets/styles';
// create a component
const CircleButton = (props: any) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={[styles.button, props.size == "big" ? styles.big : styles.small]}>
            <Text style={styles.buttonText}>{props.text}</Text>
        </TouchableOpacity>
    );
};



//make this component available to the app
export default CircleButton;

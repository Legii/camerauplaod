//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import styles from '../assets/styles';
// create a component
const TextButton = (props: any) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={[styles.button]}>
            <Text style={styles.buttonTextSmall}>{props.text}</Text>
        </TouchableOpacity>
    );
};



//make this component available to the app
export default TextButton;

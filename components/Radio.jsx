//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// create a component
const Radio = ({label,handlePress,selected,ind}) => {
    return (
        <TouchableOpacity style={{display:"flex", flexDirection:"row"}} onPress={handlePress}>
            <Text style={{fontSize:20}}>{label==selected?"⚫":"🔴"}</Text>
            <Text style={{color:"white"}}>{label}</Text>
        </TouchableOpacity>
    );
};



//make this component available to the app
export default Radio;

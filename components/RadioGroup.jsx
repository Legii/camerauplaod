//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Radio from './Radio';
// create a component
const RadioGroup = ({name,options,change}) => {
        const [selected,setSelected] = useState(Object.keys(options)[0])
        
    const handlePress = (n) => {
        setSelected(n)
        change(name,n)
    }

    return (
        <View>
            <Text style={{color:"white"}}>{name}</Text>
           {
               Object.keys(options).map((e,i) => <Radio key={i} handlePress={()=> handlePress(e)} ind={i} label={e}selected={selected}></Radio>)
            }
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default RadioGroup;

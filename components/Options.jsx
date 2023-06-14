//import liraries
import React, { Component,useEffect, useState} from 'react';
import { View, Text, StyleSheet,Animated,Button, ScrollView } from 'react-native';
import RadioGroup from './RadioGroup';



const Options = (props) => {
   useEffect(()=> {
     
   },[])
   
    return (
      
       <View style={{ flex: 4}}>

        <Animated.View
            style={[
                styles.animatedView,
                {
                    transform: [
                        { translateX: props.pos }
                    ]
                }]} >
                    <ScrollView>
                        {
                            Object.keys(props.options).map((e,ind) => {if(e!="VideoCodec" &&e !="VideoStabilization")return<RadioGroup change={props.changeOption} key={ind} name={e} options={props.options[e]}></RadioGroup>})
                        }

                    </ScrollView>

        </Animated.View>
          

    </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    animatedView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
        width:"50%"
    },
});

//make this component available to the app
export default Options;

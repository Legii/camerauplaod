//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'react-native';
import styles from '../assets/styles';
import TextButton from './TextButton';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from "expo-media-library"
import { Dimensions } from 'react-native';
import { upload } from './Upload';
// create a component
const BigPhoto = (props: any) => {
    const params = props.route.params
    const img = params.img
    const { width, height } = img

    const screenWidth = Dimensions.get("window").width
    // const size = width / height * screenWidth
    return (
        <View style={[styles.container, { backgroundColor: "#222233" }]}>


            <View style={{ flex: 6 }}>
                <View style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <Image
                        style={{
                            width: screenWidth / 2,
                            height: height / width * screenWidth / 2,
                            resizeMode: 'stretch',
                        }}
                        source={{ uri: params.img.uri }}
                    />
                </View>
                <Text style={styles.text}>{img.width}x{img.height}</Text>
            </View>

            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-around", alignItems: 'center' }}>
                <TextButton text="SHARE" onPress={async () => {
                    if (await Sharing.isAvailableAsync()) {
                        await Sharing.shareAsync(params.img.uri)
                    } else {
                        alert("Sharing not avaliable")
                    }
                }} />

                <TextButton text="DELETE" onPress={async () => {

                    if (await MediaLibrary.deleteAssetsAsync(img.id))
                        props.navigation.navigate("gallery", { "back": true })
                }
                } />

                <TextButton text="Upload" onPress={async () => {

                    upload(params.img.uri)
                }
                } />

            </View>



        </View>



        /*

        <View style={[styles.container, styles.dark]}>
            <TextButton text="share"></TextButton>
           
        </View>*/

    );
};

// define your styles

//make this component available to the app
export default BigPhoto;

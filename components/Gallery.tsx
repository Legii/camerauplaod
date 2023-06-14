import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as MediaLibrary from "expo-media-library"
import styles from '../assets/styles'
import FlatList from './FlatList'
import { Link } from '@react-navigation/native';
import { Dimensions } from "react-native";
import TextButton from './TextButton'
import { main_color_transparent } from '../assets/styles'
import { useFocusEffect } from 'expo-router'
import { uploadMultiple } from './Upload'
const Gallery = (props: any) => {


    const [permissions, setPermissions] = useState(false)
    const [imagedata, setImageData] = useState<any[]>([]);
    const [layout, setLayout] = useState("grid")
    const [selected, setSelected] = useState<any[]>([]);
    const [error, setError] = useState(false)


    const selectHandler = (url: any) => {

        if (!selected.includes(url))
            setSelected([...selected, url])
        else {
            let data = [...selected]
            data.splice(data.indexOf(url), 1)
            setSelected(data)
        }

    }
    const getImages = async () => {
        try {
            const album = await MediaLibrary.getAlbumAsync("DCIM")
            let photos = await MediaLibrary.getAssetsAsync({
                album: album,
                first: 20,
                mediaType: 'photo',
            })


            setImageData(photos.assets);
        }
        catch {
            setError(true)
        }
    }

    const refresh = () => {
        getImages()
    }



    const getSize = () => {
        const width = Dimensions.get("window").width
        const height = Dimensions.get("window").height
        if (layout == "grid")
            if (width > height)
                return height / 4
            else return width / 4
        else
            return width;
    }

    useFocusEffect(() => {
        refresh()
    })

    useEffect(() => {
        async function start() {
            let { status } = await MediaLibrary.requestPermissionsAsync();
            if (status !== 'granted') {
                alert('brak uprawnień do czytania image-ów z galerii')
            }
            else {
                setPermissions(true);
                await getImages();

            }
        }

        start()
    }, [])
    if (!error)
        if (imagedata.length > 0)
            return (
                <View style={[styles.container, { backgroundColor: "#222233" }]}>

                    {permissions
                        ? <View>
                            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-around", alignItems: 'center' }}>
                                <TextButton text="LAYOUT" onPress={() => layout == "grid" ? setLayout("list") : setLayout("grid")} />
                                <TextButton text="CAMERA" onPress={() => props.navigation.navigate("cameraScreen")} />
                                <TextButton text="DELETE" onPress={async () => {

                                    if (await MediaLibrary.deleteAssetsAsync(selected))
                                        setSelected([])
                                    await getImages()

                                }
                                } />
                                <TextButton text="UPLOAD" onPress={() => { uploadMultiple(selected) }} />

                            </View>
                            <View style={{ flex: 6 }}>
                                <View>
                                    <FlatList nav={props.navigation} selected={selected} selectHandler={selectHandler} size={getSize()} layout={layout} images={imagedata}></FlatList>
                                </View>

                            </View>
                        </View>
                        : <View style={styles.container}>
                            <Text style={styles.text}>No Permissions</Text>
                        </View>
                    }
                    {selected.length > 0 &&
                        <View style={{ position: "absolute", "bottom": 0, width: "100%", backgroundColor: main_color_transparent }}>
                            <Text style={styles.text}>selected: {selected.length}</Text>
                        </View>
                    }
                </View>




            )
        else return <View style={[styles.container, styles.mainColor]}>
            <Text style={[styles.text, styles.title]}>Loading...</Text>
            <ActivityIndicator size="large" color="white" />
        </View>
    else return <Text>Error</Text>
}

export default Gallery
//    //  <!--   -->
/*    <View style={styles.container}>
                    {permissions
                        ? <View>
                            <FlatList images={imagedata}></FlatList>
                        </View>
                        : <Text>No Permissions</Text>
                    }
                </View>*/
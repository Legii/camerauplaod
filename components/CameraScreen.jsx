//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet ,Animated} from 'react-native';
import { Camera, CameraType, FlashMode } from "expo-camera";
import CircleButton from './CircleButton'
import * as MediaLibrary from "expo-media-library"
import { BackHandler } from "react-native"
import {Dimensions} from "react-native"
import Options from './Options';
import { main_color } from '../assets/styles';
// create a component
class CameraScreen extends Component { 
    
    
    constructor(props) {

        super(props);

        this.state = {
            hasCameraPermission: null,         // przydzielone uprawnienia do używania kamery
            type: CameraType.back, 
            options:{},
            pos: new Animated.Value(-500),
            isHidden:true,
            x:{},
            height:300,
            width:Dimensions.get("window").width,
           maxHeight:Dimensions.get("window").height -200
            // typ kamery
        };
     
    }





    toggle() {

        if (this.state.isHidden) toPos = 0; else toPos = -500

        //animacja

        Animated.spring(
            this.state.pos,
            {
                toValue: toPos,
                velocity: 1,
                tension: 0,
                friction: 10,
                useNativeDriver:true
            }
        ).start();

        this.setState({"isHidden":!this.state.isHidden});
    }
    


    componentDidMount(){
        this.handleClick = this.changeOption.bind(this);
        const run = async () => {
            let { status } = await Camera.requestCameraPermissionsAsync();
            this.setState({ hasCameraPermission: status == 'granted' });
        }
        run();
    }

    async changeOption(name, option) {
      
        let obj = Object.assign(this.state.x)
        obj[name] = option
  
        const ratio = obj["Ratio"]
        ///////Błąd !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        const sizes =await this.camera.getAvailablePictureSizesAsync(ratio)
      
       const x =  ratio.split(":")
    
  
      let w = Dimensions.get("window").width
      let h = Math.floor(Dimensions.get("window").width* (parseInt(x[0])/parseInt(x[1])))
      if(h >this.state.maxHeight) {
        h = this.state.maxHeight
        w = Math.floor(this.state.maxHeight*(parseInt(x[1])/parseInt(x[0])))
      }
      this.state.height =h
      this.state.width=w
        //console.log(wx)
        obj["Size"]=sizes[0];
        console.log(obj['Size'])
        this.state.options["Sizes"] = {}
        sizes.forEach(e => this.state.options["Sizes"][e] =e )
        this.setState({x: obj})

    }


   
    render() {
        const { hasCameraPermission } = this.state; // podstawienie zmiennej ze state
        if (hasCameraPermission == null) {
            return <View />;
        } else if (hasCameraPermission == false) {
            return <Text>brak dostępu do kamery</Text>;
        } else {
            return (<View style={{ flex: 1 }}>

                <View style={{ height:this.state.height, display:"flex", flexDirection:"column", alignItems:"center",justifyContent:"center", backgroundColor:"black"}}>
          
                    <Camera
                        ref={ref => {
                            this.camera = ref; // Uwaga: referencja do kamery używana później
                        }}
                        onCameraReady={async () => {
                            const ratios = await this.camera.getSupportedRatiosAsync()
                            const sizes = await this.camera.getAvailablePictureSizesAsync("2:1")
                            
                            let options = Camera.Constants
                            options["Ratio"] = {}
                            ratios.forEach(e => options["Ratio"][e] =e )
                   
                            options["Sizes"] = {}
                            sizes.forEach(e => options["Sizes"][e] =e )
                            this.setState({options:options})
                            const obj = {}
                           Object.keys(options).forEach(k => {
                           
                            if(typeof options[k] == "object" && k != "Type" && k!="VideoQuality")
                            obj[k] = Object.keys(options[k])[0]
                           })
                           console.log(obj)
                           this.setState({x:obj})

                            const ratio = obj["Ratio"]   
                            console.log(ratio)
                            const x =  ratio.split(":")
                            console.log(x)
                        
                            let w = Dimensions.get("window").width
                            let h = Math.floor(Dimensions.get("window").width* (parseInt(x[0])/parseInt(x[1])))//</View>* (parseInt(x[0])/parseInt(x[1])))
                            console.log(w,h)
                            console.log(this.state.maxHeight+ "A")
                            if(h >this.state.maxHeight) {
                            h = this.state.maxHeight
                            w = Math.floor(this.state.maxHeight*(parseInt(x[1])/parseInt(x[0])))
                            }
                            console.log(w, h)
                            this.state.height =h
                            this.state.width=w
                           //this.setState({x:"ala ma kija"})
                       }}
                        style={{ flex: 1, height:this.state.height, width:this.state.width}}
                        type={this.state.type}
                        flashMode={this.state.x["FlashMode"]}
                        autoFocus={this.state.x["AutoFocus"]}
                        whiteBalance={this.state.x["WhiteBalance"]}
                        ratio={this.state.x["Ratio"] ? this.state.x["Ratio"]:"2:1"}
                        pictureSize={this.state.x["Size"]}
                     
                           
                    
                        
                 
                            
                        
                        >
                                      {
                                           this.state.options != {} &&<Options changeOption = {this.handleClick} options={this.state.options} pos={this.state.pos}></Options>
                                           }       
                   
      
                    </Camera>
             
                       
                    </View>
                        <View style={{ alignItems:"center", justifyContent:"flex-end", backgroundColor:"black", flex:1}}>
                            <View style={{flexDirection:"row",alignItems:"center", justifyContent:"flex-end"}}>
                                 <CircleButton text="" onPress={() => {
                                if(this.state.type ==CameraType.back) 
                                    this.setState({type: CameraType.front})
                                else
                                this.setState({type: CameraType.back})
                          }}></CircleButton>
                            <CircleButton text="+" size="big" onPress={async () => {
                                if (this.camera) {
                                    let foto = await this.camera.takePictureAsync();
                                    let asset = await MediaLibrary.createAssetAsync(foto.uri);
                                 
                                }
                            }}></CircleButton>
                            <CircleButton size="small" onPress={() => {this.toggle() }}/>
                           
                          </View>
              
                </View>

            </View>
            
                
            );
        }
    }

}


//make this component available to the app
export default CameraScreen;

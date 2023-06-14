
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from "react-native"
import Gallery from './components/Gallery';
import Main from './components/Main';
import CameraScreen from './components/CameraScreen';
import BigPhoto from './components/BigPhoto';
import { StatusBar } from 'expo-status-bar';
import { main_color } from './assets/styles';
import styles from './assets/styles';
import Test from './components/Options';
const Stack = createNativeStackNavigator();
export default function App() {
  return (

    <NavigationContainer>


      <Stack.Navigator>

        <Stack.Screen name="main" component={Main} options={{ title: 'Camera App' }} />
        <Stack.Screen
          name="gallery"
          component={Gallery}
          options={{
            title: 'Galeria',
            headerStyle: styles.mainColor,
            headerTitleStyle: styles.text
          }} />
        <Stack.Screen name="cameraScreen" component={CameraScreen} options={{
          title: 'Kamera', headerStyle: styles.mainColor,
          headerTitleStyle: styles.text
        }} />
        <Stack.Screen name="bigPhoto" component={BigPhoto} options={{
          title: 'Wybrane Zdjecie', headerStyle: styles.mainColor,
          headerTitleStyle: styles.text
        }} />
      </Stack.Navigator>
    </NavigationContainer>


  );
}



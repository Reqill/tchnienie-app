import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'react-native';

import useCachedResources from './hooks/useCachedResources';
import NavigationHandler from './navigation/NavigationHandler'
import AsyncStorage from '@react-native-async-storage/async-storage';
import FirstLaunch from './screens/FirstLaunch';
import Colors from './constants/Colors'


import { useFonts, Poppins_500Medium, Poppins_600SemiBold, Poppins_400Regular, Poppins_300Light } from '@expo-google-fonts/poppins';
import { Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import { withDecay } from 'react-native-reanimated';

export default function App() {
  const isLoadingComplete = useCachedResources(); //alredy checked
  // const colorScheme = useColorScheme(); //default and checked
  // const colorScheme = "dark";

  //loading additional fonts here cuz im too stupid to understand how to load them in useCachedResources hook
  //if it doesn't work just make this variable as a function and call it with useCachedResources
  let [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Pacifico_400Regular
  });

  const date = new Date();
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  AsyncStorage.getItem('LastDayOpen').then((res) => {
    if (res === null) {
      AsyncStorage.setItem('LastDayOpen', String(dayOfYear - 1))
    } else if (Number(res) !== dayOfYear) {
      AsyncStorage.setItem('LastDayOpen', String(dayOfYear - 1))
    }

  })



  if (!isLoadingComplete && !fontsLoaded) {
    return null;
  } else {
    return (
      <StartingComponent />
      // <SafeAreaProvider>
      //   {/* <Navigation colorScheme={colorScheme} /> */}
      //   <NavigationHandler />
      //   <StatusBar />
      // </SafeAreaProvider>
    );
  }
}
class StartingComponent extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { firstLaunch: null };
  }
  componentDidMount() {
    AsyncStorage.getItem("alreadyLaunchedd28").then(value => {
      if (value === null) {
        AsyncStorage.setItem('alreadyLaunchedd28', String(true)); // No need to wait for `setItem` to finish, although you might want to handle errors
        this.setState({ firstLaunch: true });
      }
      else {
        // AsyncStorage.setItem('alreadyLaunched', String(true));
        this.setState({ firstLaunch: false });
      }
    }) // Add some error handling, also you can simply do this.setState({fistLaunch: value == null})
  }
  render() {
    if (this.state.firstLaunch === null) {
      return null; // This is the 'tricky' part: The query to AsyncStorage is not finished, but we have to present something to the user. Null will just render nothing, so you can also put a placeholder of some sort, but effectively the interval between the first mount and AsyncStorage retrieving your data won't be noticeable to the user.
    } else if (this.state.firstLaunch == true) {
      return (
        <SafeAreaProvider>
          <View style={{ backgroundColor: Colors.backgroundColor, width: "100%", height: "100%" }}>
            <FirstLaunch />
          </View>
          <StatusBar />
        </SafeAreaProvider>);
    } else {
      return (
        <SafeAreaProvider>
          <NavigationHandler />
          <StatusBar />
        </SafeAreaProvider>
      );
    }
  }
}
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import NavigationHandler from './navigation/NavigationHandler'
import AsyncStorage from '@react-native-async-storage/async-storage';
import FirstLaunch from './screens/FirstLaunch';


import { useFonts, Poppins_500Medium, Poppins_600SemiBold, Poppins_400Regular, Poppins_300Light } from '@expo-google-fonts/poppins';
import { Pacifico_400Regular } from '@expo-google-fonts/pacifico';

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
    AsyncStorage.getItem("alreadyLaunchedd1").then(value => {
      if (value === null) {
        AsyncStorage.setItem('alreadyLaunchedd1', String(true)); // No need to wait for `setItem` to finish, although you might want to handle errors
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
      return <FirstLaunch />
    } else {
      return (
        <SafeAreaProvider>
          {/* <Navigation colorScheme={colorScheme} /> */}
          <NavigationHandler />
          <StatusBar />
        </SafeAreaProvider>
      );
    }
  }
}
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import { useFonts, Poppins_500Medium, Poppins_600SemiBold, Poppins_400Regular, Poppins_300Light } from '@expo-google-fonts/poppins';
import { Pacifico_400Regular } from '@expo-google-fonts/pacifico';

export default function App() {
  const isLoadingComplete = useCachedResources(); //alredy checked
  // const colorScheme = useColorScheme(); //default and checked
  const colorScheme = "dark";

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
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

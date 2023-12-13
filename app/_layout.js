import { Stack } from "expo-router";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();
const Layout = () => {
    const [fontsLoaded] = useFonts({
        PoppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
        PoppinsMedium: require('../assets/fonts/Poppins-Medium.ttf'),
        PoppinsRegular: require('../assets/fonts/Poppins-Regular.ttf'),
    })

    const onLayoutRootView = useCallback(async () => {
        
            await SplashScreen.hideAsync();} )

    if (!fontsLoaded) { return null; }
    
    return <Stack onLayout = {onLayoutRootView}/>;

}


export default Layout;
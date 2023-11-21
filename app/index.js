import { useState, useEffect  } from "react";
import {ScrollView, SafeAreaView, TouchableOpacity, Button} from "react-native";
import {Stack, useRouter} from 'expo-router';
import {COLORS} from '../constants/theme';
import React from 'react';
import { View, Text } from 'react-native';
import TaskCard from '../components/TaskCard';
import WifiManager from "react-native-wifi-reborn";
import * as Location from 'expo-location'
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import Constants from "expo-constants"
import SignUpScreen from "../components/SignUpScreen";
import PatrolCard from "../components/PatrolCard";
import { StatusBar } from 'expo-status-bar';
import { useUser } from "@clerk/clerk-expo";

// wifiList = () => {
//     WifiManager.loadWifiList().then(
//         data => {
//           data.forEach(element => {
//             console.log(element.level)
//           });
//         },
//         () => {
//           console.log("Cannot get WiFi list!");
//         }
//       );
//   }
const tasks = [
    "Patrol campus perimeter regularly",
    "Monitor security cameras",
    "Check and verify identifications",
    "Respond to alarms or breaches",
    "Assist with directions and information",
    "Report safety hazards promptly",
    "Coordinate with law enforcement",
    "Inspect buildings and facilities",
    "Secure doors and windows",
    "Enforce parking regulations",
    "Provide first aid if needed",
    "Maintain visible security presence",
    "Escort individuals when requested",
    "Organize and implement security drills",
    "Participate in ongoing training",
]

const Home = () => {
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      console.log('Location permission granted', location);
    })();
  }, []);


    
    const [phoneNumber, setphoneNumber] = useState(false);
    const interval = setInterval(() => {
      if (phoneNumber) {
        WifiManager.getBSSID().then((result) => {
          const postData = {
            'phoneNumber': phoneNumber,
            'currentBSSID': result
          }
          console.log(postData );
        })
        
      }
    }, 1000);
    useEffect(() => {
    
      return () => clearInterval(interval);
    }, [phoneNumber]);
    
    
    return (
    

        <SafeAreaView className="p-1 bg-primary h-full">
          
         <ClerkProvider publishableKey={Constants.expoConfig.extra.clerkPublishableKey}>
 
            <Stack.Screen options = {{ 
                headerStyle: {backgroundColor: COLORS.lightWhite},
                headerShadowVisible: false,
                headerTitle: "Project Aegis",
                headerTitleStyle: {fontFamily: "PoppinsMedium"},
                
            }}/>
                 
                  <SignedIn>
            <ScrollView showsVerticalScrollIndicator={false}>
                      {/* <Text className="hidden">{phoneNumber}</Text> */}
                <View className="flex-1 p-3">
                    <View className="flex-1">
                        <Text className="text-xl">Hi, Karamjeet Singh 👋</Text>
                        
                        {/* <Text>{macAddress}</Text> */}
                    </View>
                    <View className="flex-1">
                        <Text className="pt-4 text-md">Here are your patrols for today: </Text>
                    </View>
                    {/* <Button onPress={wifiList}
                        title='Log to Wifi'
                        color='#841584'/> */}
                </View>
                {tasks.map((task, index) => (
                    <PatrolCard key={index} title={task} />
                ))}
            </ScrollView>
            </SignedIn>
           <SignedOut>
              <SignUpScreen  setPhonePostLogin={setphoneNumber}/> 
              </SignedOut>
           
           </ClerkProvider>
           <StatusBar style="dark" />

        </SafeAreaView>
        
         
    )
    
}

export default Home;


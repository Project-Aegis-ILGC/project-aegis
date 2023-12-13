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
import { TaskManager } from 'expo-task-manager';
import { StatusBar } from 'expo-status-bar';
import { useUser } from "@clerk/clerk-expo";
import { createClient } from '@supabase/supabase-js'
import * as BackgroundFetch from 'expo-background-fetch';

// Create a single supabase client for interacting with your database
const supabase = createClient('https://rznmexvjvzvushscagqq.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6bm1leHZqdnp2dXNoc2NhZ3FxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA1NjYwNDEsImV4cCI6MjAxNjE0MjA0MX0.cGpn__prq9enbhmZI08PBrjh8ZgurDz81j7cj7UHaok');
const currentDate = new Date();

const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
const day = String(currentDate.getDate()).padStart(2, '0');

const formattedDate = `${year}-${month}-${day}`;

const BACKGROUND_FETCH_TASK = 'background-fetch';

// 1. Define the task by providing a name and the function that should be executed
// Note: This needs to be called in the global scope (e.g outside of your React components)
// TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
//   const now = Date.now();

//   console.log(`Got background fetch call at date: ${new Date(now).toISOString()}`);

//   // Be sure to return the successful result type!
//   return BackgroundFetch.BackgroundFetchResult.NewData;
// });

// // 2. Register the task at some point in your app by providing the same name,
// // and some configuration options for how the background fetch should behave
// // Note: This does NOT need to be in the global scope and CAN be used in your React components!
// async function registerBackgroundFetchAsync() {
//   return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
//     minimumInterval: 60 * 15, // 15 minutes
//     stopOnTerminate: false, // android only,
//     startOnBoot: true, // android only
//   });
// }
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

  async function insertData(postData) {
    const { data, error } = await supabase.from('wifi_connections').insert(postData);
    console.log(error)
  }
    const [phoneNumber, setphoneNumber] = useState(false);
    const [guardName, setGuardName] = useState("");
    const [tasks, setTasks] = useState([]);
    const interval = setInterval(() => {
      if (phoneNumber) {
        WifiManager.getBSSID().then((result) => {
          const postData = {
            'guard_phone': phoneNumber,
            'bssid': result
          }
          insertData(postData);
        })}
    }, 3000);

     async function getName(phone) {
        const {data, error } = await supabase.from('personnel_list')
            .select('guard_name')
            .eq('guard_phone', phoneNumber);
          setGuardName(data[0]["guard_name"]);

      }
      async function getTask(phone) {
        
        const {data, error} = await supabase.from('tasks')
        .select('*')
        .eq('name', guardName).
        eq('task_date', formattedDate);
        console.log(data)
        setTasks(data)
      }
    useEffect(() => {
      
      return () => clearInterval(interval);
    }, [phoneNumber]);

    useEffect(() => {
      getName(phoneNumber);
      
    }, [phoneNumber])
useEffect(() => {
  getTask(phoneNumber);
}, [guardName])
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
                        <Text className="text-xl">Hi, {guardName} 👋</Text>
                        
                        {/* <Text>{macAddress}</Text> */}
                    </View>
                    <View className="flex-1">
                        <Text className="pt-4 text-md">Here are your tasks for today: </Text>
                    </View>
                    {/* <Button onPress={wifiList}
                        title='Log to Wifi'
                        color='#841584'/> */}
                </View>
                {tasks.map((task, index) => (
                    <PatrolCard key={index} location={task.location} taskType={task.task_type} shift ={task.shift} taskDate={task.task_date} completed={task.completed}/>
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


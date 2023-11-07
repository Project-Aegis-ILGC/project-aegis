import { useState  } from "react";
import {ScrollView, SafeAreaView} from "react-native";
import {Stack, useRouter} from 'expo-router';
import {COLORS, FONT, SIZES, FONTSIZES} from '../constants/theme';
import { FlatList } from "react-native-gesture-handler";
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {TaskCard} from '../components/TaskCard';

const tasks = [
    "Lock AB1 clasrooms",
    "Check fire extinguishers in Havells",
    "Patrol AB2 3rd Floor",
    "Label new parcels"
]
const Home = () => {
    const router = useRouter();
    return (
        <SafeAreaView style={{flex : 1, backgroundColor: COLORS.lightWhite}}>
            <Stack.Screen options = {{ 
                headerStyle: {backgroundColor: COLORS.lightWhite},
                headerShadowVisible: false,
                headerTitle: "Project Aegis"
            }}/>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{flex: 1, padding: SIZES.small}}>
                    <View style={{flex: 1}}>
                        <Text style={{fontSize: FONTSIZES.large, fontSize: FONTSIZES.xlarge}}>Hi, Karamjeet Singh 👋</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={{paddingTop: SIZES.medium, fontSize:FONTSIZES.medium}}>Here are your tasks for today: </Text>
                    </View>
                </View>


                <FlatList
                data = {tasks}
                renderItem={({item}) => (
                    <TaskCard task={item}/>
                )}
                keyExtractor={item => item?.job_id}
                />
            </ScrollView>

        </SafeAreaView>) }



export default Home;
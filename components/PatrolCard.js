
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faLocationDot} from '@fortawesome/free-solid-svg-icons/faLocationDot'
import {COLORS} from '../constants/theme';
const PatrolCard = ({ patrolPlace }) => {


    return (
        <View className="m-1 rounded-lg">

            <View className="border border-gray lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-md lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                <View className="mb-8">
                    <View className='flex-row align-center'>
                        <FontAwesomeIcon icon={faLocationDot} style={{color: "#021da7", "marginTop": 5}} size="25"/>
                    <Text className="text-xl ml-2 " style={{fontFamily: "PoppinsMedium"}}>Gate No. 1</Text>
                    </View>
                        <Text className="text-mdd" style={{fontFamily: "PoppinsMedium"}}>Assigned: </Text> 
                        <Text className="text-mdd" style={{fontFamily: "PoppinsRegular"}}>Karamjeet Singh, Baldeep Singh</Text>
                    
                </View>
                <View className="flex ">
                    <View className="text-sm">
                        <Text className="text-mdd" style={{fontFamily: "PoppinsMedium"}}>6:00 PM to 8:00 PM</Text>
                        <Text className="text-md" style={{fontFamily: "PoppinsRegular"}}>November 20, 2023</Text>
                    </View>
                </View>
            </View>
        </View>


    );
};

export default PatrolCard;

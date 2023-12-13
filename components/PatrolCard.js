
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faLocationDot} from '@fortawesome/free-solid-svg-icons/faLocationDot'
import {faSquareCheck} from '@fortawesome/free-solid-svg-icons/faSquareCheck'



import {COLORS} from '../constants/theme';
const PatrolCard = ({ taskType, location, shift, taskDate, completed }) => {
    if (taskType == "Patrol") {
        location = "Campus Perimeter"
    }
    else {
        taskType = "Sitting Duty"
    }

    // Get individual date components
    const currentDate = new Date(taskDate);

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-IN', options);


    return (
        <View className="m-1 rounded-lg">

            <View className="border border-gray lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-md lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                <View className="mb-8">
                    <View className='flex-row align-center'>
                        <FontAwesomeIcon icon={faLocationDot} style={{color: "#021da7", "marginTop": 5}} size={ 25 }/>
                    <Text className="text-xl ml-2 " style={{fontFamily: "PoppinsMedium"}}>{location}</Text>
                    </View>
                        <Text className="text-mdd" style={{fontFamily: "PoppinsMedium"}}>{taskType} </Text> 
                    
                </View>
                <View className="flex">
                <View className="flex flex-row justify-between text-sm">
  <View>
    <Text className="text-mdd" style={{ fontFamily: "PoppinsMedium" }}>Shift: {shift}</Text>
    <Text className="text-md" style={{ fontFamily: "PoppinsRegular" }}>{formattedDate}</Text>
  </View>
  <View className="flex items-center m-0">
    {completed ?
      <FontAwesomeIcon icon={faSquareCheck} style={{ color: "#63e010" }} size={40}/> :
      <Text></Text>
    }
  </View>
</View>

  
</View>
                
            </View>
        </View>


    );
};

export default PatrolCard;

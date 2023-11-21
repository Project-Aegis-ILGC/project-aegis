import React, {useState} from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import CheckBox from './CheckBox';

const TaskCard = ({ title}) => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    

    return (
        <View className= {`p-2 rounded-3xl m-2 flex-row items-center border-2 border-blue bg-primary`}>
            <Text className='text-md font-regular mb-2 flex-1 m-2'>{title}</Text>
            <CheckBox className="flex-2"/>
            
        </View>
        
        
    );
};

export default TaskCard;

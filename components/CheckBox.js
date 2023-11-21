
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'

const CheckBox = () => {
    const [isChecked, setIsChecked] = useState(false);

    const handlePress = () => {
        setIsChecked(!isChecked);
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <View className={`m-1 mr-4 h-10 w-10 items-center p-3 ${isChecked ? 'bg-secondary' : 'bg-primary'} border rounded`}>
                
                    {isChecked ? (<FontAwesomeIcon icon={ faCheck } />) : <Text></Text>}
                
            </View>
        </TouchableOpacity>
    );
};

export default CheckBox;

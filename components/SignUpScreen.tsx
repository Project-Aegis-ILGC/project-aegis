import * as React from "react";
import { Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useState, useEffect  } from "react";
import WifiManager from "react-native-wifi-reborn";


export default function SignUpScreen({setPhonePostLogin}) {
  const { isLoaded, signUp, setActive } = useSignUp();
 
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
 
  // start the sign up process.
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
    try {
      const signUpNumber = "+91" + phoneNumber;
      await signUp.create({
        phoneNumber: signUpNumber
       
      });
      await signUp.preparePhoneNumberVerification();
 
      // send the email.
 
      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };
 
  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
 
   
      const completeSignUp = await signUp.attemptPhoneNumberVerification({
        code: code,
      }).then((result) => {
         setActive({ session: result.createdSessionId });
         console.log(result.createdSessionId)
         setPhonePostLogin(phoneNumber);
        
      })
      
 
      
      // setloggedIn(true);
    // } catch (err: any) {
    //   console.error(JSON.stringify(err, null, 2));
    // }
  };

 
  return (
      
    <View className="flex justify-center px-6 py-6">
      <View className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image className="mx-auto w-auto h-auto"
           source={require('../constants/logo2.png')}
          style={{width: 96, height: 112}}
      />
          <Text className="mt-5 text-center text-xl tracking-tight text-gray-900" style={{fontFamily: 'PoppinsMedium'}}>Sign In to Continue</Text>
      </View>
      
      {!pendingVerification && (
        <View >
          <View className="mt-16 flex-row">
            <View className="flex-2 pr-2 justify-center">
              <Text className="text-md" style={{fontFamily: 'PoppinsMedium'}}>+91</Text>
            </View>
            <TextInput
            className="block w-full rounded-lg border-2 p-3 justify-center shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 flex-1"
              value={phoneNumber}
              placeholder="Phone Number"
              placeholderTextColor="#555"
              onChangeText={(phone) => setPhoneNumber(phone)}
              keyboardType="phone-pad"
              style={{fontFamily: 'PoppinsMedium'}}

            />
            
          </View>
 
          
 
          <TouchableOpacity onPress={onSignUpPress} className="mt-8 flex-row w-full justify-center py-3 bg-blue-prim h-12 rounded">
            <Text className="text-white" style={{fontFamily: 'PoppinsMedium'}}>Sign In</Text>
          </TouchableOpacity>
        </View>
      )}
      {pendingVerification && (
        <View>
          <View>
            <Text className="mt-6 text-left text-lg tracking-tight text-gray-900" style={{fontFamily: 'PoppinsMedium'}}>Enter OTP</Text>
          </View>
          <View className="mt-4 flex-row">
            <TextInput
            className="block w-full rounded-lg border-2 p-3 justify-center shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 flex-1"
              value={code}
              placeholder="Code..."
              onChangeText={(code) => setCode(code)}
              keyboardType="phone-pad"
              style={{fontFamily: 'PoppinsMedium'}}
            />
          </View>
          <TouchableOpacity onPress={onPressVerify} className="mt-8 flex-row w-full justify-center py-3 bg-blue-prim h-12 rounded">
            <Text className="text-white" style={{fontFamily: 'PoppinsMedium'}}>Verify Phone Number</Text>
          </TouchableOpacity >
        </View>
      )}
    </View>
  );
}
import React, { useState } from 'react'
import { Text, TextInput, StyleSheet, View } from 'react-native'
import { EvilIcons } from '@expo/vector-icons'; 
export default function SearchBar({fetchweatherData}) {
    const [cityName, setCityName] = useState('');
  return (
    <View style={styles.search}>
        <TextInput
        style={{paddingStart:5}}
        placeholder='Enter City Name'
        value={cityName}
        onChangeText={(text)=>setCityName(text)}
        />
   <EvilIcons name="search" size={33} color="black" onPress={()=>fetchweatherData(cityName)}/>
       
    </View>
  )
}

const styles = StyleSheet.create({
    search:{
        marginTop:29,
       borderWidth:1.9,
       borderColor:'gray',
       borderRadius:15,
       margin:20,
       padding:6,
       flexDirection:'row',
       backgroundColor:'#fff',
       justifyContent:'space-between'
        
    }
  });
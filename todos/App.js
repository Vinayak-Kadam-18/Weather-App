import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NativeBaseProvider, Stack, Input,Icon,Box,HStack,AspectRatio,Image,Center,Heading} from "native-base";
import Hamburger from 'react-native-hamburger';
import { SafeAreaView } from 'react-native-safe-area-context';
import Evil from 'react-native-vector-icons/AntDesign';

export default function App() {
  const [isOpen, setOpen] = useState(true);
  return (
    <NativeBaseProvider>
    <View>
      <View style={{marginTop:40,color:'grey'}}>
       <Hamburger toggled={isOpen} toggle={setOpen} color='gray' />
      </View>
    
    <View style={{margin:20}}>
      <Input variant="outline" placeholder="Enter Job Title" InputRightElement={<Icon as={<Evil name="search1" />} size={5} mr="2" color="muted.400" />} />
       
       
      </View>   
    </View>
   
   
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  create: {
  
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start' // if you want to fill rows left to right
  },
  item: {
    width: '50%' // is 50% of container width
  }
});

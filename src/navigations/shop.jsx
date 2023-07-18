import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {Categories, Products} from "../screens"
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, useWindowDimensions } from "react-native";
import CustomText from "../components/customText/customText";
import { COLORS, FONTS } from "../themes";

const Stack = createNativeStackNavigator();

function ShopNavigator(){

    const {width} = useWindowDimensions();
    const istablet = width > 650;

    return(
        <Stack.Navigator initialRouteName="Categories" screenOptions={() => ({
            headerStyle: {
              backgroundColor: COLORS.primary,
              height: 80,
            },
            headerTitleStyle: {
              fontFamily: FONTS.bold,
              fontSize: 16,
              
            },
            headerTintColor: COLORS.white,
            // animation: 'fade_from_bottom',
           
            })}>
            <Stack.Screen name ="Categories" component={Categories}  />
            <Stack.Screen name ="Products" component={Products} options={({navigation, route}) =>(
                { 
                    headerStyle:{
                        backgroundColor: route.params.color
                    },
                    
                    headerLeft: ()=>(
                    <TouchableOpacity style={styles.goBack} onPress={()=> navigation.goBack()} >
                        <Ionicons name="arrow-back-circle" size={istablet? 35 : 25} color={COLORS.white}/>
                    </TouchableOpacity> 
                )}
            )} />

        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    goBack: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
  
});

export default ShopNavigator;
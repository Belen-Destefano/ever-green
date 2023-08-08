import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {Categories, Products, ProductDetail} from "../screens"
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { COLORS, FONTS } from "../themes";
import { Logo } from "../components";
import SettingsNavigator from "./settings";

const Stack = createNativeStackNavigator();

function ShopNavigator(){

    const {width} = useWindowDimensions();
    const istablet = width > 650;

    return(
        <Stack.Navigator initialRouteName="Categories" screenOptions={({navigation}) => ({
            headerStyle: {
              backgroundColor: COLORS.primary,
              height: 80,
            },
            headerTitleStyle: {
              fontFamily: FONTS.bold,
              fontSize: 16,
              
            },
            headerTintColor: COLORS.white,
            // NO FUNCIONA AUN, FIJARME DESPUES
            animation: 'fade_from_bottom',
           

            headerRight: () => (
             
                <TouchableOpacity
                    style={styles.icon}
                    onPress={() => navigation.navigate('SettingsStack')}>
                    <Ionicons name="settings-outline" size={24} color={COLORS.white} />
                </TouchableOpacity>
               
            ),
            headerLeft: () => (             
                <Logo/>                 
            ),  
           
            })}>
            <Stack.Screen name ="Categories" component={Categories}  />
            <Stack.Screen name ="Products" component={Products} options={({navigation, route}) =>(
                { 
                    headerStyle:{
                     backgroundColor: COLORS.primary
                    //  backgroundColor: route.params.color
                    },
                    
                    headerLeft: ()=>(
                        <TouchableOpacity style={styles.goBack} onPress={()=> navigation.goBack()} >
                            <Ionicons name="arrow-back-circle" size={istablet? 35 : 25} color={COLORS.white}/>
                        </TouchableOpacity> 
                    ),
                    title: route.params.name,
                }                
            )} 
            />

            <Stack.Screen name="ProductDetail" component={ProductDetail} options={({ navigation, route }) => (
                {
                    headerStyle: {
                    backgroundColor: COLORS.primary,
                    },
                    headerLeft: () => (
                        <TouchableOpacity style={styles.goBack} onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back-circle" size={istablet? 35 : 25} color={COLORS.white} />
                        </TouchableOpacity>
                    ),
                    title: route.params.name,
                }
            )}
            />

            <Stack.Screen name="SettingsStack" component={SettingsNavigator} options={({ navigation, route }) => ({
                    headerLeft: () => (
                        <TouchableOpacity style={styles.goBack} onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back-circle" size={30} color={COLORS.white} />
                        </TouchableOpacity>
                    ),
                    headerShown: false,
                    headerRight: null,
                }
            )}
            />

        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    goBack: {
        flexDirection: 'row',
        alignItems: 'center',
        
    },
  
});

export default ShopNavigator;
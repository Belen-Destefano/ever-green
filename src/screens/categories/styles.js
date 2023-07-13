import { StyleSheet } from "react-native";

import {COLORS} from '../../themes';

export const styles = StyleSheet.create ({   
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    categoryContainer: {
        marginHorizontal:20,
        marginTop: 15,
    },    
    listCategory:{
        gap: 15,
        paddingBottom: 20,
    }, 
});
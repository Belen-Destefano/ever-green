import { StyleSheet } from "react-native";
import { COLORS } from "../../themes";

export const styles = StyleSheet.create({
    container:{
        flex:1,
        marginHorizontal:20,
     
    },
    header:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        gap: 10,
    },
    goBack: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    goBackText:{
        fontSize:14,
        color: COLORS.text
    },
    products:{
        flex:1,
    },
    notFound:{
        flex:1,
        alignItems: 'center',
    },
    clearIcon:{
        position: "absolute",
        zIndex:2,
        right: 5,
    },
    productContainer:{
       
        backgroundColor: COLORS.background,
        borderRadius: 10, 
        // paddingHorizontal: 10,   
        // paddingVertical: 10,   
        width: '45%',
        marginHorizontal:10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 10,

    },
    productsContent:{
        gap: 25,       
        paddingVertical: 20,
    },
    productImage:{
        width: '100%',
        height: 150,
        backgroundColor: '#d4ddd4',
    },
    productDetail:{
        padding: 10,
        gap: 5,
      
    },
    productName:{
        fontSize: 14,
    },
    productPrice:{
        fontSize: 14,
     
    }

});
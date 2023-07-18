import { StyleSheet } from "react-native";
import { COLORS } from "../../themes";

export const styles = StyleSheet.create({
    container:{
        flex:1,
        marginHorizontal:20,
        marginTop: 15,
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
    goBackTextTablet:{
        fontSize:25,
        color: COLORS.text
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
    productContainerTablet:{
       
        backgroundColor: COLORS.background,
        borderRadius: 10, 
        // paddingHorizontal: 10,   
        // paddingVertical: 10,   
        width: '45%',
        marginHorizontal:20,
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
    productImageTablet:{
        width: '100%',
        height: 250,
        backgroundColor: '#d4ddd4',
    },
    productImage:{
        width: '100%',
        height: 150,
        backgroundColor: '#d4ddd4',
    },
    productDetailTablet:{
        padding: 10,
        gap: 5,
      
    },
    productNameTablet:{
        fontSize: 25,
    },
    productName:{
        fontSize: 14,
    },
    productPriceTablet:{
        fontSize: 25,
     
    },
    productPrice:{
        fontSize: 14,
     
    },

    notFoundTextTablet:{
        fontSize: 30,
    }

});
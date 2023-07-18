import { TouchableHighlight, ImageBackground, Text, useWindowDimensions } from "react-native";
import {styles} from "./styles"
import { COLORS } from "../../../themes";
import CustomText from "../../customText/customText";

const CategoryItem =({ id, name, backgroundColor, backgroundImage, onSelectCategory, style}) => {

    const {width} = useWindowDimensions();
    const istablet = width > 650;

    // console.warn ({
    //     width, height, scale, 
    //     fontScale,  
    // })


    return (
        <TouchableHighlight underlayColor={COLORS.touchablecolor} onPress={()=>onSelectCategory(id)} style={[styles.container, {backgroundColor}]}>
            <ImageBackground source={{uri:backgroundImage}} style={istablet? styles.imageBackgroundTablet : [styles.imageBackground, style]} resizeMode= { istablet ? "contain" : "cover"}>
                <CustomText style={ istablet? styles.categoryNameTablet : styles.categoryName} type="regular">{name}</CustomText>
            </ImageBackground>
        </TouchableHighlight>
    );
};

export default CategoryItem;


import { TouchableHighlight, ImageBackground, Text } from "react-native";
import {styles} from "./styles"
import { COLORS } from "../../../themes";
import CustomText from "../../customText/customText";

const CategoryItem =({ id, name, backgroundColor, backgroundImage, onSelectCategory}) => {
    return (
        <TouchableHighlight underlayColor={COLORS.touchablecolor} onPress={()=>onSelectCategory(id)} style={[styles.container, {backgroundColor}]}>
            <ImageBackground source={{uri:backgroundImage}} style={styles.imageBackground} resizeMode="cover">
                <CustomText style={styles.categoryName} type="regular">{name}</CustomText>
            </ImageBackground>
        </TouchableHighlight>
    );
};

export default CategoryItem;


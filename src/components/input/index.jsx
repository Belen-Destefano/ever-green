import { TextInput, View, useWindowDimensions } from "react-native";

import{styles} from "./styles";

const Input = ({
    borderColor, onHandleFocus, onHandleBlur, onHandleChangeText, value, placeholder, autocapitalize, cursorColor, ...props  

    
}) => {

    const {width, height, scale, fontScale} = useWindowDimensions();
    const istablet = width > 650;

    return (
        <View style={styles.container}>
            <TextInput {...props} style={[ istablet? styles.inputTablet : styles.styles.input , {borderColor}]} onFocus={onHandleFocus} onBlur={onHandleBlur} onChangeText={onHandleChangeText} autoCorrect={false} autoCapitalize="none" cursorColor={borderColor} placeholderTextColor={borderColor} />
        </View>
    );
};

export default Input;


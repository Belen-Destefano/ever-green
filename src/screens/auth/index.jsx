import {  useReducer, useState } from 'react';
import { View, TouchableOpacity, ImageBackground } from 'react-native';
import { useDispatch } from 'react-redux';
import CustomText from '../../components/customText/customText';

import { styles } from './styles';
import { useSignInMutation, useSignUpMutation } from '../../store/auth/api';
import { setUser } from '../../store/auth/auth.slice';
import { COLORS } from '../../themes';
import { InputForm } from '../../components';
import { UPDATE_FORM, onInputChange } from '../../utils/form';

const backgroundImageURL = 'https://i.postimg.cc/sx9LnrgV/white-flower-petals-with-water-drops-pollen.jpg';


const initialState = {
  email: { value: '', error: '', touched: false, hasError: true },
  password: { value: '', error: '', touched: false, hasError: true },
  isFormValid: false,
};

const formReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_FORM:
      // eslint-disable-next-line no-case-declarations
      const { name, value, hasError, error, touched, isFormValid } = action.data;
      return {
        ...state,
        [name]: {
          ...state[name],
          value,
          hasError,
          error,
          touched,
        },
        isFormValid,
      };
    default:
      return state;
  }
};

const Auth = () => {
  const dispatch = useDispatch();
  const [formState, dispatchFormState] = useReducer(formReducer, initialState);
  const [isLogin, setIsLogin] = useState(true);
 
  const headerTitle = isLogin ? 'Login' : 'Register';
  const buttonTitle = isLogin ? 'Login' : 'Register';
  const messageText = isLogin ? 'Need an account?' : 'Already have an account?';

  const [signIn, { data }] = useSignInMutation();
  const [signUp] = useSignUpMutation();



  const onHandlerAuth = async () => {
    
    try {
      if (isLogin) {
        
        const result = await signIn({
        email: formState.email.value,
        password: formState.password.value,
        });
        if (result?.data) dispatch(setUser(result.data));

        
      } else {
        
        const resultSignUp = await signUp({  email: formState.email.value,
        password: formState.password.value, });
        
     

    
        
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onHandlerInputChange = ({ name, value }) => {
    onInputChange({ name, value, dispatch: dispatchFormState, formState });
  };

  return (
    <ImageBackground source={{ uri: backgroundImageURL }} style={styles.container} resizeMode="cover">
      <CustomText style={styles.header} type="medium">{headerTitle}</CustomText>
      <View style={styles.content}>
        
        <InputForm
         
          placeholder="email@domain.com"
          placeholderTextColor={COLORS.gray}
          autoCapitalize="none"
          autoCorrect={false}
        
          onChangeText={(text) => onHandlerInputChange({ value: text, name: 'email' })}
          
          value={formState.email.value}
          label="Email"
          error={formState.email.error}
          touched={formState.email.touched}
          hasError={formState.email.hasError}
        />
       
        <InputForm
        
          placeholder="*********"
          placeholderTextColor={COLORS.gray}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          
          onChangeText={(text) => onHandlerInputChange({ value: text, name: 'password' })}
          
          value={formState.password.value}
          label="Password"
          error={formState.password.error}
          touched={formState.password.touched}
          hasError={formState.password.hasError}
        />
        <View style={styles.linkContainer}>
          <TouchableOpacity style={styles.link} onPress={() => setIsLogin(!isLogin)}>
            <CustomText style={styles.linkText} type="medium">{messageText}</CustomText>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity    disabled={!formState.isFormValid}  style={!formState.isFormValid ? styles.buttonDisabled : styles.button} onPress={onHandlerAuth}>
            <CustomText style={styles.buttonText} type="bold">{buttonTitle}</CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Auth;
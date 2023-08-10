import {  useReducer, useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { useDispatch } from 'react-redux';

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
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const headerTitle = isLogin ? 'Login' : 'Register';
  const buttonTitle = isLogin ? 'Login' : 'Register';
  const messageText = isLogin ? 'Need an account?' : 'Already have an account?';

  const [signIn, { data }] = useSignInMutation();
  const [signUp] = useSignUpMutation();



  const onHandlerAuth = async () => {
    
    try {
      if (isLogin) {
        
        // const result = await signIn({ email, password });
        // if (result?.data) dispatch(setUser(result.data));

        const result = await signIn({
        email: formState.email.value,
        password: formState.password.value,
        });
        if (result?.data) dispatch(setUser(result.data));

        
      } else {
        // const resultSignUp = await signUp({ email, password });
        const resultSignUp = await signUp({  email: formState.email.value,
          password: formState.password.value, });
        
        console.warn(resultSignUp.data);

    
        
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
      <View style={styles.content}>
        <Text style={styles.header}>{headerTitle}</Text>
        {/* <Text style={styles.label}>Email</Text> */}
        <InputForm
          // style={styles.input}
          placeholder="email@domain.com"
          placeholderTextColor={COLORS.gray}
          autoCapitalize="none"
          autoCorrect={false}
          // onChangeText={(text) => setEmail(text)}
          onChangeText={(text) => onHandlerInputChange({ value: text, name: 'email' })}
          // value={email}
          value={formState.email.value}
          label="Email"
          error={formState.email.error}
          touched={formState.email.touched}
          hasError={formState.email.hasError}
        />
        {/* <Text style={styles.label}>Password</Text> */}
        <InputForm
          // style={styles.input}
          placeholder="*********"
          placeholderTextColor={COLORS.gray}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          // onChangeText={(text) => setPassword(text)}
          onChangeText={(text) => onHandlerInputChange({ value: text, name: 'password' })}
          // value={password}
          value={formState.password.value}
          label="Password"
          error={formState.password.error}
          touched={formState.password.touched}
          hasError={formState.password.hasError}
        />
        <View style={styles.linkContainer}>
          <TouchableOpacity style={styles.link} onPress={() => setIsLogin(!isLogin)}>
            <Text style={styles.linkText}>{messageText}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity    disabled={!formState.isFormValid}  style={!formState.isFormValid ? styles.buttonDisabled : styles.button} onPress={onHandlerAuth}>
            <Text style={styles.buttonText}>{buttonTitle}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Auth;
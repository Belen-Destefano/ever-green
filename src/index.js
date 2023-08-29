import {View, ActivityIndicator } from 'react-native';
import {styles} from './styles'
import {useFonts} from 'expo-font';
import { Provider } from 'react-redux';
import { store } from './store';

import { init } from './db';
import { COLORS, FONTS } from './themes';
import RootNavigator from './navigations/index';

init()
  .then(() => {
    console.log('Initialized database');
  })
  .catch((err) => {
    console.log('Initializing db failed');
    console.log(err);
});

export default function App() {
 
  const [loaded] = useFonts({
    [FONTS.regular]: require('../assets/fonts/Inter-Regular.ttf'),
    [FONTS.bold]: require('../assets/fonts/Inter-Bold.ttf'),
    [FONTS.medium]: require('../assets/fonts/Inter-Medium.ttf'),
    [FONTS.light]: require('../assets/fonts/Inter-Light.ttf'),
  });
  


  if (!loaded) {
    return( 
      <View style={styles.loaderContainer}>
        <ActivityIndicator color={COLORS.primary} size='large'/>
      </View>
    )
  }

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <RootNavigator />
      </View>
    </Provider>
  );
}


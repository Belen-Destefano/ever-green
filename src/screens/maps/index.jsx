import { Ionicons } from '@expo/vector-icons';
import { View, TouchableOpacity } from 'react-native';

import { styles } from './styles';
import { Maps } from '../../components';
import { COLORS } from '../../themes';
import { useState } from 'react';

const MapsScreen = ({ navigation, route }) => {
  const { pickedLocation } = route.params;

  const [selectedCoordinate, setSelectedCoordinate] = useState(null); // Estado para almacenar la coordenada seleccionada
  
  const onPickedLocation = (coordinate) => {

    setSelectedCoordinate(coordinate);
  };

  const navigateToCreateAddress = (coordinate) => {

    navigation.navigate('CreateAddress', { selectedCoordinate });
  };
  

  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity style={styles.iconContainer} onPress={navigateToCreateAddress}>
        <Ionicons name="ios-save-outline" size={24} color={COLORS.white} />
      </TouchableOpacity>
    ),
  });

  return (
    <View style={styles.container}>
      <Maps pickedLocation={pickedLocation} onPickedLocation={onPickedLocation} />
    </View>
  );
};

export default MapsScreen;
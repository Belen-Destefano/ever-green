import { Ionicons } from '@expo/vector-icons';
import { View, TouchableOpacity } from 'react-native';

import { styles } from './styles';
import { Maps } from '../../components';
import { COLORS } from '../../themes';
import { useEffect, useState } from 'react';

const MapsScreen = ({ navigation, route }) => {

  // locationtoshow va a ser o el clickeado si Existe , o el de firebase del usuario o coordenadas de cordoba
  const { locationToShow } = route.params;

 


  const [selectedCoordinate, setSelectedCoordinate] = useState(null); // Estado para almacenar la coordenada seleccionada y enviarsela por route params a createAddress 
  const onPickedLocation = (coordinate) => {
    setSelectedCoordinate(coordinate);
  
  };

  // boton guardar que envia la coordenada seleccionada en el mapa interactivo a create address
  const navigateToCreateAddress = () => {
 
    navigation.navigate('CreateAddress', { selectedCoordinate });
  };
  


  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={styles.iconContainer} onPress={navigateToCreateAddress}>
          <Ionicons name="ios-save-outline" size={24} color={COLORS.white} />
        </TouchableOpacity>
      ),
    });
  }, [navigateToCreateAddress]); 

  return (
    <View style={styles.container}>
      <Maps locationToShow={locationToShow} onPickedLocation={onPickedLocation} />
    </View>
  );
};

export default MapsScreen;
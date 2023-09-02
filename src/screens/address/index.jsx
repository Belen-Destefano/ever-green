import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import CustomText from '../../components/customText/customText';

import { styles } from './styles';
import { selectPlaces } from '../../db/index';

const Address = ({ navigation }) => {
  const [places, setPlaces] = useState([]);
 

  const handlePress = () => {
    navigation.navigate('CreateAddress');
  };

  useFocusEffect(
    useCallback(() => {
      const getPlaces = async () => {
        const places = await selectPlaces();
        setPlaces(places);
      };
      getPlaces();

      return () => {
        setPlaces([]);
      };
    }, [])
  );

   // Filtrar elementos sin imagen
   const filteredPlaces = places.filter((item) => !!item.image);

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredPlaces}
        renderItem={({ item }) => {
          const { lat, lng } = JSON.parse(item.coords);

          // para enviar coordenadas de item clickeado a createaddress
          const handleItemPress = (item) => {           
            const coordinate = { latitude: lat, longitude: lng };
            navigation.navigate('CreateAddress', { selectedCoordinateSaved: coordinate });
          };    

          
          return (
            <TouchableOpacity onPress={handleItemPress}>
              <View style={styles.itemContainer}>
                
                <View style={styles.mapImageContainer}>
                  <Image source={{ uri: item.image }} style={styles.mapImage} />
                </View>
            
                <View style={styles.itemDetailsContainer}>
                  <CustomText style={styles.itemAddress}>{item.address}</CustomText>
                  <CustomText style={styles.itemCoords}>{`Lat: ${lat} Lng: ${lng}`}</CustomText>
                </View>
              </View>
              </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity style={styles.floatingButton} onPress={handlePress}>
        <View style={styles.floatingButtonTextContainer}>
          <CustomText style={styles.floatingButtonText}>+</CustomText>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Address;
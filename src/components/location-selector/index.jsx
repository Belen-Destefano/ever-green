import { getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';
import { useEffect, useState } from 'react';
import { View, Button, Text, Alert } from 'react-native';
import { useDispatch } from 'react-redux';

import { styles } from './styles';
import { URL_MAPS } from '../../constants/maps';
import { saveMapImageUrl } from '../../store/address/address.slice';
import { COLORS } from '../../themes';
import MapPreview from '../map-preview';

const LocationSelector = ({ onLocation, coordinate , navigation  }) => {

  const dispatch = useDispatch();
  const [pickedLocation, setPickedLocation] = useState(null);
  const verifyPermissions = async () => {
    const { status } = await requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant location permissions to use this app.',
        [{ text: 'Okay' }]
      );

      return false;
    }
    return true;
  };

  const mapPreviewUrlImage = pickedLocation
  ? URL_MAPS({ lat: pickedLocation.lat, lng: pickedLocation.lng, zoom: 15 })
  : '';

  const handleLocationUpdate = ({ latitude, longitude }) => {
 
    setPickedLocation({ lat: latitude, lng: longitude });
    onLocation({ lat: latitude, lng: longitude });
  };


  useEffect(() => {
   
    if (coordinate) {
      handleLocationUpdate(coordinate);
    }
  }, [coordinate]);

  const onHandlerGetLocation = async () => {
    
    const isLocationPermission = await verifyPermissions();
    if (!isLocationPermission) return;

    const location = await getCurrentPositionAsync({
      accuracy: 6,
      timeInterval: 5000,
    });

    const { latitude, longitude } = location.coords;

    handleLocationUpdate({ latitude, longitude });
    
  };

  const onSelectMap = async () => {
    if (pickedLocation) {
    
      navigation.navigate('Maps', { pickedLocation });
    } else {
      console.log('NO HAY Picked Location:', pickedLocation);
      const cordobaLocation = {
        name: 'Provincia de Córdoba',
        lat: -31.5, // Latitud de la provincia de Córdoba
        lng: -64.2, // Longitud de la provincia de Córdoba
      };
      navigation.navigate('Maps', { pickedLocation: cordobaLocation });
      // navigation.navigate('Maps');
    }
  };



  useEffect(() => {
    if (pickedLocation) {
      dispatch(saveMapImageUrl(mapPreviewUrlImage));
   
    }
  }, [pickedLocation]);

  return (
    <View style={styles.container}>
      <MapPreview location={pickedLocation} style={styles.preview} mapImage={mapPreviewUrlImage}>
        <Text style={styles.text}>No location chosen yet!</Text>
      </MapPreview>
      <Button title="Get User Location" onPress={onHandlerGetLocation} color={COLORS.primary} />
      <Button title="Select on map" onPress={onSelectMap} color={COLORS.primary} />
    </View>
  );
};

export default LocationSelector;
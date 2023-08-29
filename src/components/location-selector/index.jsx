import { getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';
import { useEffect, useState } from 'react';
import { View, Button, Text, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import CustomText from '../customText/customText';

import { styles } from './styles';
import { URL_MAPS } from '../../constants/maps';
import { saveMapImageUrl } from '../../store/address/address.slice';
import { COLORS } from '../../themes';
import MapPreview from '../map-preview';
import { useSelector } from 'react-redux';
import { useGetProfileQuery } from '../../store/settings/api';


const LocationSelector = ({ onLocation, coordinate , navigation  }) => {

  const dispatch = useDispatch();
  const [pickedLocation, setPickedLocation] = useState(null);
  const [savedMap, setSavedMap] = useState(null);


  // PARA IMAGEN DE MAPA ESTATICO  
   // saco del store
   const mapImageUrl = useSelector((state) => state.address.mapImageUrl);
  // saco de firebase las coordenadas guardadas
  const localId = useSelector((state) => state.auth.user.localId);
  const { data: userData, isLoading: isLoadingUserData } = useGetProfileQuery({ localId });

  useEffect(() => {
    if (userData) {
      setSavedMap(userData.location);
    }
  }, [userData]); 

  // hago la image con:  la locacion seleccionada del momento, sino con la de store, y sino con la de firebase y sino vacia
  const mapPreviewUrlImage = pickedLocation
  ? URL_MAPS({ lat: pickedLocation.lat, lng: pickedLocation.lng, zoom: 15 })
  : mapImageUrl? mapImageUrl : savedMap? URL_MAPS({ lat: savedMap.lat, lng: savedMap.lng, zoom: 15 }) : "";



  // FUNCION QUE SETEA EL ONLOCATION PARA ENVIAR A SU PADRE Y EL SETPICKED PARA SU HIJO 
  const handleLocationUpdate = ({ latitude, longitude }) => {
 
    setPickedLocation({ lat: latitude, lng: longitude });
    onLocation({ lat: latitude, lng: longitude });
  };

  // si hay un coordinate, ya sea del flatlist o seleccionado en el mapa interactivo, se setean coordenadas en setPickedLocation y onlocation con esa data
  useEffect(() => {
    if (coordinate) {
      handleLocationUpdate(coordinate);
    }
  }, [coordinate]);

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

  // si clickearon Get User Location, se realizan los permisos y se obtiene la localizacion y se setea coordenadas en setPickedLocation y onlocation con esa data
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

  // si clickearon select on map y ya hay picked location (seteada por ubicacion actual o por coordinate-del flatlist o mapa ya seleccionado), o en vez de picked location estan las coordenadas del firebase en savedMap... va a navegar a maps con esa info a creen maps para la initialRegion
  const onSelectMap = async () => {
    if (pickedLocation || savedMap) {
      const locationToShow = pickedLocation ? pickedLocation : savedMap;
      navigation.navigate('Maps', { locationToShow });
    } else {
      const cordobaLocation = {
        name: 'Provincia de Córdoba',
        lat: -31.5, // Latitud de la provincia de Córdoba
        lng: -64.2, // Longitud de la provincia de Córdoba
      };
      navigation.navigate('Maps', { locationToShow: cordobaLocation});
    }
  };
  

  // puse un effect con array de dep a pickedLocation para que envie al store la imagen (unicamente cuando es formada por pickedlocation ()). por que la imagen del store solo se usa cuando se guarda la info en la db en createAddress y no vino del flatlist de la db. osea picked location del getuserlocation o del selectonmap
  useEffect(() => {
    if (pickedLocation && pickedLocation.lat !== null && pickedLocation.lng !== null) {
     
      dispatch(saveMapImageUrl(mapPreviewUrlImage));
    }
  }, [pickedLocation]);
  

  return (
    <View style={styles.container}>
      <MapPreview location={pickedLocation} style={styles.preview} mapImage={mapPreviewUrlImage}>
        <CustomText style={styles.text} type="medium">No location chosen yet!</CustomText>
      </MapPreview>
      <Button title="Get User Location" style={styles.userLocation} onPress={onHandlerGetLocation} color={COLORS.secodary} />
      <Button title="Select on map" style={styles.mapLocation} onPress={onSelectMap} color={COLORS.secodary} />
    </View>
  );
};

export default LocationSelector;
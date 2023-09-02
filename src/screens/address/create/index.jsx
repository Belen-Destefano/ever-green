import { useEffect, useState } from 'react';
import { View } from 'react-native';
import {  useSelector } from 'react-redux';

import { styles } from './styles';
import { LocationSelector } from '../../../components';

import { insertPlace } from '../../../db';
import {  useLazyGetGeocodingQuery } from '../../../store/maps/api';
import { useUpdateAddressMutation } from '../../../store/settings/api';


const CreateAddress = ({ route, navigation }) => {

  const localId = useSelector((state) => state.auth.user.localId);
  const email = useSelector((state) => state.auth.user.email);


  const mapImageUrl = useSelector((state) => state.address.mapImageUrl);
  const [location, setLocation] = useState(null);
  const [updateAddress] = useUpdateAddressMutation();
  const [getGeolocation] = useLazyGetGeocodingQuery();


  //  el coordinate se va a formar por el params que reciba del screen maps o el params que se reciba del item clickeado del flat list de screen address
  const selectedCoordinate = route.params?.selectedCoordinate;
  const selectedCoordinateSaved = route.params?.selectedCoordinateSaved;
  const coordinate = selectedCoordinate || selectedCoordinateSaved || null;


  const onLocation = ({ lat, lng }) => {
    setLocation({ lat, lng });
  };


  // bloque en donde si hay location se guarda info en db, y en el firebase. pero si la location viene de algun item del flatlist de la db, que solo se envie al firebase.
  useEffect(() => {
    if (location) {
      const onHandlerUpdateLocation = async () => {
        const { lat, lng } = location;
        const addressName = await getGeolocation({ lat, lng });
        // Solo ejecutar insertPlace si el coordinate no se formó con selectedCoordinateSaved
        if (!selectedCoordinateSaved) {
          await insertPlace({
            address: addressName.data,
            coords: location,
            image: mapImageUrl,
           
          });
        }
        updateAddress({ localId, address: addressName.data, location, email });
      };
      
      onHandlerUpdateLocation();
    }
  }, [location, selectedCoordinateSaved]);
  



  return (
    <View style={styles.container}>      
      <LocationSelector onLocation={onLocation} navigation={navigation} coordinate={coordinate} />     
    </View>
  );
};

export default CreateAddress;
import {  ImageBackground, View } from 'react-native';
import { useSelector } from 'react-redux';

import { styles } from './styles';
import { ImageSelector, LoadingIndicator } from '../../components';
import { useGetProfileQuery, useUpdateImageProfileMutation } from '../../store/settings/api';
import CustomText from '../../components/customText/customText';

import { useDispatch } from 'react-redux';
import { saveAddress } from '../../store/address/address.slice';
import { useEffect, useState } from 'react';


const Profile = () => {
  const localId = useSelector((state) => state.auth.user.localId);
  const adressStore = useSelector((state) => state.address.address);
  const [uploadImageProfile, { data, isLoading, error }] = useUpdateImageProfileMutation();
  const { data: userData, isLoading: isLoadingUserData } = useGetProfileQuery({ localId });

  const backgroundImageURL = 'https://i.postimg.cc/9FQzYxN5/fondo.jpg';


  const [address, setAddress] = useState(''); 
  const dispatch = useDispatch();  
  const email= (useSelector((state) => state.auth.user.email));

  const onHandlerImage = async ({ uri, base64 }) => {
    
    await uploadImageProfile({ localId, image: `data:image/jpeg;base64,${base64}` });
  };
  
  useEffect(() => {
    if (userData) {     
    
      // envio al store el address del usuario que inicio sesion       
      dispatch(saveAddress(userData.address));     
      setAddress(userData?.address || adressStore || "");
    }
  }, [userData]); 

 

  return (
    <ImageBackground
      source={{ uri: backgroundImageURL }}
      style={styles.container}
    >
      <View style={styles.header}>
        <ImageSelector profileImage={userData?.profileImage} onSelect={onHandlerImage} />


         <View style={styles.containerInfo}>
            {email && (
              <CustomText style={styles.emailText} type="bold" numberOfLines={1} ellipsizeMode="tail">
                Email: {email} 
              </CustomText>
            )}
            {address && (
              <CustomText style={styles.addressText} type="bold" numberOfLines={1} ellipsizeMode="tail">
                Address: {address} 
              </CustomText>
            )}
        </View>

        {isLoading && <LoadingIndicator />}
      </View>
    </ImageBackground>
  );
};

export default Profile;




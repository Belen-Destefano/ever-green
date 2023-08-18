import { View, Image } from 'react-native';
import { styles } from './styles';
import { useSelector } from 'react-redux';

const MapPreview = ({ children, location, style, mapImage }) => {
  const reduxMapImageUrl = useSelector(state => state.address.mapImageUrl);

  const imageUrlToDisplay = location ? mapImage : reduxMapImageUrl;

  return (
    <View style={{ ...styles.container, ...style }}>
      {imageUrlToDisplay? <Image style={styles.mapImage} source={{ uri: imageUrlToDisplay }} /> : children}
    </View>
  );
};

export default MapPreview;

import { View, Image } from 'react-native';
import { styles } from './styles';


const MapPreview = ({ children, location, style, mapImage }) => {


  return (
    <View style={{ ...styles.container, ...style }}>
      {mapImage? <Image style={styles.mapImage} source={{ uri: mapImage }} /> : children}
    </View>
  );
};

export default MapPreview;

import React from "react";
import { View, ActivityIndicator } from "react-native";
import { COLORS } from "../../themes";
import { styles } from "./styles";

const LoadingIndicator = () => {
  return (
    <View style={styles.containerLoader}>
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  );
};

export default LoadingIndicator;

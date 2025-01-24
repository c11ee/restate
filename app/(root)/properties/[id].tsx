import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

const Property = () => {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text className="font-bold text-2xl">Property: {id}</Text>
    </View>
  );
};

export default Property;

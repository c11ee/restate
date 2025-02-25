import images from "@/constants/images";
import { Image, TouchableOpacity, View } from "react-native";

interface Props {
  onPress?: () => void;
}

export const FeaturedCard = ({ onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex flex-col items-start w-60 h-80 relative"
    >
      <Image source={images.japan} className="size-full rounded-2xl"></Image>
      <Image
        source={images.cardGradient}
        className="size-full rounded-2xl absolute bottom-0"
      ></Image>
    </TouchableOpacity>
    // 1:53:25
  );
};

export const Card = () => {
  return <View className=""></View>;
};

export default FeaturedCard;

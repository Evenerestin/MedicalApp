import { Slot, useRouter } from "expo-router";
import { View } from "react-native";
import { Menu } from "../../components/organisms/navigation/Menu";

export default function PagesLayout() {
  const router = useRouter();
  const handleTabPress = (key: string) => {
    switch (key) {
      case "home":
        router.push("/(pages)");
        break;
      case "calendar":
        router.push("/(pages)/calendar");
        break;
      case "medications":
        router.push("/(pages)/medications");
        break;
      case "vitals":
        router.push("/(pages)/health/vitals");
        break;
      case "profile":
        router.push("/(pages)/profile");
        break;
      default:
        break;
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <Slot />
      <Menu onTabPress={handleTabPress} />
    </View>
  );
}

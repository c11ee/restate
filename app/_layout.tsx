import { useEffect } from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import "./global.css";
import GlobalProvider from "@/lib/global-provider";

export default function RootLayout() {
  // 异步加载自定义字体
  const [fontsLoaded] = useFonts({
    "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
    "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
    "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
    "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
  });

  useEffect(() => {
    // 是否加载完成
    if (fontsLoaded) {
      // 隐藏闪屏界面
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    // 为了让全局能使用里面的数据
    <GlobalProvider>
      {/* 管理屏幕的堆叠和导航 */}
      <Stack screenOptions={{ headerShown: false }} />
    </GlobalProvider>
  );
}

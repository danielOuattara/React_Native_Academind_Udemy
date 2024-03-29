import { StatusBar } from "expo-status-bar";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { StartGameScreen, GameScreen, GameOverScreen } from "./screens";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useState } from "react";
import { Colors } from "./constants";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "open-sans-regular": require("./assets/fonts/OpenSans-Regular.ttf"),
  });

  const [userNumber, setUserNumber] = useState(undefined);
  const [gameIsOver, setGameIsOver] = useState(false);
  const [counter, setCounter] = useState(0);

  const startNewGame = () => {
    setCounter(0);
    setGameIsOver(false);
    setUserNumber(undefined);
  };

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  let screenToLoad = <StartGameScreen setUserNumber={setUserNumber} />;
  if (userNumber) {
    screenToLoad = (
      <GameScreen
        userNumber={userNumber}
        setCounter={setCounter}
        counter={counter}
        setGameIsOver={setGameIsOver}
      />
    );
  }

  if (gameIsOver) {
    screenToLoad = (
      <GameOverScreen
        counter={counter}
        userNumber={userNumber}
        startNewGame={startNewGame}
      />
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <LinearGradient
        colors={[Colors.primary500, Colors.secondary500]}
        style={styles.rootScreen}
        onLayout={onLayoutRootView}
      >
        <ImageBackground
          source={require("./assets/images/background.png")}
          resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}
        >
          <SafeAreaView style={styles.safeArea}>{screenToLoad}</SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.25,
  },
  safeArea: {
    flex: 1,
  },
});

import React, { useEffect } from "react";
import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SceneMap, TabView } from "react-native-tab-view";
import FirstRoute from "./src/screens/FirstRoute";
import SecondRoute from "./src/screens/SecondRoute";
import { initDbTable } from "./src/utils/SQLite";

const initialLayout = { width: Dimensions.get("window").width };

export default function App() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Tính Toán" },
    { key: "second", title: "Tất Cả Sản Phẩm" },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  useEffect(() => {
    (async () => {
      await initDbTable();
    })();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
    </SafeAreaView>
  );
}

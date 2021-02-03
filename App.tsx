import React from 'react';
import { Dimensions } from 'react-native';
import { SceneMap, TabView } from "react-native-tab-view";
import FirstRoute from './components/FirstRoute';
import SecondRoute from './components/SecondRoute';

const initialLayout = { width: Dimensions.get("window").width };

export default function App() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Tính Toán" },
    { key: "second", title: "Giá Gốc" },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
}

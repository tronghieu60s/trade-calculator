import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SceneMap, TabView } from "react-native-tab-view";
import { ProductsProvider } from "./src/contexts/ProductsContext";
import { getProducts } from "./src/models/ProductsModel";
import FirstRoute from "./src/screens/FirstRoute";
import SecondRoute from "./src/screens/SecondRoute";
import { initDbTable } from "./src/utils/SQLite";
import { Product } from "./types";

const initialLayout = { width: Dimensions.get("window").width };

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  
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

      const { data } = await getProducts();
      setProducts(data || []);
    })();
  }, []);

  return (
    <ProductsProvider value={{ products, setProducts }}>
      <SafeAreaView style={{ flex: 1 }}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
        />
      </SafeAreaView>
    </ProductsProvider>
  );
}

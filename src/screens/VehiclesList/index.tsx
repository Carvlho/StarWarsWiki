import { useEffect, useState } from "react";
import { Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import useFetch from "../../hooks/useFetch";

import Header from "../../components/Header";
import CardItem from "../../components/CardItem";
import Footer from "../../components/FooterList";

import { RootStackParams } from "../../utils/RootStackParams";

import {
  ContainerLoading,
  ContainerVehicles,
  List,
  LoadingIndicator,
} from "./styles";

interface VehiclesProps {
  name: string;
}

type screensStack = NativeStackNavigationProp<RootStackParams>;

export default function VehiclesList() {
  const navigation = useNavigation<screensStack>();

  const [page, setPage] = useState(1);
  const [listVehicles, setListVehicles] = useState<VehiclesProps[]>([]);
  const [fadeAnim] = useState(new Animated.Value(0));

  const [maxPages, setMaxPages] = useState(0);

  const { fetch, loading, setLoading } = useFetch({
    route: `vehicles/?page=${page}`,
  });

  function handleNextPage() {
    setPage(page + 1);
  }

  function handlePreviusPage() {
    setPage(page - 1);
  }

  useEffect(() => {
    setLoading(true);
    setListVehicles([]);

    fetch()
      .then((response) => {
        const { count, results } = response?.data;

        setMaxPages(Math.ceil(count / 10));

        setListVehicles(results);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page]);

  useEffect(() => {
    // Animação de fade-in
    Animated.timing(fadeAnim, {
      toValue: loading ? 0 : 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [loading]);

  function handleDetails(item: VehiclesProps) {}

  return (
    <ContainerVehicles>
      <Header title="Veículos" />

      {loading ? (
        <ContainerLoading>
          <LoadingIndicator size="large" />
        </ContainerLoading>
      ) : (
        <Animated.View
          style={{ width: "100%", opacity: fadeAnim, paddingBottom: 120 }}
        >
          <List
            keyExtractor={(item, index) => index.toString()}
            data={listVehicles}
            renderItem={({ item }: any) => (
              <CardItem
                name={item.name}
                handleDetails={() => handleDetails(item)}
              />
            )}
            ListFooterComponent={() => (
              <Footer
                prevPage={handlePreviusPage}
                nextPage={handleNextPage}
                currentPage={page}
                maxPages={maxPages}
              />
            )}
          />
        </Animated.View>
      )}
    </ContainerVehicles>
  );
}

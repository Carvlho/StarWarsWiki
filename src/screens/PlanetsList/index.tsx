import { useEffect, useState } from "react";
import { Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text } from "react-native";

import useFetch from "../../hooks/useFetch";

import Header from "../../components/Header";
import CardItem from "../../components/CardItem";
import Footer from "../../components/FooterList";

import {
  ContainerLoading,
  ContainerPlanets,
  List,
  LoadingIndicator,
} from "./styles";

interface PlanetsProps {
  name: string;
}

export default function PlanetsList() {
  const [page, setPage] = useState(1);
  const [listPlanets, setListPlanets] = useState<PlanetsProps[]>([]);
  const [fadeAnim] = useState(new Animated.Value(0));

  const [maxPages, setMaxPages] = useState(0);

  const { fetch, loading, setLoading } = useFetch({
    route: `planets/?page=${page}`,
  });

  function handleNextPage() {
    setPage(page + 1);
  }

  function handlePreviusPage() {
    setPage(page - 1);
  }

  useEffect(() => {
    setLoading(true);
    setListPlanets([]);

    fetch()
      .then((response) => {
        const { count, results } = response?.data;

        setMaxPages(count / 10);

        setListPlanets(results);
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

  function handleDetails() {}

  return (
    <ContainerPlanets>
      <Header title="Planetas" />

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
            data={listPlanets}
            renderItem={({ item }: any) => (
              <CardItem
                name={item.name}
                handleDetails={() => handleDetails()}
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
    </ContainerPlanets>
  );
}

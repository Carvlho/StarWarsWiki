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
  ContainerFilms,
  ContainerLoading,
  List,
  LoadingIndicator,
} from "./styles";

interface FilmsProps {
  title: string;
}

type screensStack = NativeStackNavigationProp<RootStackParams>;

export default function FilmsList() {
  const navigation = useNavigation<screensStack>();

  const [page, setPage] = useState(1);
  const [listFilms, setListFilms] = useState<FilmsProps[]>([]);
  const [fadeAnim] = useState(new Animated.Value(0));

  const [maxPages, setMaxPages] = useState(0);

  const { fetch, loading, setLoading } = useFetch({
    route: `films/`,
  });

  function handleNextPage() {
    setPage(page + 1);
  }

  function handlePreviusPage() {
    setPage(page - 1);
  }

  useEffect(() => {
    setLoading(true);
    setListFilms([]);

    fetch()
      .then((response) => {
        const { count, results } = response?.data;

        setMaxPages(Math.ceil(count / 10));

        setListFilms(results);
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

  function handleDetails(item: FilmsProps) {}

  return (
    <ContainerFilms>
      <Header title="Filmes" />

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
            data={listFilms}
            renderItem={({ item }: any) => (
              <CardItem
                name={item.title}
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
    </ContainerFilms>
  );
}

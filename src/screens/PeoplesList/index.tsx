import { useEffect, useState } from "react";
import { ActivityIndicator, Animated } from "react-native";

import useFetch from "../../hooks/useFetch";

import Header from "../../components/Header";
import CardItem from "../../components/CardItem";
import Footer from "../../components/FooterList";

import { PeoplesProps } from "./interfacePeople";

import { Container, ContainerLoading, List, LoadingIndicator } from "./styles";

export default function PeoplesList() {
  const [page, setPage] = useState(1);
  const [listPeoples, setListPeoples] = useState<PeoplesProps[]>([]);
  const [fadeAnim] = useState(new Animated.Value(0));

  const { fetch, loading, setLoading } = useFetch({
    route: `people/?page=${page}`,
  });

  function handleNextPage() {
    setPage(page + 1);
  }

  function handlePreviusPage() {
    setPage(page - 1);
  }

  useEffect(() => {
    setLoading(true);
    setListPeoples([]);

    fetch()
      .then((response) => {
        const { results } = response?.data;

        setListPeoples(results);
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

  return (
    <Container>
      <Header title="Peoples" />

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
            data={listPeoples}
            renderItem={({ item }: any) => <CardItem name={item.name} />}
            ListFooterComponent={() => (
              <Footer
                prevPage={handlePreviusPage}
                nextPage={handleNextPage}
                currentPage={page}
              />
            )}
          />
        </Animated.View>
      )}
    </Container>
  );
}

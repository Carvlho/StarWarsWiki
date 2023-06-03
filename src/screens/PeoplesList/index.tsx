import { useEffect, useState } from "react";
import { Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import useFetch from "../../hooks/useFetch";

import Header from "../../components/Header";
import CardItem from "../../components/CardItem";
import Footer from "../../components/FooterList";

import { PeoplesProps } from "./interfacePeople";

import { RootStackParams } from "../../utils/RootStackParams";

import { Container, ContainerLoading, List, LoadingIndicator } from "./styles";

type screensStack = NativeStackNavigationProp<
  RootStackParams,
  "PeoplesDetails"
>;

export default function PeoplesList() {
  const navigation = useNavigation<screensStack>();

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

  function handleDetails(item: PeoplesProps) {
    navigation.navigate("PeoplesDetails", { details: item });
  }

  return (
    <Container>
      <Header title="Pessoas" />

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
              />
            )}
          />
        </Animated.View>
      )}
    </Container>
  );
}

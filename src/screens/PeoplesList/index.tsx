import { useEffect, useState } from "react";
import { Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import useFetch from "../../hooks/useFetch";

import {
  CardItem,
  Container,
  Footer,
  Header,
  List,
  Loading,
  SafeArea,
} from "../../components";

import { PeoplesProps } from "./interfacePeople";

import { RootStackParams } from "../../utils/RootStackParams";

type screensStack = NativeStackNavigationProp<RootStackParams>;

export default function PeoplesList() {
  const navigation = useNavigation<screensStack>();

  const [page, setPage] = useState(1);
  const [listPeoples, setListPeoples] = useState<PeoplesProps[]>([]);
  const [fadeAnim] = useState(new Animated.Value(0));

  const [maxPages, setMaxPages] = useState(0);

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
        const { count, results } = response?.data;

        setMaxPages(Math.ceil(count / 10));

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
    <SafeArea>
      <Container>
        <Header title="Pessoas" />

        {loading ? (
          <Loading />
        ) : (
          <Animated.View style={{ width: "100%", opacity: fadeAnim }}>
            <List
              testID="PeoplesList"
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
                  maxPages={maxPages}
                />
              )}
            />
          </Animated.View>
        )}
      </Container>
    </SafeArea>
  );
}

import { render, waitFor } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";

import theme from "../../global/styles/theme";

import Header from "../../components/Header";
import { PeoplesDetails } from "../../screens";

jest.mock("@react-navigation/native", () => {
  const data = {
    name: "Luke Skywalker",
    height: "172",
    mass: "77",
    hair_color: "blond",
    skin_color: "fair",
    eye_color: "blue",
    birth_year: "19BBY",
    gender: "male",
    homeworld: "https://swapi.dev/api/planets/1/",
    films: [
      "https://swapi.dev/api/films/1/",
      "https://swapi.dev/api/films/2/",
      "https://swapi.dev/api/films/3/",
      "https://swapi.dev/api/films/6/",
    ],
    species: [],
    vehicles: [
      "https://swapi.dev/api/vehicles/14/",
      "https://swapi.dev/api/vehicles/30/",
    ],
    starships: [
      "https://swapi.dev/api/starships/12/",
      "https://swapi.dev/api/starships/22/",
    ],
    created: "2014-12-09T13:50:51.644000Z",
    edited: "2014-12-20T21:17:56.891000Z",
    url: "https://swapi.dev/api/people/1/",
  };

  return {
    useNavigation: jest.fn(),
    useRoute: () => ({
      params: {
        details: data,
      },
    }),
  };
});

describe("People Details Page", () => {
  it("should be able to render an header", () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <Header title="Detalhes" />
      </ThemeProvider>
    );

    expect(getByTestId("Header")).toBeTruthy();
  });

  it("should have the card details", async () => {
    const { getByText, getByTestId } = render(
      <ThemeProvider theme={theme}>
        <PeoplesDetails />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(getByTestId("card-details")).toBeTruthy();
    });

    expect(getByText("Altura:")).toBeTruthy();
    expect(getByText("Cor dos Olhos:")).toBeTruthy();
    expect(getByText("Cor da Pele:")).toBeTruthy();
    expect(getByText("Cor do Cabelo:")).toBeTruthy();
    expect(getByText("Ano de Nascimento:")).toBeTruthy();
    expect(getByText("Gênero:")).toBeTruthy();
    expect(getByText("Planeta Natal:")).toBeTruthy();
  });

  it("should contains loading view", () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <PeoplesDetails />
      </ThemeProvider>
    );

    expect(getByTestId("loading-view")).toBeTruthy();
  });

  it("should have the related things", async () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <PeoplesDetails />
      </ThemeProvider>
    );

    await waitFor(
      () => {
        expect(getByTestId("relatedThings-view")).toBeTruthy();
      },
      { timeout: 5000 }
    );
  });
});

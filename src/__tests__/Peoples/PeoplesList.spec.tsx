import { render, waitFor } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";

import theme from "../../global/styles/theme";

import Header from "../../components/Header";
import PeoplesList from "../../screens/PeoplesList";

jest.mock("@react-navigation/native", () => {
  return {
    useNavigation: jest.fn(),
  };
});

describe("People Listing Page", () => {
  it("should be able to render an header", () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <Header title="Pessoas" />
      </ThemeProvider>
    );

    expect(getByTestId("Header")).toBeTruthy();
  });

  it("should contains loading view", () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <PeoplesList />
      </ThemeProvider>
    );

    expect(getByTestId("loading-view")).toBeTruthy();
  });

  it("should have the flatList", async () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <PeoplesList />
      </ThemeProvider>
    );

    await waitFor(
      () => {
        expect(getByTestId("PeoplesList")).toBeTruthy();
      },
      { timeout: 3000 }
    );
  });

  it("should contains a footer in the list", async () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <PeoplesList />
      </ThemeProvider>
    );

    await waitFor(
      () => {
        expect(getByTestId("footer_list")).toBeTruthy();
      },
      { timeout: 3000 }
    );
  });
});

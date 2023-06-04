import { render } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";

import theme from "../../global/styles/theme";

import Header from "../../components/Header";

jest.mock("@react-navigation/native", () => {
  return {
    useNavigation: jest.fn(),
  };
});

describe("Header component", () => {
  it("should be able to render an header", () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <Header title="Test" />
      </ThemeProvider>
    );

    expect(getByTestId("Header")).toBeTruthy();
  });

  it("should contain a button go back", () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <Header title="Test" />
      </ThemeProvider>
    );

    expect(getByTestId("btnGoBack")).toBeTruthy();
  });
});

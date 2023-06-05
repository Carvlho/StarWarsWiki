import styled from "styled-components/native";

const List = styled.FlatList.attrs(() => ({
  contentContainerStyle: {
    paddingBottom: 50,
  },
}))`
  width: 100%;
`;

export default List;

import { ContainerLoading, LoadingIndicator } from "./styles";

export default function Loading() {
  return (
    <ContainerLoading testID="loading-view">
      <LoadingIndicator size="large" color="white" />
    </ContainerLoading>
  );
}

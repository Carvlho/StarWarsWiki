import { ImageSourcePropType } from "react-native";
import { RectButtonProps } from "react-native-gesture-handler";

import { ButtonTitle, Container, ImageButton } from "./styles";

interface ButtonCategoriesProps extends RectButtonProps {
  title: string;
  icon: ImageSourcePropType;
}

export default function ButtonCategories({
  title,
  icon,
  ...rest
}: ButtonCategoriesProps) {
  return (
    <Container {...rest}>
      <ImageButton source={icon} />
      <ButtonTitle>{title}</ButtonTitle>
    </Container>
  );
}

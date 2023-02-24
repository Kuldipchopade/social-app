import { useTheme } from "@emotion/react";
import { Typography } from "@mui/material";
import StyledFlexBetween from "components/FlexBetween";
import WidgetWarpper from "components/WidgetWrapper";

const AddvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWarpper>
      <StyledFlexBetween>
        <Typography color="dark" variant="h5" fontWeight="500"></Typography>
        <Typography color={medium}>Create Ad</Typography>
      </StyledFlexBetween>
      <img
        width="100%"
        src="http://localhost:3001/assets/info4.jpeg"
        alt="advert"
        style={{ borderRadius: "0.75rem", margin: "0.75rem" }}
      />
      <StyledFlexBetween>
        <Typography color={main}>IND Cosmetics</Typography>
        <Typography color={medium}>in.sugarcosmetics.com</Typography>
        <Typography color={medium} m="0.5rem 0">
          {" "}
          Your Pathway to stunning and immaculate beauty and made sure your skin
          is exfoliating skin and shining like light.
        </Typography>
      </StyledFlexBetween>
    </WidgetWarpper>
  );
};

export default AddvertWidget;

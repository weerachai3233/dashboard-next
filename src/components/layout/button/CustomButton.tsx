import React from "react";
import { ButtonBase, Stack, Typography } from "@mui/material";

type CustomButtonProps = {
  icon: React.ReactNode; // Accept any React node for the icon
  text: string; // Accept a string for the button text
  onClick?: () => void; // Optional onClick handler
};

const CustomButton: React.FC<CustomButtonProps> = ({ icon, text, onClick }) => {
  return (
    <ButtonBase onClick={onClick}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={2}
        sx={{
          width: "100%",
          border: (theme) => `1px solid ${theme.palette.primary.main}55`,
          borderRadius: 3,
          height: 60,
          padding: "0px 10px",
          transition: "0.3s",
          ":hover": {
            border: (theme) => `1px solid ${theme.palette.primary.main}88`,
            background: (theme) => theme.palette.primary.main + "33",
          },
        }}
      >
        {icon}
        <Typography
          sx={{
            flex: 1,
            textAlign: "left",
            color: (theme) => theme.palette.primary.main,
          }}
        >
          {text}
        </Typography>
      </Stack>
    </ButtonBase>
  );
};

export default CustomButton;

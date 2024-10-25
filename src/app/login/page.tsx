'use client'
import useAuth from "@/hook/useAuth";
import {
  Box,
  Button,
  Card,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const LoginPage = () => {
  const auth = useAuth();

  const handleLogin = () => {
    auth?.login("email", "password");
  };

  return (
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      sx={{
        width: "100vw",
        height: "100vh",
        background: "#deedff",
      }}
    >
      <Card sx={{ width: 500, borderRadius: 3, padding: 3 }}>
        <Box sx={{ marginBottom: 3 }}>
          <img
            src={"/logo/full-logo.png"}
            style={{
              height: 50,
              objectFit: "contain",
            }}
          />
        </Box>
        <Stack spacing={2}>
          <Typography variant="h3">Sign in</Typography>

          <Box>
            <Typography>Email</Typography>
            <TextField fullWidth placeholder="your@email.com" />
          </Box>
          <Box>
            <Typography>Password</Typography>
            <TextField fullWidth placeholder="******" />
          </Box>
          <Button
            fullWidth
            variant="contained"
            sx={{ height: 50 }}
            onClick={handleLogin}
          >
            Sign in
          </Button>
        </Stack>
      </Card>
    </Stack>
  );
};

export default LoginPage;

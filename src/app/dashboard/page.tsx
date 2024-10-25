"use client";
import BarChart from "@/components/charts/BarChart";
import LineChart from "@/components/charts/LineChart";
import PieChart from "@/components/charts/PieChart";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Grid2,
  Card,
  Stack,
} from "@mui/material";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const DashboardPage = () => {
  return (
    <Box
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Grid2 container spacing={5}>
        <Grid2 size={{ xs: 12, xl: 4 }}>
          <Item>
            <Stack alignItems={"center"}>
              <Typography variant="h5">Lorem</Typography>
              <Typography variant="h4">10,000</Typography>
            </Stack>
          </Item>
        </Grid2>
        <Grid2 size={{ xs: 12, xl: 4 }}>
          <Item>
            <Stack alignItems={"center"}>
              <Typography variant="h5">Lorem</Typography>
              <Typography variant="h4">10,000</Typography>
            </Stack>
          </Item>
        </Grid2>
        <Grid2 size={{ xs: 12, xl: 4 }}>
          <Item>
            <Stack alignItems={"center"}>
              <Typography variant="h5">Lorem</Typography>
              <Typography variant="h4">10,000</Typography>
            </Stack>
          </Item>
        </Grid2>
        <Grid2 size={{ xs: 12, xl: 8 }}>
          <Item>
            <BarChart
              data={[12, 19, 3, 5, 2, 3]}
              labels={["Red", "Blue", "Yellow", "Green", "Purple", "Orange"]}
              legend={{ display: true, position: "top", align: "center" }}
            />
          </Item>
        </Grid2>
        <Grid2 size={{ xs: 12, xl: 4 }}>
          <Item>
            <PieChart
              data={[10, 20, 30, 40]}
              labels={["A", "B", "C", "D"]}
              legend={{ display: true, position: "top", align: "center" }}
            />
          </Item>
        </Grid2>
        <Grid2 size={{ xs: 12, xl: 12 }}>
          <Item>
            <LineChart
              data={[12, 19, 3, 5, 2, 3]}
              labels={["January", "February", "March", "April", "May", "June"]}
              legend={{ display: true, position: "top", align: "center" }}
            />
          </Item>
        </Grid2>
      </Grid2>
    </Box>
  );
};

const Item = styled(Box)`
  height: 100%;
  padding: 10px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
`;

export default DashboardPage;

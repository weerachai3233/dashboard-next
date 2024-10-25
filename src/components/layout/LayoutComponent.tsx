import React, { ReactNode, useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  ButtonBase,
  Collapse,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useRouter } from "next/navigation";
import navigation from "./navigation";
import {
  Delete,
  ExpandLess,
  ExpandMore,
  Logout,
  Person,
  Settings,
} from "@mui/icons-material";
import CustomButton from "./button/CustomButton";
import useAuth from "@/hook/useAuth";

const drawerWidth = 300;

type Props = {
  children: ReactNode;
};

const LayoutComponent = (props: Props) => {
  const auth = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<boolean[]>([]);
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleGroupClick = (index: number) => {
    let groups = [...openGroup];
    groups[index] = !groups[index];
    setOpenGroup(groups);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {navigation.map((group, index) => (
          <React.Fragment key={index}>
            {/* แสดงหัวข้อกลุ่ม */}
            <ListItemButton
              onClick={() => {
                if (group?.path) {
                  router.replace(group.path);
                }
                handleGroupClick(index);
              }}
            >
              <ListItemText primary={group.title} sx={{ fontWeight: "bold" }} />
              {group.children ? (
                openGroup[index] ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )
              ) : null}
            </ListItemButton>
            {group.children && (
              <Collapse in={openGroup[index]} timeout="auto" unmountOnExit>
                {group.children.map((item, childIndex) => (
                  <ListItemButton
                    key={childIndex}
                    onClick={() => {
                      if (item?.path) {
                        router.replace(item.path);
                      }
                    }}
                    sx={{ pl: 4 }}
                  >
                    <ListItemText primary={item.title} />
                  </ListItemButton>
                ))}
              </Collapse>
            )}
            {/* <Divider /> */}
          </React.Fragment>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          background: "white",
          zIndex: 10000,
          width: "100%",
        }}
      >
        <Toolbar>
          <Stack direction={"row"} sx={{ width: "100%" }}>
            <IconButton
              color="primary"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            <ButtonBase
              onClick={() => {
                router.replace("/dashboard");
              }}
            >
              <img
                src={"/logo/full-logo.png"}
                style={{
                  height: 46,
                  objectFit: "contain",
                  cursor: "pointer",
                }}
              />
            </ButtonBase>

            <Box sx={{ flex: 1 }} />
            <IconButton
              sx={{
                border: "1px solid lightgray",
                width: 40,
                height: 40,
                borderRadius: 4,
              }}
              onClick={handleMenuToggle}
            >
              <Settings
                sx={{
                  color: (theme) => theme.palette.primary.main,
                  width: 28,
                  height: 28,
                }}
              />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Drawer
        variant="temporary"
        anchor="right" // Set anchor to right
        open={menuOpen}
        onClose={handleMenuToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          "& .MuiDrawer-paper": {
            width: 340,
            borderRadius: "20px 0px 0px 20px",
          },
          zIndex: 10000,
        }}
      >
        <Stack sx={{ padding: 2, width: "100%" }} spacing={0.5}>
          <Stack alignItems={"center"} spacing={1}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
              }}
            />
            <Typography>Full Name</Typography>
          </Stack>
          <Stack sx={{ height: 30 }} justifyContent={"center"}>
            <Divider />
          </Stack>
          <CustomButton
            icon={
              <Person
                sx={{
                  width: 40,
                  height: 40,
                  color: (theme) => theme.palette.primary.main,
                }}
              />
            }
            text="Profile"
          />
          <CustomButton
            icon={
              <Logout
                sx={{
                  width: 40,
                  height: 40,
                  color: (theme) => theme.palette.primary.main,
                }}
              />
            }
            text="Logout"
            onClick={auth?.logout}
          />
        </Stack>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
};

export default LayoutComponent;

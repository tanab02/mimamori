"use client";

import React, { useEffect, useRef } from "react";
import { useState } from "react";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import firebaseApp from "../app/firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import ChecklistIcon from "@mui/icons-material/Checklist";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: "#29b6f6",
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export default function Applayout() {
  const auth = getAuth(firebaseApp);
  const theme = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUsername(user.displayName || "");
      } else {
        setIsLoggedIn(false);
        setUsername("");
      }
    });
    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    const auth = getAuth(firebaseApp);

    try {
      await signOut(auth);
      console.log("ログアウト成功");
      setIsLoggedIn(false);

      localStorage.removeItem("isLoggedIn");

      window.location.href = "/nextcam";
    } catch (error) {
      console.error("ログアウトエラー", error);
    }
  };

  const gestclick = () => {
    window.location.href = "/login";
  };
  const homeclick = () => {
    window.location.href = "/nextcam";
  };
  const items = [
    { text: "Home", icon: <HomeIcon />, path: "/" },
    { text: "slider", icon: <ColorLensIcon />, path: "/nextpage" },
    { text: "step", icon: <ChecklistIcon />, path: "/step" },
  ];
  const draweropen = () => {
    setOpen(true);
  };
  const drawerclose = () => {
    setOpen(false);
  };

  const handleDeveloperPageClick = () => {
    // ログインしている場合に開発者ページに遷移する
    if (isLoggedIn) {
      window.location.href = "/developer"; // 開発者ページのURLに変更する
    }
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              見守りカメラアプリ
            </Typography>
            {isLoggedIn ? (
              <>
                <Typography variant="h6" component="div" sx={{ mr: 2 }}>
                  開発者様
                </Typography>
              </>
            ) : (
              <Typography variant="h6" component="div" sx={{ mr: 2 }}>
                ゲスト
              </Typography>
            )}
            <IconButton
              color="inherit"
              aria-label="open"
              edge="end"
              onClick={draweropen}
              sx={{ ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
            },
          }}
          variant="persistent"
          anchor="right"
          open={open}
          onClick={drawerclose}
        >
          <DrawerHeader>
            <IconButton onClick={drawerclose}>
              {theme.direction === "rtl" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <Button color="inherit" onClick={homeclick}>
            <HomeIcon />
            home
          </Button>
          {isLoggedIn ? (
            <>
              <Button color="inherit" onClick={handleLogout}>
                <LogoutIcon />
                logout
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={gestclick}>
              <LoginIcon />
              login
            </Button>
          )}
          <Divider />
        </Drawer>
      </Box>
    </div>
  );
}

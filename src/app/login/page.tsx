"use client";

import React, { useState, useEffect } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  Button,
  TextField,
  Typography,
  Container,
  CssBaseline,
} from "@mui/material";
import firebaseApp from "../firebase";

const Style = {
  backgroundColor: "#bdbdbd",
  color: "white",
  width: "50%",
};

const color = {
  color: "black",
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    // Load next/router dynamically to avoid server-side usage
    import("next/router").then((nextRouter) => {
      const router = nextRouter.default;

      const auth = getAuth(firebaseApp);
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("ユーザーがログインしています", user);
          setIsLoggedIn(true);

          // 特定の条件に基づいてページ遷移
          if (user.email === "特定のユーザーのメールアドレス") {
            router.push("/nextcam");
          }
        } else {
          console.log("ユーザーがログアウトしました");
          setIsLoggedIn(false);
        }
      });

      return () => unsubscribe();
    });
  }, []);

  const handleLogin = async () => {
    try {
      setLoginError("");
      const auth = getAuth(firebaseApp);
      await signInWithEmailAndPassword(auth, email, password);

      // ログイン成功後の処理
      const user = auth.currentUser;
      if (user) {
        console.log("ログイン成功", user);

        // Load next/router dynamically to avoid server-side usage
        window.location.href = "/administrator";

        // ログイン情報を保存
        localStorage.setItem("isLoggedIn", "true");
      }
    } catch (error) {
      console.error("ログインエラー", error);

      setLoginError(
        "ログインに失敗しました。ユーザー名またはパスワードを確認してください。"
      );
    }
  };

  const handleLogout = async () => {
    const auth = getAuth(firebaseApp);

    try {
      await signOut(auth);
      console.log("ログアウト成功");
      setIsLoggedIn(false);

      // ログイン情報をクリア
      localStorage.removeItem("isLoggedIn");

      // Load next/router dynamically to avoid server-side usage

      // ログアウト後、ログインページに遷移
    } catch (error) {
      console.error("ログアウトエラー", error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div style={{ ...color, marginTop: "10px", marginBottom: "10px" }}>
        <>
          <Typography style={color} component="h1" variant="h5">
            管理者用ログイン
          </Typography>
          <form>
            <TextField
              style={Style}
              margin="normal"
              fullWidth
              id="email"
              label="Email アドレス"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              style={Style}
              margin="normal"
              fullWidth
              name="password"
              label="パスワード"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleLogin}
              style={color}
            >
              ログイン
            </Button>
            {loginError && (
              <Typography variant="body2" color="error">
                {loginError}
              </Typography>
            )}
          </form>
        </>
      </div>
    </Container>
  );
};

export default Login;

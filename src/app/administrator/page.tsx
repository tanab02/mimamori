// pages/administrator.js
"use client";

import React, { useEffect, useState } from "react";
import router from "next/router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "../firebase";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

// データの型定義
type DataLister = {
  address: string;
  name: string;
  details: string;
  timestamp: string;
};

// データリストの型定義
type DataList = DataLister[];

const Administrator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dataList, setDataList] = useState<DataList>([]);

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);

        // 仮のGETリクエスト。実際のリクエストは適切なものに置き換えてください。
        fetch("http://localhost:8000/dataList")
          .then((response) => response.json())
          .then((data) => setDataList(data))
          .catch((error) => console.error("Error fetching data:", error));
      } else {
        window.location.href = "/login";
        setIsLoggedIn(false);
        // ログアウトの状態であれば"/login"画面に戻す
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <div>
      {isLoggedIn ? (
        <>
          <h1>開発者用ページ</h1>
          <div>
            {dataList.map((data, index) => (
              <Card
                key={index}
                style={{ margin: "10px", backgroundColor: "white" }}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    component="div"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {data.details}
                  </Typography>
                  <Typography
                    variant="h6"
                    component="div"
                    color="textSecondary"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {data.address}
                  </Typography>
                  <Typography
                    variant="h6"
                    component="div"
                    color="textSecondary"
                  >
                    {data.name}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    {new Date(data.timestamp).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <p>Redirecting to login...</p>
      )}
    </div>
  );
};

export default Administrator;

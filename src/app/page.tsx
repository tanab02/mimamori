"use client";

import { useState, useEffect } from "react";

const Photo = () => {
  const [imageUrl, setImageUrl] = useState("http://192.168.100.84/photo");

  useEffect(() => {
    const intervalId = setInterval(() => {
      // 1秒ごとに画像のURLを更新
      setImageUrl("http://192.168.100.84/photo?" + new Date().getTime());
    }, 1000);

    // コンポーネントがアンマウントされたときにインターバルをクリア
    return () => clearInterval(intervalId);
  }, []); // 空の依存リストを渡して初回のみ実行されるようにする

  return (
    <div>
      <h1>Photo</h1>
      <img src={imageUrl} alt="Photo" />
    </div>
  );
};

export default Photo;

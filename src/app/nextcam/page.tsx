"use client";

import Buttonmqtt from "@/components/Buttonmqtt";
import Inputmodal from "@/components/Inputmodal";
import Httpslider from "@/components/Httpslider";
import { useState, useEffect } from "react";

const Photo = () => {
  const [imageUrl, setImageUrl] = useState("http://192.168.100.64/photo");

  useEffect(() => {
    const intervalId = setInterval(() => {
      // 1秒ごとに画像のURLを更新
      setImageUrl("http://192.168.100.64/photo?" + new Date().getTime());
    }, 1000);

    // コンポーネントがアンマウントされたときにインターバルをクリア
    return () => clearInterval(intervalId);
  }, []); // 空の依存リストを渡して初回のみ実行されるようにする

  return (
    <div className="flex-auto">
      {/* width と height を追加して画像のサイズを変更 */}
      <img
        style={{ transform: "scaleY(-1)", width: "50%", height: "50%" }}
        src={imageUrl}
        alt="Photo"
      />
      <Httpslider></Httpslider>
      <Inputmodal></Inputmodal>
    </div>
  );
};

export default Photo;

import * as React from "react";
import { useState } from "react";
import { Slider } from "@mui/material";

export default function HttpSlider() {
  const [sliderValue, setSliderValue] = useState<number>(30);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setSliderValue(newValue as number);

    // もし前の遅延があればクリア
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    // 1秒後にPOST
    const id = setTimeout(() => {
      handlePostSliderValue(newValue as number);
    }, 1000);

    // timeoutId を保存しておく
    setTimeoutId(id);
  };

  const handlePostSliderValue = (value: number) => {
    const apiUrl = "http://localhost:8000/";

    const postData = {
      value: value,
    };

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Slider
        aria-label="Temperature"
        value={sliderValue}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        step={10}
        marks
        min={0}
        max={180}
        style={{ width: "80%" }}
      />
    </div>
  );
}

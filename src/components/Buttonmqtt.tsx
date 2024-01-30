import * as React from "react";
import Button from "@mui/material/Button";

export default function Buttonmqtt() {
  const whiteButtonStyle = {
    backgroundColor: "white",
    color: "black",
    width: "50%",
  };

  const lightclick = () => {
    fetch("http://localhost:8000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key1: "light",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const Reftclick = () => {
    fetch("http://localhost:8000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key2: "reft",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <Button style={whiteButtonStyle} onClick={lightclick}>
        ←
      </Button>
      <Button style={whiteButtonStyle} onClick={Reftclick}>
        →
      </Button>
    </div>
  );
}

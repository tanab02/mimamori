import { Button } from "@mui/material";
import router from "next/router";

export default function Loginbutton() {
  const routerlogin = () => {
    router.push("/login");
  };
  return (
    <div>
      <Button onClick={routerlogin}></Button>
    </div>
  );
}

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useState } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const red = {
  backgroundColor: "red",
  color: "black",
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const [reportDetails, setReportDetails] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleReport = async () => {
    // 通報データの作成
    const reportData = {
      details: reportDetails,
      address: address,
      name: name,
      // 他に必要なデータがあればここで追加
    };

    try {
      // 通報データを指定されたURLにPOST
      await axios.post("http://localhost:8000/aa", reportData);

      // 通報ダイアログを閉じる
      handleClose();
    } catch (error) {
      console.error("通報エラー:", error);
      // エラー処理を追加する場合はここで行う
    }
  };

  return (
    <div>
      <div className="flex justify-end">
        <Button style={red} onClick={handleOpen} size="large">
          通報
        </Button>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ color: "black" }}
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ marginBottom: 2 }}
          >
            通報
          </Typography>
          <TextField
            id="outlined-multiline-static"
            label="通報する内容を記載"
            multiline
            rows={4}
            value={reportDetails}
            onChange={(e) => setReportDetails(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="住所"
            variant="outlined"
            margin="normal"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="氏名"
            variant="outlined"
            margin="normal"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button onClick={handleReport}>通報</Button>
        </Box>
      </Modal>
    </div>
  );
}

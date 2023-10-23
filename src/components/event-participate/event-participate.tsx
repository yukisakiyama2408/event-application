import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useState } from "react";

const EventParitipate: React.FC<any> = ({ eventId, userId }) => {
  const router = useRouter();

  const participateEvent = async (eventId: string, userId: string) => {
    await supabase.from("event_participate").insert({
      participated_event_id: eventId,
      participating_account_id: userId,
    });
  };

  const handleParticipateEvent = async (e: any) => {
    await participateEvent(eventId, userId);
    router.push("/event");
  };
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        参加する
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"参加しますか?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            無断欠席はお控えください
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleParticipateEvent} autoFocus>
            はい
          </Button>
          <Button onClick={handleClose}>いいえ</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EventParitipate;

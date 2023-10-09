import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { addEvent } from "../../utils/supabaseFunction";
import { redirect, useRouter } from "next/navigation";
import dayjs from "dayjs";

const EventForm = () => {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>();
  const [capacity, setCapacity] = useState<string>("");
  const handleAddEvent = async (e: any) => {
    e.preventDefault();
    await addEvent(title, description, capacity, date);
    router.push("/event");
  };

  return (
    <>
      <div>
        <Box component="form" onSubmit={(e) => handleAddEvent(e)}>
          <TextField
            type="text"
            name="title"
            placeholder="イベントのタイトル"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            type="text"
            name="description"
            placeholder="イベントの詳細"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            type="date"
            name="date"
            placeholder="イベントの実施日"
            // value={date}
            value={dayjs(date).format("YYYY-MM-DD")}
            onChange={(e) => setDate(new Date(e.target.value))}

            // onChange={(e) => setDate(dayjs(e.target.value).toDate)}
          />
          <TextField
            type="text"
            name="capacity"
            placeholder="イベントの定員"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />
          <div>
            <Button variant="contained" type="submit">
              登録
            </Button>
          </div>
        </Box>
      </div>
    </>
  );
};

export default EventForm;

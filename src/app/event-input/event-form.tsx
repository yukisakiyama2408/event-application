import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { DateField } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { addEvent } from "../../utils/supabaseFunction";
import { useRouter } from "next/navigation";
const EventForm = () => {
  const router = useRouter();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState(new Date());
  const [capacity, setCapacity] = useState<string>("");
  const handleAddEvent = async (e: any) => {
    e.preventDefault();
    console.log("aa");
    await addEvent(title, description, capacity, date);
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
          {/* <DatePicker
            label="Controlled picker"
            value={date}
            onChange={(newDate) => setDate(newDate)}
          /> */}
          {/* <TextField
            type="date"
            id="start"
            name="trip-start"
            value={date}
            // onChange={() => {
            //   setDate(v);
            // }}
          /> */}
          {/* <DateField value={date} onChange={(newValue) => setDate(dayjs(newValue).format)} /> */}
          <TextField
            type="date"
            name="date"
            placeholder="イベントの実施日"
            value={date}
            onChange={(e) => setDate(new Date(Date.parse(e.target.value)))}
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

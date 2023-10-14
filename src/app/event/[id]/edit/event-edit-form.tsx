import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { EditEvent } from "@/utils/supabaseFunction";
import { Box, TextField, Button } from "@mui/material";
import { supabase } from "@/utils/supabase";
import Link from "next/link";
import dayjs from "dayjs";

const EventEditForm = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;
  const [event, setEvent] = useState<any>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>();
  const [capacity, setCapacity] = useState<string>("");
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data: event, error } = await supabase
          .from("events")
          .select()
          .eq("id", id);
        setTitle(event && event[0].title);
        setDescription(event && event[0].description);
        setDate(event && event[0].date);
        setCapacity(event && event[0].capacity);

        if (error) {
          throw error;
        }
        setEvent(event);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchEvent();
  }, []);

  const handleEditEvent = async (e: any, id: any) => {
    e.preventDefault();
    await EditEvent(title, description, capacity, date, id);
    router.push("/event");
  };
  return (
    <>
      <div>
        <Box component="form" onSubmit={(e) => handleEditEvent(e, id)}>
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
            <div>
              <Button variant="contained" type="submit">
                登録
              </Button>
            </div>
            <div>
              <Button variant="text">
                <Link href="/event">戻る</Link>
              </Button>
            </div>
          </div>
        </Box>
      </div>
    </>
  );
};
export default EventEditForm;

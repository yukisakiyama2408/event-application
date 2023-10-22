import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { EditEvent } from "@/utils/supabaseFunction";
import {
  Box,
  TextField,
  Button,
  Container,
  Grid,
  Checkbox,
  Typography,
} from "@mui/material";
import { supabase } from "@/utils/supabase";
import Link from "next/link";
import dayjs from "dayjs";
import GlobalHeader from "@/components/globalHeader";

const EventEditForm = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;
  const [event, setEvent] = useState<any>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [start_date, setStart_Date] = useState<Date | undefined>();
  const [start_time, setStart_time] = useState<string>("");
  const [end_date, setEnd_Date] = useState<Date | undefined>();
  const [end_time, setEnd_time] = useState<string>("");
  const [capacity, setCapacity] = useState<string>("");
  const [host_id, setHost_id] = useState<string>("");
  const [is_published, setIs_Published] = useState<boolean>();
  const [place, setPlace] = useState<string>("");
  const [place_link, setPlace_link] = useState<string>("");
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data: event, error } = await supabase
          .from("events")
          .select()
          .eq("id", id);
        setTitle(event && event[0].title);
        setDescription(event && event[0].description);
        setHost_id(event && event[0].host_id);
        setStart_Date(event && event[0].start_date);
        setStart_time(event && event[0].start_time);
        setEnd_Date(event && event[0].end_date);
        setEnd_time(event && event[0].end_time);
        setCapacity(event && event[0].capacity);
        setIs_Published(event && event[0].is_published);
        setPlace(event && event[0].place);
        setPlace_link(event && event[0].place_link);
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

  const handleEditEvent = async (
    e: React.FormEvent<HTMLFormElement>,
    id: string | string[]
  ) => {
    e.preventDefault();
    await EditEvent(
      title,
      description,
      capacity,
      start_date,
      start_time,
      end_date,
      end_time,
      host_id,
      is_published,
      place,
      place_link,
      id
    );
    router.push("/event");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIs_Published(event.target.checked);
  };

  return (
    <>
      <div>
        <div>
          <GlobalHeader />
        </div>
        <Container component="main" maxWidth="xs">
          <Typography variant="h4" gutterBottom>
            編集{" "}
          </Typography>
          <Box component="form" onSubmit={(e) => handleEditEvent(e, id)}>
            <Grid item xs={12}>
              <TextField
                type="text"
                fullWidth
                margin="normal"
                name="title"
                label="イベントのタイトル"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                name="description"
                fullWidth
                margin="normal"
                multiline
                label="イベントの詳細"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="date"
                name="date"
                fullWidth
                margin="normal"
                label="イベントの開始日"
                value={dayjs(start_date).format("YYYY-MM-DD")}
                onChange={(e) => setStart_Date(new Date(e.target.value))}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                name="time"
                fullWidth
                margin="normal"
                label="イベント開始時間"
                value={start_time}
                onChange={(e) => setStart_time(e.target.value)}
              />
              {/* <TextField
                type="time"
                name="time"
                placeholder="イベントの実施日"
                value={dayjs(date).format("HH:mm:ss")}
                onChange={(e) => setStart_time(new Date(e.target.value))}
              /> */}
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="date"
                name="date"
                fullWidth
                margin="normal"
                label="イベントの終了日"
                value={dayjs(end_date).format("YYYY-MM-DD")}
                onChange={(e) => setEnd_Date(new Date(e.target.value))}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                name="time"
                fullWidth
                margin="normal"
                label="イベント終了時間"
                value={end_time}
                onChange={(e) => setEnd_time(e.target.value)}
              />
              {/* <TextField
                type="time"
                name="time"
                placeholder="イベントの実施日"
                value={dayjs(date).format("HH:mm:ss")}
                onChange={(e) => setStart_time(new Date(e.target.value))}
              /> */}
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                name="capacity"
                fullWidth
                margin="normal"
                label="イベントの定員"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                name="place"
                fullWidth
                margin="normal"
                label="会場"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                name="place_link"
                fullWidth
                margin="normal"
                label="会場のURL"
                value={place_link}
                onChange={(e) => setPlace_link(e.target.value)}
              />
            </Grid>
            <Checkbox
              checked={is_published}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
            公開する場合はこちらをチェック
            <div>
              <div>
                <Button variant="contained" type="submit">
                  {is_published == true ? <>更新</> : <>非公開に変更</>}
                </Button>
              </div>
              <div>
                <Button variant="text">
                  <Link href="/event">戻る</Link>
                </Button>
              </div>
            </div>
          </Box>
        </Container>
      </div>
    </>
  );
};
export default EventEditForm;

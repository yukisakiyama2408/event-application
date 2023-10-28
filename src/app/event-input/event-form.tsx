"use client";

import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Checkbox,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { publishEvent } from "../../utils/supabaseFunction";
import { useRouter } from "next/navigation";
import Link from "next/link";
import dayjs from "dayjs";
import { Session } from "@supabase/auth-helpers-nextjs";
import { supabase } from "@/utils/supabase";
import GlobalHeader from "@/components/globalHeader";

const EventForm = ({ session }: { session: Session | null }) => {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [start_date, setStart_Date] = useState<Date | undefined>();
  const [start_time, setStart_time] = useState<string>("");
  const [end_date, setEnd_Date] = useState<Date | undefined>();
  const [end_time, setEnd_time] = useState<string>("");
  const [capacity, setCapacity] = useState<string>("");
  const [host_id, setHost_id] = useState<string>("");
  const [is_published, setIs_Published] = useState<boolean>(false);
  const [place, setPlace] = useState<string>("");
  const [place_link, setPlace_link] = useState<string>("");

  const user = session?.user;
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const { data: users, error } = await supabase
          .from("profiles")
          .select(`id`)
          .eq("id", user?.id)
          .single();
        if (error) {
          throw error;
        }
        setHost_id(users.id);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchUserId();
  }, []);

  console.log(start_time);

  const handlePublishEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await publishEvent(
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
      place_link
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
            イベント登録{" "}
          </Typography>
          <Box component="form" onSubmit={(e) => handlePublishEvent(e)}>
            <Grid item xs={12}>
              <TextField
                label="タイトル"
                fullWidth
                type="text"
                name="title"
                margin="normal"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                name="description"
                label="イベントの詳細"
                fullWidth
                multiline
                margin="normal"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="date"
                name="date"
                label="イベントの開始日"
                fullWidth
                margin="normal"
                value={dayjs(start_date).format("YYYY-MM-DD")}
                onChange={(e) => setStart_Date(new Date(e.target.value))}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="time"
                name="time"
                label="イベント開始時間"
                fullWidth
                margin="normal"
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
                label="イベントの終了日"
                fullWidth
                margin="normal"
                value={dayjs(end_date).format("YYYY-MM-DD")}
                onChange={(e) => setEnd_Date(new Date(e.target.value))}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="time"
                name="time"
                label="イベント終了時間"
                fullWidth
                value={end_time}
                margin="normal"
                onChange={(e) => setEnd_time(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                name="capacity"
                label="イベントの定員"
                fullWidth
                margin="normal"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                name="place"
                label="会場"
                margin="normal"
                fullWidth
                value={place}
                onChange={(e) => setPlace(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                name="place_link"
                label="会場のURL"
                fullWidth
                margin="normal"
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
                  {is_published == true ? <>登録</> : <>下書きを保存</>}
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

export default EventForm;

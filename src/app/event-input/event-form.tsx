"use client";

import { useState, useEffect } from "react";
import { Box, TextField, Button } from "@mui/material";
import { addEvent } from "../../utils/supabaseFunction";
import { useRouter } from "next/navigation";
import Link from "next/link";
import dayjs from "dayjs";
import { Session } from "@supabase/auth-helpers-nextjs";
import { supabase } from "@/utils/supabase";

const EventForm = ({ session }: { session: Session | null }) => {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>();
  const [capacity, setCapacity] = useState<string>("");
  const [host_id, setHost_id] = useState<string>("");

  // const [userId, setUserId] = useState<any>([]);

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

  const handleAddEvent = async (e: any) => {
    e.preventDefault();
    await addEvent(title, description, capacity, date, host_id);
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

export default EventForm;

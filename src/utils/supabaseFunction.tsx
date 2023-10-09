import { supabase } from "./supabase";
import dayjs, { Dayjs } from "dayjs";

export const addEvent = async (
  title: string,
  description: string,
  capacity: string,
  date: Date | undefined
) => {
  await supabase.from("events").insert({
    title: title,
    description: description,
    capacity: capacity,
    date: date,
  });
};

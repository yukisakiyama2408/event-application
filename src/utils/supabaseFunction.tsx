import { supabase } from "./supabase";

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

export const EditEvent = async (
  title: string,
  description: string,
  capacity: string,
  date: Date | undefined,
  id: string
) => {
  await supabase
    .from("events")
    .update({
      title: title,
      description: description,
      capacity: capacity,
      date: date,
    })
    .eq("id", id);
};

export const DeleteEvent = async (id: string) => {
  await supabase.from("events").delete().eq("id", id);
};

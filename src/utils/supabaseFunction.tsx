import { supabase } from "./supabase";

export const publishEvent = async (
  title: string,
  description: string,
  capacity: string,
  date: Date | undefined,
  host_id: string,
  is_published: boolean
) => {
  await supabase.from("events").insert({
    title: title,
    description: description,
    capacity: capacity,
    date: date,
    host_id: host_id,
    is_published: is_published,
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

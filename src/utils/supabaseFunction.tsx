import { supabase } from "./supabase";

export const publishEvent = async (
  title: string,
  description: string,
  capacity: string,
  start_date: Date | undefined,
  start_time: string | undefined,
  end_date: Date | undefined,
  end_time: string | undefined,
  host_id: string,
  is_published: boolean,
  place: string,
  place_link: string
) => {
  await supabase.from("events").insert({
    title: title,
    description: description,
    capacity: capacity,
    start_date: start_date,
    start_time: start_time,
    end_date: end_date,
    end_time: end_time,
    host_id: host_id,
    is_published: is_published,
    place: place,
    place_link: place_link,
  });
};

export const EditEvent = async (
  title: string,
  description: string,
  capacity: string,
  start_date: Date | undefined,
  start_time: string | undefined,
  end_date: Date | undefined,
  end_time: string | undefined,
  host_id: string,
  is_published: boolean | undefined,
  place: string,
  place_link: string,
  id: string | string[]
) => {
  await supabase
    .from("events")
    .update({
      title: title,
      description: description,
      capacity: capacity,
      start_date: start_date,
      start_time: start_time,
      end_date: end_date,
      end_time: end_time,
      host_id: host_id,
      is_published: is_published,
      place: place,
      place_link: place_link,
    })
    .eq("id", id);
};

export const DeleteEvent = async (id: string) => {
  await supabase.from("events").delete().eq("id", id);
};

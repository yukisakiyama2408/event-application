import EventIndex from "./event-index";
import { supabase } from "@/utils/supabase";
import { ReactNode } from "react";

interface Event {
  id: string;
  title: string;
  capacity: number;
  start_date: Date;
  start_time: string;
  end_date: Date;
  end_time: string;
  image_url: string;
  event_participate: {
    length: ReactNode;
    id: string;
  };
}
const Event = async () => {
  type DbResult<T> = T extends PromiseLike<infer U> ? U : never;
  const query = supabase
    .from("events")
    .select(
      `
id,title,capacity,start_date,start_time,end_date,end_time,image_url,
event_participate ( id )`
    )
    .eq("is_published", true);
  const events: DbResult<typeof query> = await query;
  return (
    <>
      <EventIndex eventList={events && events.data} />
    </>
  );
};

export default Event;

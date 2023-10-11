"use client";
import { useParams, useSearchParams } from "next/navigation";
import { supabase } from "@/utils/supabase";
import format from "date-fns/format";

const EventDetail = async () => {
  const searchParams = useSearchParams();
  const params = useParams();
  const id = params?.id;
  const { data: events } = await supabase.from("events").select().eq("id", id);
  console.log(events && events[0].title);
  const event = events && events[0];
  return (
    <>
      <div>
        <div>{event.title}</div>
        <div>{format(new Date(event.date), "MM/dd/yyyy")}</div>
      </div>
    </>
  );
};

export default EventDetail;

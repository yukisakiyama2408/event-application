"use client";
import { useParams, useSearchParams } from "next/navigation";
import { supabase } from "@/utils/supabase";
import format from "date-fns/format";
import Link from "next/link";
import EventEdit from "./edit/page";
const EventDetail = async () => {
  const params = useParams();
  const id = params?.id;

  const { data: events } = await supabase.from("events").select().eq("id", id);
  const event = events && events[0];
  return (
    <>
      <div>
        <div>{event.title}</div>
        <div>{format(new Date(event.date), "MM/dd/yyyy")}</div>
        <Link href="/event/[id]/edit" as={`/event/${event.id}/edit`}>
          編集
        </Link>
      </div>
    </>
  );
};

export default EventDetail;

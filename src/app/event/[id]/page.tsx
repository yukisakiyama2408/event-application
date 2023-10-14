"use client";
import { useParams, useSearchParams } from "next/navigation";
import { supabase } from "@/utils/supabase";
import format from "date-fns/format";
import Link from "next/link";
import { DeleteEvent } from "@/utils/supabaseFunction";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
const EventDetail = async () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const { data: events } = await supabase.from("events").select().eq("id", id);
  const event = events && events[0];

  const handleDelete = async (id: any) => {
    await DeleteEvent(id);
    router.push("/event");
  };
  return (
    <>
      <div>
        <div>{event.title}</div>
        <div>{format(new Date(event.date), "MM/dd/yyyy")}</div>
        <div>
          {" "}
          <Link href="/event/[id]/edit" as={`/event/${event.id}/edit`}>
            編集
          </Link>
        </div>
        <div>
          <Button variant="contained" onClick={() => handleDelete(id)}>
            削除
          </Button>
        </div>
      </div>
    </>
  );
};

export default EventDetail;

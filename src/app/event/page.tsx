"use client";
import { supabase } from "@/utils/supabase";
import Link from "next/link";

const Event = async () => {
  const { data: events } = await supabase.from("events").select();

  return (
    <>
      <div>
        <div>
          {events?.map((event: any) => (
            <div key={event.id}>
              <div>
                {" "}
                <Link href="/event/[id]" as={`/event/${event.id}`}>
                  {event.title}
                </Link>
              </div>
              <div>{event.description}</div>
              <div>{event.date}</div>
              <div>{event.capacity}</div>
            </div>
          ))}
          <Link href="/event-input">イベントを企画する</Link>
        </div>
      </div>
    </>
  );
};

export default Event;

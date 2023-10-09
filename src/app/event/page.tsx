import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Link } from "@mui/material";

const Event = async () => {
  const supabase = createServerComponentClient({ cookies });
  const { data: events } = await supabase.from("events").select();
  console.log(events);

  return (
    <>
      <div>
        <div>
          {events?.map((event: any) => (
            <div>
              <div key={event.id}>{event.title}</div>
              <div key={event.id}>{event.description}</div>
              <div key={event.id}>{event.date}</div>
              <div key={event.id}>{event.capacity}</div>
            </div>
          ))}
          <Link href="/event-input">イベントを企画する</Link>
        </div>
      </div>
    </>
  );
};

export default Event;

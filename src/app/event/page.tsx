import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// import { supabase } from "../../../utils/supabase";
import { cookies } from "next/headers";

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
        </div>
      </div>
    </>
  );
};

export default Event;

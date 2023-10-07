import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Event() {
  const supabase = createServerComponentClient({ cookies });
  const { data: events } = await supabase.from("events").select();
  console.log(events);

  return (
    <>
      <div>
        <div>
          {events?.map((event: any) => (
            <li key={event.id}>{event.title}</li>
          ))}
        </div>
        <div>aa</div>
      </div>
    </>
  );
}

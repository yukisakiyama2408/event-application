import EventDetail from "./event-detail";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

const EventPage = async () => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return (
    <>
      <EventDetail session={session} />
    </>
  );
};

export default EventPage;

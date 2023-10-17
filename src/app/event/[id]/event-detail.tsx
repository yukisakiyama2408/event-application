"use client";
import { useParams } from "next/navigation";
import { supabase } from "@/utils/supabase";
import format from "date-fns/format";
import Link from "next/link";
import { DeleteEvent } from "@/utils/supabaseFunction";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import EventParitipate from "@/components/event-participate/event-participate";
import { useState, useEffect } from "react";
import { Session } from "@supabase/auth-helpers-nextjs";
import ParticipateCancel from "@/components/event-participate-cancel/participate-cancel";
const EventDetail = ({ session }: { session: Session | null }) => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;
  const [events, setEvents] = useState<any>([]);
  const [userId, setUserId] = useState<any>([]);
  const user = session?.user;

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const { data: events, error } = await supabase
          .from("events")
          .select()
          .eq("id", id);
        const { data: users, status } = await supabase
          .from("profiles")
          .select(`id`)
          .eq("id", user?.id)
          .single();
        if (error) {
          throw error;
        }
        setEvents(events);
        setUserId(users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchUserId();
  }, []);
  const event = events && events[0];
  const handleDelete = async (id: any) => {
    await DeleteEvent(id);
    router.push("/event");
  };

  return (
    <>
      <div>
        {event && (
          <div>
            {" "}
            <div>{event.title}</div>
            <div>{format(new Date(event.date), "MM/dd/yyyy")}</div>
            {event.host_id == userId.id && (
              <div>
                <div>
                  <Button variant="contained">
                    <Link
                      href="/event/[id]/edit"
                      as={`/event/${event.id}/edit`}
                    >
                      編集
                    </Link>
                  </Button>
                </div>
                <div>
                  <Button variant="contained" onClick={() => handleDelete(id)}>
                    削除
                  </Button>
                </div>
              </div>
            )}
            <div>
              <EventParitipate eventId={event.id} userId={userId.id} />
            </div>
            <div>
              <ParticipateCancel eventId={event.id} userId={userId.id} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EventDetail;

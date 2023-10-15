"use client";
import { Session } from "@supabase/auth-helpers-nextjs";
import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "next/link";

const MyAccount = ({ session }: { session: Session | null }) => {
  const user = session?.user;
  const userId = user && user.id;
  const [participatedEvent, setParticipatedEvent] = useState<any>([]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data: eventId, error } = await supabase
          .from("event_participate")
          .select(
            `
          participated_event_id, 
          events ( id, title,date,capacity )`
          )
          .eq("participating_account_id", userId);
        if (error) {
          throw error;
        }
        setParticipatedEvent(eventId);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchEvent();
  }, []);
  return (
    <>
      {" "}
      <div>
        <div>参加予定のイベント</div>
        <div>
          {participatedEvent?.map((event: any) => (
            <div key={event.events.id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                  <div>
                    {" "}
                    <Typography gutterBottom variant="h5" component="div">
                      <Link href="/event/[id]" as={`/event/${event.events.id}`}>
                        {event.events.title}
                      </Link>
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      component="div"
                    >
                      <div>{event.events.date}</div>
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      component="div"
                    >
                      <div>
                        <div>{event.events.capacity}</div>
                      </div>
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyAccount;

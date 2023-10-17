"use client";
import { Session } from "@supabase/auth-helpers-nextjs";
import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { Button } from "@mui/material";

const MyAccount = ({ session }: { session: Session | null }) => {
  const user = session?.user;
  const userId = user && user.id;
  const [participatedEvent, setParticipatedEvent] = useState<any>([]);
  const [hostEvent, setHostEvent] = useState<any>([]);

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
        const { data: hostingEvent } = await supabase
          .from("events")
          .select()
          .eq("host_id", userId);
        if (error) {
          throw error;
        }
        setParticipatedEvent(eventId);
        setHostEvent(hostingEvent);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchEvent();
  }, []);
  console.log(hostEvent && hostEvent);
  const hostedEvent = hostEvent && hostEvent;
  console.log(hostedEvent);
  return (
    <>
      {" "}
      <div>
        <div>主催しているイベント</div>
        <div>
          {hostedEvent?.map((event: any) => (
            <div key={event.id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                  <div>
                    {" "}
                    <Typography gutterBottom variant="h5" component="div">
                      <Link href="/event/[id]" as={`/event/${event.id}`}>
                        {event.title}
                      </Link>
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      component="div"
                    >
                      {event.date}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      component="div"
                    >
                      {event.capacity}
                    </Typography>
                    <CardActions>
                      {" "}
                      <Button variant="contained">
                        <Link
                          href="/event/[id]/edit"
                          as={`/event/${event.id}/edit`}
                        >
                          {event.is_published == true ? (
                            <>編集</>
                          ) : (
                            <>下書きを編集</>
                          )}
                        </Link>
                      </Button>
                    </CardActions>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
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
                      {event.events.date}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      component="div"
                    >
                      {event.events.capacity}
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

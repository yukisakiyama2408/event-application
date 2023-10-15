"use client";
import { Session } from "@supabase/auth-helpers-nextjs";
import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Link from "next/link";

const MyAccount = ({ session }: { session: Session | null }) => {
  const user = session?.user;
  const userId = user && user.id;
  const [participatedEventId, setParticipatedEventId] = useState<any>([]);
  const [participatedEvent, setParticipatedEvent] = useState<any>([]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data: eventId, error } = await supabase
          .from("event_participate")
          .select()
          .eq("participating_account_id", userId);
        const { data: event } = await supabase
          .from("events")
          .select()
          .eq("id", participatedEventId);
        if (error) {
          throw error;
        }
        setParticipatedEventId(eventId[0].participated_event_id);
        setParticipatedEvent(event);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchEvent();
  }, []);
  console.log(participatedEventId);
  return (
    <>
      {" "}
      <div>
        <div>参加予定のイベント</div>
        <div>
          {participatedEvent?.map((event: any) => (
            <div key={event.id}>
              <Card sx={{ maxWidth: 345 }}>
                {/* <CardMedia
              sx={{ height: 140 }}
              image="/static/images/cards/contemplative-reptile.jpg"
              title="green iguana"
            /> */}
                <CardContent>
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
                    <div>{event.date}</div>
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    component="div"
                  >
                    <div>
                      <div>{event.capacity}</div>
                    </div>
                  </Typography>
                </CardContent>
                {/* <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions> */}
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyAccount;

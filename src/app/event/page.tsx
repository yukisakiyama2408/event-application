"use client";
import { supabase } from "@/utils/supabase";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import GlobalHeader from "@/components/globalHeader";
const Event = () => {
  const [events, setEvents] = useState<any>([]);
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data: events, error } = await supabase
          .from("events")
          .select(
            `
          id,title,capacity,start_date,start_time,end_date,end_time,
          event_participate ( id )`
          )
          .eq("is_published", true);
        if (error) {
          throw error;
        }
        setEvents(events);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchEvent();
  }, []);
  return (
    <>
      <div>
        <div>
          <GlobalHeader />
        </div>
        <div>
          <Container>
            {events?.map((event: any) => (
              <div key={event.id}>
                <Card sx={{ maxWidth: 345 }}>
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
                      <div>
                        {event.start_date}
                        {event.start_time}-{event.end_date}
                        {event.end_time}
                      </div>
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      component="div"
                    >
                      参加者数：{event.event_participate.length}/
                      {event.capacity}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            ))}
          </Container>
          <Link href="/event-input">イベントを企画する</Link>
        </div>
      </div>
    </>
  );
};

export default Event;

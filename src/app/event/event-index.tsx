"use client";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Container, CardMedia, Stack } from "@mui/material";
import GlobalHeader from "@/components/globalHeader";
import format from "date-fns/format";
import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import { Database } from "../../../database.types";

type Event = Database["public"]["Tables"]["events"]["Row"];
type Participate = Database["public"]["Tables"]["event_participate"]["Row"];
type NestedEvent = Event & { event_participate: Participate };
const EventIndex = () => {
  const [events, setEvents] = useState<Array<Event> | undefined>([]);

  useEffect(() => {
    const fetchEvent = async () => {
      const query = supabase
        .from("events")
        .select(
          "id,title,description,capacity,start_date,start_time,end_date,end_time,host_id,is_published,place,place_link,image_url"
        )
        .eq("is_published", true);
      const { data: events } = await query;
      if (events) {
        setEvents(events);
      }
    };
    fetchEvent();
  }, []);

  console.log(events && events);

  return (
    <>
      <div>
        <div>
          <GlobalHeader />
        </div>
        <div>
          <Container component="main" fixed sx={{ mt: 10 }}>
            <Stack direction="row" spacing={2}>
              {events &&
                events.map((event: Event) => (
                  <div key={event.id}>
                    <Card sx={{ maxWidth: 345 }}>
                      <div>
                        {" "}
                        <CardMedia
                          component="img"
                          sx={{ height: 140 }}
                          image={event.image_url || ""}
                          alt="イベントの表紙"
                        />
                      </div>
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
                            {format(
                              new Date(event.start_date || ""),
                              "yyyy/MM/dd"
                            )}
                            {event.start_time}-{" "}
                            {format(
                              new Date(event.end_date || ""),
                              "yyyy/MM/dd"
                            )}
                            {event.end_time}
                          </div>
                        </Typography>
                      </CardContent>
                    </Card>
                  </div>
                ))}
            </Stack>
            <div>
              {" "}
              <Link href="/event-input">イベントを企画する</Link>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default EventIndex;

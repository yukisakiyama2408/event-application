"use client";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Container, CardMedia, Stack } from "@mui/material";
import GlobalHeader from "@/components/globalHeader";
import format from "date-fns/format";
import { ReactNode } from "react";

interface Event {
  id: string;
  title: string;
  capacity: number;
  start_date: Date;
  start_time: string;
  end_date: Date;
  end_time: string;
  image_url: string;
  event_participate: {
    length: ReactNode;
    id: string;
  };
}

type TypedEvent = {
  eventList: Array<Event>;
};

const EventIndex: React.FC<TypedEvent> = ({ eventList }) => {
  const events = eventList && eventList;

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
                          image={event.image_url}
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
                            {format(new Date(event.start_date), "yyyy/MM/dd")}
                            {event.start_time}-{" "}
                            {format(new Date(event.end_date), "yyyy/MM/dd")}
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

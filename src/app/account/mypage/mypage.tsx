"use client";
import { Session } from "@supabase/auth-helpers-nextjs";
import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { Button, Container, Stack, CardMedia } from "@mui/material";
import { Database } from "../../../../database.types";
import format from "date-fns/format";
import GlobalHeader from "@/components/globalHeader";

type Event = Database["public"]["Tables"]["events"]["Row"];
type Participate = Database["public"]["Tables"]["event_participate"]["Row"];

const MyAccount = ({ session }: { session: Session | null }) => {
  const user = session?.user;
  const userId = user && user.id;
  const [participatedEventId, setParticipatedEventId] = useState<
    Array<Participate> | undefined
  >([]);
  const [participatedEvent, setParticipatedEvent] = useState<
    Array<Event> | undefined
  >([]);

  const [hostEvent, setHostEvent] = useState<Array<Event> | undefined>([]);

  useEffect(() => {
    const fetchEvent = async () => {
      const query = supabase
        .from("event_participate")
        .select("id,participated_event_id,participating_account_id")
        .eq("participating_account_id", userId as string);
      const { data: eventId } = await query;
      if (eventId) {
        setParticipatedEventId(eventId);
      }
      const { data: hostingEvent } = await supabase
        .from("events")
        .select(
          "id,title,description,capacity,start_date,start_time,end_date,end_time,host_id,is_published,place,place_link,image_url"
        )
        .eq("host_id", userId as string);
      if (hostingEvent) {
        setHostEvent(hostingEvent);
      }
      const { data: ParticipatingEvent } = await supabase
        .from("events")
        .select(
          "id,title,description,capacity,start_date,start_time,end_date,end_time,host_id,is_published,place,place_link,image_url"
        )
        .eq("host_id", userId as string);
      if (ParticipatingEvent) {
        setParticipatedEvent(ParticipatingEvent);
      }
    };
    fetchEvent();
  }, []);

  return (
    <>
      <div>
        <GlobalHeader />
      </div>{" "}
      <div>
        <Container component="main" fixed sx={{ mt: 10 }}>
          <Typography gutterBottom variant="h4" component="div">
            主催しているイベント
          </Typography>
          <Stack direction="row" spacing={2}>
            {hostEvent &&
              hostEvent.map((event: Event) => (
                <div key={event.id}>
                  <Card sx={{ maxWidth: 400 }}>
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
                        </div>
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
                    </CardContent>
                  </Card>
                </div>
              ))}
          </Stack>
          <Typography gutterBottom variant="h4" component="div">
            参加予定のイベント{" "}
          </Typography>
          <Stack direction="row" spacing={2}>
            {participatedEvent?.map((event: Event) => (
              <div key={event.id}>
                <Card sx={{ maxWidth: 400 }}>
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
                        {format(new Date(event.start_date || ""), "yyyy/MM/dd")}
                      </div>
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            ))}
          </Stack>
        </Container>
      </div>
    </>
  );
};

export default MyAccount;

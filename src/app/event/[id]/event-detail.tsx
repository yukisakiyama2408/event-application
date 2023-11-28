"use client";
import { useParams } from "next/navigation";
import { supabase } from "@/utils/supabase";
import format from "date-fns/format";
import Link from "next/link";
import { DeleteEvent } from "@/utils/supabaseFunction";
import { useRouter } from "next/navigation";
import { Button, Container, Typography } from "@mui/material";
import EventParitipate from "@/components/event-participate/event-participate";
import { useState, useEffect } from "react";
import { Session } from "@supabase/auth-helpers-nextjs";
import ParticipateCancel from "@/components/event-participate-cancel/participate-cancel";
import GlobalHeader from "@/components/globalHeader";
import { Database } from "../../../../database.types";

type Event = Database["public"]["Tables"]["events"]["Row"];
type User = Database["public"]["Tables"]["profiles"]["Row"];

const EventDetail = ({ session }: { session: Session | null }) => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;
  const [events, setEvents] = useState<Array<Event> | null>([]);
  const [profiles, setProfiles] = useState<User | null>(null);
  const [participates, setParticipates] = useState<any>();
  const user = session?.user;

  useEffect(() => {
    const fetchUserId = async () => {
      const query = supabase
        .from("events")
        .select(
          "id,title,description,capacity,start_date,start_time,end_date,end_time,place,place_link,host_id,is_published,image_url"
        )
        .eq("id", id);
      const { data: events } = await query;
      if (events) {
        setEvents(events);
      }
      const queryA = supabase
        .from("profiles")
        .select("avatar_url,full_name,id,updated_at,username,website")
        .eq("id", user?.id as string)
        .single();
      const { data: profiles } = await queryA;

      if (profiles) {
        setProfiles(profiles);
      }
      const queryB = supabase
        .from("event_participate")
        .select("id,participated_event_id,participating_account_id")
        .eq("participating_account_id", user?.id as string);
      // .single();
      const { data: participates } = await queryB;

      if (participates) {
        setParticipates(participates);
      }
    };
    fetchUserId();
  }, []);
  const event = events && events[0];
  const handleDelete = async (id: string) => {
    await DeleteEvent(id);
    router.push("/event");
  };

  return (
    <>
      <div>
        <div>
          <GlobalHeader />
        </div>
        <Container component="main" maxWidth="sm" sx={{ mt: 10 }}>
          {" "}
          {event && (
            <div>
              <div>
                <img src={event.image_url || ""} />
              </div>
              <Typography variant="h3" gutterBottom>
                {event.title}
              </Typography>
              <div>
                {event.start_date == event.end_date ? (
                  <Typography variant="h6" gutterBottom>
                    {format(new Date(event.start_date || ""), "yyyy年MM月dd日")}
                    {event.start_time}-{event.end_time}
                  </Typography>
                ) : (
                  <Typography variant="h6" gutterBottom>
                    {" "}
                    開始時間：
                    {format(new Date(event.start_date || ""), "yyyy年MM月dd日")}
                    {event.start_time}- 終了時間：
                    {format(new Date(event.end_date || ""), "yyyy年MM月dd日")}
                    {event.end_time}
                  </Typography>
                )}
              </div>
              {event.place_link ? (
                <Typography variant="h6" gutterBottom>
                  @場所：<Link href={event.place_link}> {event.place}</Link>
                </Typography>
              ) : (
                <Typography variant="h6" gutterBottom>
                  @{event.place}
                </Typography>
              )}
              <Typography variant="body1" gutterBottom>
                {event.description}
              </Typography>
              {event.host_id == profiles?.id && (
                <div>
                  <div>
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
                  </div>
                  <div>
                    <Button
                      variant="contained"
                      onClick={() => handleDelete(id as string)}
                    >
                      削除
                    </Button>
                  </div>
                </div>
              )}
              <div>
                {participates && participates.length > 0 ? (
                  <div>
                    <ParticipateCancel
                      eventId={event.id}
                      userId={profiles && profiles.id}
                    />
                  </div>
                ) : (
                  <div>
                    <EventParitipate
                      eventId={event.id}
                      userId={profiles && profiles.id}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </Container>{" "}
      </div>
    </>
  );
};

export default EventDetail;

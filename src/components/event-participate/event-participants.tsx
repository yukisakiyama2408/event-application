"use client";
import { supabase } from "@/utils/supabase";
import { useState, useEffect } from "react";
import { Database } from "../../../database.types";

type User = Database["public"]["Tables"]["profiles"]["Row"];
type Participate = Database["public"]["Tables"]["event_participate"]["Row"];

const EventParticipant = ({ Id }: { Id: string | null | undefined }) => {
  const [participants, setParticipants] = useState<Array<
    Participate & { profiles: User }
  > | null>([]);

  useEffect(() => {
    const fetchUserId = async () => {
      const query = supabase
        .from("event_participate")
        .select(
          `id,participated_event_id,participating_account_id,profiles(avatar_url,full_name,id,updated_at,username,website)`
        )
        .eq("participated_event_id", Id as string)
        .returns<Array<Participate & { profiles: User }>>();
      const { data: members } = await query;
      if (members) {
        setParticipants(members);
      }
    };
    fetchUserId();
  }, []);
  const member = participants && participants[0];
  return (
    <>
      {" "}
      <div>{member && <div>{member.profiles.full_name}</div>}</div>
    </>
  );
};

export default EventParticipant;

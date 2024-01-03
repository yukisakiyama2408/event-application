"use client";
import { supabase } from "@/utils/supabase";
import { useState, useEffect } from "react";
import { Database } from "../../../database.types";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

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
          `id,participated_event_id,participating_account_id,participate_comment,profiles(avatar_url,full_name,id,updated_at,username,website)`
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
  console.log(member);
  return (
    <>
      <div>
        <Typography variant="h5" gutterBottom>
          参加者
        </Typography>
      </div>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <ListItemText
          primary={member && member.profiles.full_name}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {member && member.participate_comment}
              </Typography>
            </React.Fragment>
          }
        />
        <Divider variant="inset" component="li" />
      </List>
    </>
  );
};

export default EventParticipant;

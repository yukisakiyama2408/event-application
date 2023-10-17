import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

const EventParitipate: React.FC<any> = ({ eventId, userId }) => {
  const router = useRouter();
  const participateEvent = async (eventId: string, userId: string) => {
    await supabase.from("event_participate").insert({
      participated_event_id: eventId,
      participating_account_id: userId,
    });
  };

  const handleParticipateEvent = async (e: any) => {
    await participateEvent(eventId, userId);
    router.push("/event");
  };
  return (
    <>
      {" "}
      <Button variant="contained" onClick={handleParticipateEvent}>
        参加する
      </Button>
    </>
  );
};

export default EventParitipate;

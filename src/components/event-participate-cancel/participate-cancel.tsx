import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

const ParticipateCancel: React.FC<any> = ({ eventId, userId }) => {
  const router = useRouter();
  const CancelParticipate = async (eventId: string, userId: string) => {
    await supabase.from("event_participate").delete().match({
      participating_account_id: userId,
      participated_event_id: eventId,
    });
  };
  const handleParticipateCancel = async (e: any) => {
    await CancelParticipate(eventId, userId);
    router.push("/event");
  };
  return (
    <>
      {" "}
      <Button variant="contained" onClick={handleParticipateCancel}>
        参加をやめる
      </Button>
    </>
  );
};

export default ParticipateCancel;

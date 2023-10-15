import { useState } from "react";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
const Example = ({ session }: { session: Session | null }) => {
  const supabase = createClientComponentClient();
  console.log(session);
  return <>aaa</>;
};

export default Example;

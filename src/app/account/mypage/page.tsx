import MyAccount from "./mypage";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

const MyPage = async () => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return (
    <>
      <MyAccount session={session} />
    </>
  );
};

export default MyPage;

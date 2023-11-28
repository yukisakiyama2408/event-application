"use client";
import { useCallback, useEffect, useState } from "react";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import GlobalHeader from "@/components/globalHeader";
import {
  Box,
  TextField,
  Button,
  Checkbox,
  Container,
  Grid,
  Typography,
} from "@mui/material";

export default function AccountForm({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);
  const user = session?.user;
  console.log(session);
  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`full_name, username, website, avatar_url`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setFullname(data.full_name);
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string | null;
    fullname: string | null;
    website: string | null;
    avatar_url: string | null;
  }) {
    try {
      setLoading(true);

      let { error } = await supabase.from("profiles").upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {" "}
      <div>
        <div>
          <GlobalHeader />
        </div>
        <Container component="main" maxWidth="xs" fixed sx={{ mt: 10 }}>
          <div className="form-widget">
            <div>
              <Grid item xs={12}>
                <TextField
                  id="email"
                  type="text"
                  label="email"
                  fullWidth
                  name="email"
                  margin="normal"
                  value={session?.user.email}
                  disabled
                />
              </Grid>
            </div>
            <div>
              <Grid item xs={12}>
                <TextField
                  id="fullName"
                  type="text"
                  label="名前"
                  fullWidth
                  name="fullName"
                  margin="normal"
                  value={fullname || ""}
                  onChange={(e) => setFullname(e.target.value)}
                />
              </Grid>
            </div>
            <div>
              <Grid item xs={12}>
                <TextField
                  id="username"
                  type="text"
                  label="username"
                  fullWidth
                  name="fullName"
                  margin="normal"
                  value={username || ""}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>
            </div>
            <div>
              <Grid item xs={12}>
                <TextField
                  id="website"
                  type="url"
                  label="website"
                  fullWidth
                  name="website"
                  margin="normal"
                  value={website || ""}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </Grid>
            </div>

            <div>
              <Button
                variant="contained"
                onClick={() =>
                  updateProfile({ fullname, username, website, avatar_url })
                }
                disabled={loading}
              >
                {loading ? "Loading ..." : "Update"}
              </Button>
            </div>
            <div>
              <form action="/auth/signout" method="post">
                <Button variant="contained" type="submit">
                  Sign out
                </Button>
              </form>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

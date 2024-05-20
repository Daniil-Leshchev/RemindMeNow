import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import React from 'react';
import { Tables } from "@/lib/database.types";

type AuthData = {
  session: Session | null,
  profile: Tables<'profiles'> | null,
  loading: boolean
};

const AuthContext = createContext<AuthData>({
  session: null,
  profile: null,
  loading: true
});

export default function AuthProvider({children} : PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Tables<'profiles'> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: {session} } = await supabase.auth.getSession();
      setSession(session);

      if (session) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        setProfile(data || null);
      }

      setLoading(false);
    };

    fetchSession();
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, [])

  return (
    <AuthContext.Provider value={{session, profile, loading}}>{ children }</AuthContext.Provider>
  )
};

export const useAuth = () => useContext(AuthContext);
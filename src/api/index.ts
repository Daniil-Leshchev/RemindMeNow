import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";

export const useAllTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data, error } = await
        supabase
        .from('tasks')
        .select('*');
      if (error)
        throw new Error(error.message);
      return data;
    }
  });
}

export const useMyTasks = () => {
  const { session } = useAuth();
  const userId = session?.user.id;

  return useQuery({
    queryKey: ['tasks', { userId }],
    queryFn: async () => {
      if (!userId)
        return null;
      const { data, error } = await
        supabase
        .from('tasks')
        .select('*')
        .eq('user_id', userId)
        .order('startDate');
      if (error)
        throw new Error(error.message);
      return data;
    }
  });
}
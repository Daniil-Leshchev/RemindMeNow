import { supabase } from "@/lib/supabase";
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
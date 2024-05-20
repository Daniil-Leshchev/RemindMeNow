import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { useCurrentDay } from "@/providers/CurrentDayProvider";
import moment from "moment";

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

  const { currentDay } = useCurrentDay();
  const nextDay = new Date();
  nextDay.setDate(currentDay.getDate() + 1);
  nextDay.setHours(0, 0, 0, 0);

  const formatDate = (date: Date) => {
    return moment(date).format('yyyy-MM-DD');
  }

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
        .gte('startDate', formatDate(currentDay))
        .lte('startDate', formatDate(nextDay))
        .order('startDate');
      if (error)
        throw new Error(error.message);
      return data;
    }
  });
}
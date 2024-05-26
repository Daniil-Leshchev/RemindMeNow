import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { useCurrentDay } from "@/providers/CurrentDayProvider";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";

const formatToDate = (date: Date) => {
  return moment(date).format('yyyy-MM-DD');
}

export const useTodayTasks = () => {
  const { session } = useAuth();
  const userId = session?.user.id;

  const currentDay = new Date();
  currentDay.setHours(0, 0, 0, 0);
  
  const nextDay = new Date();
  nextDay.setDate(currentDay.getDate() + 1);
  nextDay.setHours(0, 0, 0, 0);

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
        .gte('startDate', formatToDate(currentDay))
        .lte('startDate', formatToDate(nextDay))
        .order('startDate');
      if (error)
        throw new Error(error.message);
      return data;
    }
  });
}

export const useCurrentDayTasks = () => {
  const { currentDay } = useCurrentDay();
  const { session } = useAuth();
  const userId = session?.user.id;

  const nextDay = new Date();
  nextDay.setDate(currentDay.getDate() + 1);
  nextDay.setHours(0, 0, 0, 0);

  return useQuery({
    queryKey: ['tasks', { userId }, 'startDate'],
    queryFn: async () => {
      if (!userId)
        return null;
      const { data, error } = await
        supabase
        .from('tasks')
        .select('*')
        .eq('user_id', userId)
        .gte('startDate', formatToDate(currentDay))
        .lte('startDate', formatToDate(nextDay));
      if (error)
        throw new Error(error.message);
      return data;
    },
  });
}
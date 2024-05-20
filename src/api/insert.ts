import { supabase } from "@/lib/supabase";
import { InsertTables } from "@/lib/helperTypes";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/providers/AuthProvider";

export const useInsertTask = () => {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const userId = session?.user.id;
  return useMutation({
    async mutationFn(data: InsertTables<'tasks'>) {
      const { data: task, error } = await supabase
      .from('tasks')
      .insert({ ...data, user_id: userId })
      .select()
      .single();

      if (error)
        throw new Error(error.message);
      return task;
    },

    async onSuccess() {
      await queryClient.invalidateQueries(['tasks']);
    }
  })
}
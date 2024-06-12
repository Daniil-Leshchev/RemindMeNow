import { supabase } from "@/lib/supabase";
import { UpdateTables } from "@/lib/helperTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/providers/AuthProvider";

export const useUpdateTaskStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(data: UpdateTables<'tasks'>) {
      const { data: updatedTask, error } = await supabase
      .from('tasks')
      .update({ status: data.status })
      .eq('id', data.id)
      .select()
      .single();

      if (error)
        throw new Error(error.message);
      return updatedTask;
    },

    async onSuccess(_, { id }) {
      await queryClient.invalidateQueries({ queryKey: ['tasks'] });
      await queryClient.invalidateQueries({ queryKey: ['tasks', id] });
    }
  })
}

export const useUpdateScheduleItem = () => {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const userId = session?.user.id;
  return useMutation({
    async mutationFn(data: UpdateTables<'tasks'>) {
      const { data: task, error } = await supabase
      .from('tasks')
      .update({ ...data, user_id: userId })
      .select()
      .single();

      if (error)
        throw new Error(error.message);
      return task;
    },

    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  })
}
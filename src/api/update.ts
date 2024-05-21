import { supabase } from "@/lib/supabase";
import { UpdateTables } from "@/lib/helperTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
      console.log('success', id);
      await queryClient.invalidateQueries({ queryKey: ['tasks'] });
      await queryClient.invalidateQueries({ queryKey: ['tasks', id] });
    }
  })
}
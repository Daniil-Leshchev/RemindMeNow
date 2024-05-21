import { supabase } from "@/lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(id: number) {
      const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);

      if (error)
        throw new Error(error.message);
    },

    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  })
}
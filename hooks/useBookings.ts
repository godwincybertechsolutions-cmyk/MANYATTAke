import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBookingLead, type CreateBookingLeadInput } from '../services/bookings';

export function useCreateBookingLeadMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateBookingLeadInput) => createBookingLead(input),
    onSuccess: () => {
      // Could invalidate admin lead queries here if an admin dashboard exists
    },
  });
}

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBooking, type CreateBookingInput } from '../services/bookings';

export function useCreateBookingMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateBookingInput) => createBooking(input),
    onSuccess: () => {
      // Invalidate the user's bookings query so it refetches next time they visit their profile
      queryClient.invalidateQueries({ queryKey: ['userBookings'] });
    },
  });
}

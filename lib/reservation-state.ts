/** Shared form state shape between the server action and the client forms. */

export type ReservationFormState = {
  status: "idle" | "error" | "success";
  fieldErrors: Record<string, string>;
  formError?: string;
  delivered?: boolean;
  summary?: string;
};

export const initialReservationState: ReservationFormState = {
  status: "idle",
  fieldErrors: {},
};

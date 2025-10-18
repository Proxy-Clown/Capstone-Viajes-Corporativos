import { z } from "zod";

// The definition is the same, just moved here
export const tripSchema = z.object({
  origin: z.string().min(2, "Ingresa el origen"),
  destination: z.string().min(2, "Ingresa el destino"),
  startDate: z.string().min(1, "Selecciona fecha de salida"),
  endDate: z.string().min(1, "Selecciona fecha de retorno"),
  reason: z.string().min(5, "Describe el motivo (mín. 5 caracteres)"),
  attachment: z.any().optional(),
});

// Also export the type for convenience
export type TripFormdb = z.infer<typeof tripSchema>; 
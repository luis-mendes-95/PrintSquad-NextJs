import { z } from "zod";

export const serviceOrderSchema = z.object({
  id: z.string(),
  date: z.string(),
  client: z.string(),
  product: z.string(),
  printType: z.string(),
  description: z.string(),
  files: z.array(z.string()),
  mockupImg: z.string(),
  status: z.string(),
  cost: z.string(),
  price: z.string(),
  margin: z.string(),
});


export const serviceOrderSchemaRequest = serviceOrderSchema.omit({
  id: true,
  mockupImg: true,
  status: true,
  cost: true,
  price: true,
  margin: true,
})

export const serviceOrderSchemaCreate = serviceOrderSchema.omit({
  id: true

})


export type serviceOrderRequest = z.infer<typeof serviceOrderSchemaRequest>;
export type serviceOrderData = z.infer<typeof serviceOrderSchema>;

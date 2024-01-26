const z = require("zod");

const zodUserSchema = z.object({
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
});

const zodLoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});
const zodUpdateUserSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  password: z.string().optional(),
});

module.exports = { zodUserSchema, zodLoginSchema, zodUpdateUserSchema };

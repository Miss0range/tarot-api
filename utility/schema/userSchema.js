const { z } = require("zod");

const userSchema = z.object({
    username: z.string().min(3).max(20),
    email: z.email(),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters.")
        .regex(/[A-Z]/, "Password must contain at least one upper case letter.")
        .regex(/[a-z]/, "Password must contain at least one lower case letter.")
        .regex(/[0-9]/, "Password must contain at least one number.")
        .regex(
            /[^0-9A-Za-z]/,
            "Password must contain at least one special character.",
        ),
});

module.exports = userSchema;

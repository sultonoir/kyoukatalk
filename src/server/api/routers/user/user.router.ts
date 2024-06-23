import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { hashSync, genSaltSync } from "bcrypt-ts";
import { authSchema } from "./user.input";
import { TRPCError } from "@trpc/server";
import { createName } from "@/utils/createName";
import { customAlphabet } from "nanoid";

export const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 10);

export const userRouter = createTRPCRouter({
  createUser: publicProcedure
    .input(authSchema)
    .mutation(async ({ ctx, input }) => {
      const name = createName(input.email);
      const salt = genSaltSync(10);
      const hashPassword = hashSync(input.password, salt);
      const exist = await ctx.db.user.findUnique({
        where: {
          email: input.email,
        },
      });

      if (exist) {
        return input;
      }

      const newUser = await ctx.db.user.create({
        data: { email: input.email, name, hashPassword, id: nanoid(10) },
      });

      if (!newUser.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "error create user",
        });
      }

      return input;
    }),
  getAlluser: publicProcedure.query(async ({ ctx }) => {
    const result = await ctx.db.user.findMany();
    return result;
  }),
});

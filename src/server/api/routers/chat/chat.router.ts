import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { personalChatSchema } from "./chat.input";
import { nanoid } from "../user/user.router";

export const chatRouter = createTRPCRouter({
  personalChat: protectedProcedure
    .input(personalChatSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const findPersonalChat = await ctx.db.personalChat.findFirst({
        where: {
          OR: [
            {
              senderId: userId,
              receiverId: input.receiverId,
            },
            {
              senderId: input.receiverId,
              receiverId: userId,
            },
          ],
        },
      });

      if (!findPersonalChat) {
        const chats = await ctx.db.personalChat.create({
          data: {
            receiverId: input.receiverId,
            senderId: userId,
            id: nanoid(10),
          },
        });

        await ctx.db.chatList.create({
          data: {
            id: nanoid(),
            personalChatId: chats.id,
          },
        });

        return chats.id;
      }

      return findPersonalChat.id;
    }),
  getChatlist: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const result = await ctx.db.chatList.findMany({
      where: {
        OR: [
          {
            personalChat: {
              AND: [{ senderId: userId }, { receiverId: userId }],
            },
          },
          {
            group: {
              member: {
                some: {
                  userId: userId,
                },
              },
            },
          },
          {
            remove: {
              none: {
                userId,
              },
            },
          },
        ],
      },
      include: {
        personalChat: {
          include: {
            receiver: true,
            sender: true,
          },
        },
        group: true,
      },
    });
    return result;
  }),
});

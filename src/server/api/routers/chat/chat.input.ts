import {z} from 'zod'

export const personalChatSchema = z.object({
  receiverId : z.string()
});
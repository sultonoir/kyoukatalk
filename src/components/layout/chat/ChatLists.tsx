"use client";
import { api } from "@/trpc/react";
import React from "react";
import ChatlistLoading from "../loading/ChatlistLoading";
import PersonalChat from "./personalchat/PersonalChat";

const ChatLists = () => {
  const { data: chatList, isLoading } = api.chat.getChatlist.useQuery();

  return (
    <div className="chat-list-container w-full flex-1 flex-col overflow-y-auto px-4 py-2 transition-opacity duration-500">
      {isLoading && <ChatlistLoading />}
      {!isLoading && !chatList && <p>No chats available</p>}
      {!isLoading &&
        chatList?.map(
          (chatItem) =>
            chatItem.personalChatId && (
              <PersonalChat
                key={chatItem.id}
                personal={chatItem.personalChat}
              />
            ),
        )}
    </div>
  );
};

export default ChatLists;

"use server";

import { revalidatePath } from "next/cache";
import { v0 } from "v0-sdk";

export interface ChatActionResult {
  success: boolean;
  chatData?: {
    id: string;
    title: string;
    createdAt: string;
    url?: string;
  };
  error?: string;
}

export async function createChat(
  formData: FormData,
): Promise<ChatActionResult> {
  const message = formData.get("message") as string;

  if (!message?.trim()) {
    return { success: false, error: "Message is required" };
  }

  try {
    const chat = await v0.chats.create({
      message: message.trim(),
      system:
        "You are an expert React developer who creates beautiful, modern UI components.",
    });

    // Extract chat ID from URL or use the chat object directly
    const chatId = chat.id || chat.url?.split("/").pop();

    if (chatId) {
      // Return the chat data for localStorage update
      const chatData = {
        id: chatId,
        title: message.trim(),
        createdAt: new Date().toISOString(),
        url: chat.url,
      };

      return { success: true, chatData };
    }

    return { success: false, error: "Failed to create chat" };
  } catch (error) {
    console.error("Error creating chat:", error);
    return { success: false, error: "Failed to create chat" };
  }
}

export async function createMessage(
  chatId: string,
  message: string,
): Promise<{ success: boolean; error?: string }> {
  if (!chatId?.trim()) {
    return { success: false, error: "Chat ID is required" };
  }

  if (!message?.trim()) {
    return { success: false, error: "Message is required" };
  }

  try {
    await v0.chats.createMessage({
      chatId: chatId.trim(),
      message: message.trim(),
    });

    // Revalidate the chat page to show the new message
    revalidatePath(`/chat/${chatId}`);

    return { success: true };
  } catch (error) {
    console.error("Error creating message:", error);
    return { success: false, error: "Failed to send message" };
  }
}

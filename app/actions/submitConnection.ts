"use server";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import serverSupabase from "@/app/utils/serverSupabase";
import OpenAI, { APIError } from "openai";
import axios from "axios";

export const submitConnection = async (prevState: any, formData: FormData) => {
  if (
    !formData ||
    !formData.get("name") ||
    !formData.get("url") ||
    !formData.get("api_key")
  ) {
    // toast.error("Form fields cannot be empty");
    return {
      ok: false,
      message: "Form fields cannot be empty",
    };
  }
  try {
    // const openai = new OpenAI({
    //   apiKey: formData.get("api_key")?.toString(),
    // });
    // const chatCompletion = await openai.chat.completions.create({
    //   messages: [{ role: "user", content: "Say this is a test" }],
    //   model: "gpt-3.5-turbo",
    // });
    // if (chatCompletion instanceof APIError) {
    //   return {
    //     ok: false,
    //     message: chatCompletion.error,
    //   };
    // }
    const chromaCheck = await axios
      .get(formData.get("url")?.toString() + "/api/v1/heartbeat")
      .catch((error) => {
        return {
          data: null,
        };
      });
    if (!chromaCheck.data) {
      return {
        ok: false,
        message: "Invalid Vector Database URL",
      };
    }

    const supabase = serverSupabase();
    const connectionId = uuidv4().toString();
    const connectionName = formData.get("name")?.toString();
    const openAIApiKey = formData.get("api_key")?.toString();
    const chromaDbUrl = formData.get("url")?.toString();
    const currentUser = await supabase.auth.getUser();

    let currentUserId;
    if (currentUser) {
      currentUserId = currentUser?.data?.user?.id;
    }
    if (!currentUserId) {
      throw new Error("No current user");
    }
    const { data, error } = await supabase
      .from("Connections")
      .insert({
        id: connectionId,
        name: connectionName,
        slug: connectionName
          ?.toLowerCase()
          .replaceAll(" ", "-")
          .replaceAll('[-+.^:,"&%]', ""),
        open_ai_api_key: openAIApiKey,
        vector_db_url: chromaDbUrl,
        userIds: [currentUserId],
      })
      .select();
    if (data && data?.length > 0) {
      return { ok: true, message: "Connection successfully created!" };
    }
    if (error) {
      throw new Error(error.message);
    }
  } catch (error: any) {
    console.log(error);
    return {
      ok: false,
      message: error.message,
    };
  }
};

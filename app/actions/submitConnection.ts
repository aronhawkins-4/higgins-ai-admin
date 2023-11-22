"use server";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import supabase from "@/app/utils/serverSupabase";

export const submitConnection = async (prevState: any, formData: FormData) => {
  if (!formData) {
    toast.error("Form fields cannot be empty");
    return;
  }
  try {
    const connectionId = uuidv4().toString();
    const connectionName = formData.get("name")?.toString();
    const { data, error } = await supabase
      .from("Connections")
      .insert({ id: connectionId, name: connectionName })
      .select();
    if (error) {
      throw new Error(error.message);
    }
    return { ok: true, message: "Connection successfully created!" };
  } catch (error: any) {
    console.log(error);
    return {
      ok: false,
      message: "Something went wrong while creating a new connection.",
    };
  }
};

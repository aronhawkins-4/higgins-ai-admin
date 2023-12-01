"use server";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import serverSupabase from "@/app/utils/serverSupabase";
import chromaClient from "../utils/chromaClient";
import { getConnection } from "./getConnection";

export const submitCollection = async (prevState: any, formData: FormData) => {
  if (!formData || !formData.get("connection_id") || !formData.get("name")) {
    toast.error("Form fields cannot be empty");
    return;
  }
  const nameValue = formData.get("name")?.toString();
  if (nameValue) {
    const isValid = validate(nameValue);
    console.log(isValid);
    if (!isValid) {
      return {
        ok: false,
        message:
          "Invalid collection name. Only letters, numbers, hyphens, and underscores allowed.",
      };
    }
  }
  try {
    const supabase = serverSupabase();

    const collectionId = uuidv4().toString();
    const collectionName = formData.get("name")?.toString();
    const connectionId = formData.get("connection_id")?.toString();
    if (!connectionId) {
      return {
        ok: false,
        message: "Invalid Connection",
      };
    }
    if (!collectionName) {
      return {
        ok: false,
        message: "Missing collection name",
      };
    }
    const urlObject = await supabase
      .from("Connections")
      .select("vector_db_url")
      .eq("id", connectionId);
    if (
      !urlObject ||
      !urlObject.data ||
      !urlObject.data.at(0) ||
      !urlObject.data?.at(0)?.vector_db_url
    ) {
      return {
        ok: false,
        message: "Missing Vector Database URL",
      };
    }
    const vectorDbUrl = urlObject.data.at(0)!.vector_db_url!;
    const chroma = chromaClient(vectorDbUrl);
    await chroma.createCollection({ name: collectionName }).catch((error) => {
      throw new Error(error);
    });
    const { data, error } = await supabase
      .from("Collections")
      .insert({
        id: collectionId,
        name: collectionName,
        slug: collectionName
          ?.toLowerCase()
          .replaceAll(" ", "-")
          .replaceAll('[-+.^:,"&%]', ""),
        connection_id: connectionId,
      })
      .select();
    if (error) {
      throw new Error(error.message);
    }
    return { ok: true, message: `${nameValue} successfully created!` };
  } catch (error: any) {
    console.log(error);
    return {
      ok: false,
      message: error.message,
    };
  }
};
const validate = (name: string) => {
  const regCheck = /^[a-zA-Z0-9_.-]*$/;
  console.log(regCheck.test(name));
  if (regCheck.test(name) === false) {
    return false;
  }
  return true;
};

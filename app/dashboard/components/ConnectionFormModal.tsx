"use client";
import toast from "react-hot-toast";
import supabase from "../../utils/serverSupabase";
import { v4 as uuidv4 } from "uuid";
import { submitConnection } from "../../actions/submitConnection";
import { useFormState, useFormStatus } from "react-dom";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const ConnectionFormModal = () => {
  const initialState = { ok: false, message: "" };
  const [state, formAction] = useFormState(submitConnection, initialState);
  const [nameValue, setNameValue] = useState("");
  const [urlValue, setUrlValue] = useState("");
  const [apiKeyValue, setApiKeyValue] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    if (state?.message) {
      state.ok ? toast.success(state.message) : toast.error(state.message);
    }
    const modal: HTMLDialogElement = document.getElementById(
      "connection_modal"
    ) as HTMLDialogElement;
    modal.close();
    setNameValue("");
    setUrlValue("");
    setApiKeyValue("");
    router.refresh();
  };

  useEffect(() => {
    handleSubmit();
  }, [state]);
  return (
    <dialog id="connection_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Add Vector Database Connection</h3>
        <form
          className="form-control w-full"
          action={formAction}
          name="connection-form"
        >
          <label className="label" htmlFor="name">
            <span className="label-text">Connection Name</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Type here"
            className="input input-bordered w-full"
            value={nameValue}
            onChange={(e) => {
              setNameValue(e.target.value);
            }}
          />
          <label className="label" htmlFor="url">
            <span className="label-text">Vector Database URL</span>
          </label>
          <input
            type="text"
            name="url"
            placeholder="vector database url"
            className="input input-bordered w-full"
            value={urlValue}
            onChange={(e) => {
              setUrlValue(e.target.value);
            }}
          />
          <label className="label" htmlFor="api_key">
            <span className="label-text">OpenAI Api Key</span>
          </label>
          <input
            type="text"
            name="api_key"
            placeholder="sk-***********"
            className="input input-bordered w-full"
            value={apiKeyValue}
            onChange={(e) => {
              setApiKeyValue(e.target.value);
            }}
          />
          <button type="submit" className="btn btn-neutral w-full mt-2 ">
            Submit
          </button>
        </form>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

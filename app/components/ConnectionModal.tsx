"use client";
import toast from "react-hot-toast";
import supabase from "../utils/serverSupabase";
import { v4 as uuidv4 } from "uuid";
import { submitConnection } from "../actions/submitConnection";
import { useFormState, useFormStatus } from "react-dom";
import { useCallback, useEffect, useState } from "react";

export const ConnectionModal = () => {
  const initialState = { ok: true, message: "" };
  const [state, formAction] = useFormState(submitConnection, initialState);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = useCallback(() => {
    if (state?.message) {
      state.ok ? toast.success(state.message) : toast.error(state.message);
    }
    const modal: HTMLDialogElement = document.getElementById(
      "connection_modal"
    ) as HTMLDialogElement;
    modal.close();
    setInputValue("");
  }, [state]);

  useEffect(() => {
    handleSubmit();
  }, [state, handleSubmit]);
  return (
    <dialog id="connection_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Add Vector Database Connection</h3>
        <form
          className="form-control w-full"
          action={formAction}
          name="connection-form"
        >
          <label className="label">
            <span className="label-text">Connection Name</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Type here"
            className="input input-bordered w-full"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <button type="submit" className="btn btn-neutral w-full mt-2 ">
            Submit
          </button>
        </form>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

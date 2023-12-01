"use client";
import toast, { Toast } from "react-hot-toast";
import { submitCollection } from "../../actions/submitCollection";
import { useFormState, useFormStatus } from "react-dom";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Connection } from "@/types/types";

interface CollectionFormModalProps {
  connection: Connection;
}
export const CollectionFormModal: FC<CollectionFormModalProps> = ({
  connection,
}) => {
  const initialState = { ok: true, message: "" };
  const [state, formAction] = useFormState(submitCollection, initialState);
  const [nameValue, setNameValue] = useState("");
  const router = useRouter();
  const status = useFormStatus();

  const handleSubmit = () => {
    if (state?.message) {
      if (state.ok) {
        toast.success(state.message);
        const modal: HTMLDialogElement = document.getElementById(
          "collection_modal"
        ) as HTMLDialogElement;
        modal.close();
        setNameValue("");
        router.refresh();
      } else {
        toast.error(state.message);
      }
    }
  };

  useEffect(() => {
    handleSubmit();
  }, [state]);
  return (
    <dialog id="collection_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">
          Add collection for &apos;{connection.name}&apos;
        </h3>
        <form
          className="form-control w-full"
          action={formAction}
          name="connection-form"
          id="connection-form"
        >
          <label className="label">
            <span className="label-text">Collection Name</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Type here"
            className="input input-bordered w-full"
            pattern="[a-zA-Z0-9-_(^\s)]{3, 63}"
            required
            value={nameValue}
            onChange={(e) => {
              setNameValue(e.target.value);
            }}
          />
          <input type="hidden" name="connection_id" value={connection.id} />
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

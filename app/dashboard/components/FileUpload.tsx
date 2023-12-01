"use client";
import { LegacyRef, useRef, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

const onSubmit = () => {
  //   e.preventDefault();
  //   const file = e.target.files[0];
  //   console.log(formData.get("file"));
};

export const FileUpload = () => {
  const [file, setFile] = useState("");
  return (
    <form onSubmit={onSubmit}>
      <label className="form-control w-full max-w-lg">
        <div className="label">
          <span className="label-text">Upload a file</span>
        </div>
        <div className="relative">
          <input
            type="file"
            className="file-input file-input-bordered w-full max-w-l pr-8"
            value={file}
            name="file"
            onChange={(e) => {
              if (e.target.value) {
                setFile(e.target.value);
              } else {
                setFile("");
              }
            }}
          />
          <input
            className="btn btn-active btn-ghost w-full mt-2"
            type="submit"
            title="Submit"
          />
          {file && (
            <div
              className="absolute top-3 right-2 w-6 h-6"
              onClick={(e) => {
                e.preventDefault();
                setFile("");
              }}
            >
              <XMarkIcon fontSize={24} />
            </div>
          )}
        </div>
      </label>
    </form>
  );
};

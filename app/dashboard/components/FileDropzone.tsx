"use client";
import { useConnection } from "@/app/hooks/useConnection";
import { FC, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { handleFileUpload } from "@/app/actions/handleFileUpload";

interface FileDropzoneProps {
  connectionSlug: string;
  collectionName: string;
}
export const FileDropzone: FC<FileDropzoneProps> = ({
  connectionSlug,
  collectionName,
}) => {
  const connection = useConnection(connectionSlug);
  const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "48px",
    borderWidth: 1,
    borderRadius: 2,
    borderStyle: "dashed",
    backgroundColor: "transparent",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
  };

  const focusedStyle = {
    borderColor: "#ffffff",
  };

  const acceptStyle = {
    borderColor: "#ffffff",
  };

  const rejectStyle = {
    borderColor: "#ff1744",
  };
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone();

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragActive ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject, isDragActive]
  );

  const files = acceptedFiles.map((file) => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ));

  const onSubmit = () => {
    const fr = new FileReader();
    fr.onload = () => {
      if (connection) {
        handleFileUpload(connection, collectionName, fr.result as string);
      }
    };
    acceptedFiles.map(async (file) => {
      fr.readAsText(file);
      return file;
    });
  };
  return (
    <form
      className="container"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div
        {...getRootProps({ style })}
        className="border-gray-600 hover:border-white"
      >
        <input className="input-zone hover:border-white" {...getInputProps()} />
        <p>Drag and drop some files here, or click to select files</p>
      </div>
      {files.length > 0 && (
        <aside className="mt-2">
          <h4>Files</h4>
          <ul className=" list-disc pl-3">{files}</ul>
        </aside>
      )}
      <input type="submit" className="btn btn-neutral btn-wide mt-4" />
    </form>
  );
};

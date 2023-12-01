"use client";
export const AddCollectionButton = () => {
  return (
    <button
      className="btn text-white"
      onClick={() => {
        const openButton = document.getElementById(
          "collection_modal"
        ) as HTMLDialogElement;
        openButton.showModal();
      }}
    >
      <svg
        width="800px"
        height="800px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
      >
        <rect width="24" height="24" fill="none" />
        <path
          d="M12 6V18"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 12H18"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Add Collection
    </button>
  );
};

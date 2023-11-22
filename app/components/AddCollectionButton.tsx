export const AddCollectionButton = () => {
  return (
    <button className="btn text-white">
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

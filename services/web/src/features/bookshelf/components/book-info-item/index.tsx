import React from "react";

type Props = {
  label: string;
  body: React.ReactNode;
};

const BookInfoItem: React.FC<Props> = ({ label, body }) => {
  return (
    <div className="not:last:mb-5">
      <span className="inline-block mb-1 text-lg font-bold">{label}</span>
      <div>{body}</div>
    </div>
  );
};

export default BookInfoItem;

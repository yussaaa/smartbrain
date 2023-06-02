import React from "react";

const Rank = ({ entryCount }) => {
  return (
    <div>
      <div className="white f3">
        {"You are currently valid entry count is: "}
      </div>
      <div className="white f1">{`# ${entryCount}`}</div>
    </div>
  );
};

export default Rank;

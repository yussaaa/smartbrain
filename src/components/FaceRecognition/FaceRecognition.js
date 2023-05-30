import React from "react";

const FaceRecognition = ({ img_url }) => {
  return (
    <div className="center ma">
      <div className="abcolute mt2">
        <img src={img_url} width="500px" height="auto" />
      </div>
    </div>
  );
};

export default FaceRecognition;

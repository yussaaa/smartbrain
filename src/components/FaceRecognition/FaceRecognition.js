import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ box, img_url }) => {
  return (
    <div className="center ma">
      <div className="relative mt2">
        <img id="inputimage" src={img_url} width="500px" height="auto" />
        <div
          className="bounding-box"
          style={{
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
            left: box.leftCol,
          }}
        ></div>
      </div>
    </div>
  );
};

export default FaceRecognition;

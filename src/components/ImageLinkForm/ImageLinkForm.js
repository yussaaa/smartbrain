import React from "react";
import "./ImageLinkForm.css";

const ImageLinkform = () => {
  return (
    <div>
      <p className="f3">
        {
          "Past the link to the image, then the smart brain will detect faces for you."
        }
      </p>
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input className="f4 pa2 w-70 center" type="tex" />

          <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple">
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkform;

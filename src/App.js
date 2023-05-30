import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageLinkform from "./components/ImageLinkForm/ImageLinkForm";
import options from "./Particles";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";

import "tachyons";
import { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import { useState } from "react";

const USER_ID = "yussaaa";
// Your PAT (Personal Access Token) can be found in the portal under Authentification
const PAT = "745dac730f244d019776b20b145e1544";
const APP_ID = "my-first-application";
// Change these to whatever model and image URL you want to use
const MODEL_ID = "face-detection";
const MODEL_VERSION_ID = "6dc7e46bc9124c5c8824be4822abe105";

const clarifaiReturnRequestOption = (img_url) => {
  ///////////////////////////////////////////////////////////////////////////////////
  // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
  ///////////////////////////////////////////////////////////////////////////////////

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: img_url,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + PAT,
    },
    body: raw,
  };

  return requestOptions;
};

function getFaceLocation(result) {
  const clarifaiFace =
    result.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById("inputImage");
  const width = Number(image.width);
  const height = Number(image.height);

  return {
    leftCol: clarifaiFace.left_col * width,
    topRow: clarifaiFace.top_row * height,
    rightCol: width - clarifaiFace.right_col * width,
    bottomRow: height - clarifaiFace.bottom_row * height,
  };
}

function App() {
  const [state, setstate] = useState({ input: 0 });
  const [button, setButtonClick] = useState({ img_url: "" });

  const onInputChange = (event) => {
    setstate(console.log(event.target.value));
    setstate({ input: event.target.value });
    // console.log("state.input", state.input);
  };
  const onButtonClick = (event) => {
    setButtonClick(console.log("Submit Clicked"));

    const IMG_URL = state.input;

    setButtonClick({ img_url: IMG_URL });

    // console.log(button.img_url);

    setButtonClick(
      fetch(
        "https://api.clarifai.com/v2/models/" +
          MODEL_ID +
          // "/versions/" +
          // MODEL_VERSION_ID +
          "/outputs",
        clarifaiReturnRequestOption(IMG_URL)
      )
        .then((response) => getFaceLocation(response))
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error))
    );
  };

  const particlesInit = useCallback(async (engine) => {
    // console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    // await console.log(container);
  }, []);

  return (
    <div className="App">
      <Particles
        className="particles"
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={options}
      />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkform
        onInputChange={onInputChange}
        onSubmittButtonClick={onButtonClick}
      />
      <FaceRecognition img_url={state.input} />
    </div>
  );
}

export default App;

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
import Clarifai from "clarifai";

// const app = new Clarifai.App({
//   apiKey: "4626bb001aec49db8a3f14d57ce1543c",
// });

function App() {
  const [state, setstate] = useState({ input: 0 });
  const [button, setButtonClick] = useState({ img_url: "" });

  const onInputChange = (event) => {
    setstate(console.log(event.target.value));
    setstate({ input: event.target.value });
    // console.log("state.input", state.input);
  };
  const onButtonClick = async (event) => {
    setButtonClick(console.log("Submit Clicked"));
    // app.models
    //   .predict(
    //     "6dc7e46bc9124c5c8824be4822abe105",
    //     "https://samples.clarifai.com/face-det.jpg"
    //   )
    //   .then(
    //     function (resposne) {
    //       console.log(resposne);
    //     },
    //     function (err) {}
    //   );
    await setButtonClick({ img_url: state.input });
    await console.log(button.img_url);
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
        options={{ options }}
      />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkform
        onInputChange={onInputChange}
        onSubmittButtonClick={onButtonClick}
      />
      <FaceRecognition img_url={button.img_url} />
    </div>
  );
}

export default App;

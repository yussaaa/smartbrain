import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageLinkform from "./components/ImageLinkForm/ImageLinkForm";
import options from "./Particles";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/SignIn/signIn";
import Register from "./components/Register/Register";

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
  const image = document.getElementById("inputimage");
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
  const [state, setState] = useState({ input: 0 });
  const [button, setButtonClick] = useState({ img_url: "" });
  const [box, setBox] = useState(0);
  const [route, setRoute] = useState("SignIn");
  const [isSignedIn, setisSignedIn] = useState(false);

  const [user, setUser] = useState({
    id: "125",
    name: "",
    email: "",
    password: "",
    entries: 0,
    joined: new Date(),
  });

  const sendUser = (data) => {
    setUser(data);
  };

  const onInputChange = (event) => {
    setState(console.log(event.target.value));
    setState({ input: event.target.value });
  };

  const onButtonClick = async (event) => {
    setButtonClick(console.log("Submit Clicked"));

    const IMG_URL = state.input;

    setButtonClick({ img_url: IMG_URL });

    // console.log(button.img_url);

    try {
      const response = await fetch(
        "https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs",
        clarifaiReturnRequestOption(state.input)
      );
      const counter = await fetch("http://localhost:3006/image", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: user.id,
        }),
      });
      setUser((prevUser) => ({ ...prevUser, entries: prevUser.entries + 1 }));
      const data = await response.json();
      const result = await getFaceLocation(data);
      setBox(result);
      console.log(box, data);
    } catch (error) {
      console.log("error", error);
    }
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

  const onRouteChage = (route) => {
    if (route === "home") {
      setisSignedIn(true);
    } else {
      setisSignedIn(false);
    }
    setRoute(route);
  };

  return (
    <div className="App">
      <Particles
        className="particles"
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={options}
      />
      <Navigation onRouteChange={onRouteChage} isSignedIn={isSignedIn} />
      {route === "home" ? (
        <>
          <Logo />
          <Rank entryCount={user.entries} />
          <ImageLinkform
            onInputChange={onInputChange}
            onSubmittButtonClick={onButtonClick}
          />
          <FaceRecognition box={box} img_url={state.input} />
        </>
      ) : route === "SignIn" ? (
        <SignIn onRouteChange={onRouteChage} />
      ) : (
        <Register sendUser={sendUser} onRouteChange={onRouteChage} />
      )}
    </div>
  );
}

export default App;

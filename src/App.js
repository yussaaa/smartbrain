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
  /* TODO: 
    Need to box all the faces on the image
  */

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

const initialUser = {
  id: "",
  name: "",
  email: "",
  password: "",
  entries: 0,
  joined: new Date(),
};

function App() {
  const [state, setState] = useState({ input: "" });
  const [buttonClickURL, setButtonClick] = useState("");
  const [box, setBox] = useState(0);
  const [route, setRoute] = useState("SignIn");
  const [isSignedIn, setisSignedIn] = useState(false);

  const [user, setUser] = useState(initialUser);

  const sendUser = (data) => {
    setUser(data);
  };

  const onInputChange = (event) => {
    setState({ input: event.target.value });
  };

  const onButtonClick = async (event) => {
    setButtonClick(console.log("Submit Clicked"));

    // const IMG_URL = state.input;

    setButtonClick(state.input);

    try {
      const response = await fetch(
        "https://vast-hamlet-03824.herokuapp.com/imageurl",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            url: buttonClickURL,
          }),
        }
      );
      try {
        const count = await fetch(
          "https://vast-hamlet-03824.herokuapp.com/image",
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: user.id,
            }),
          }
        );
        const count_value = await count.json();
        setUser(Object.assign(user, { entries: count_value }));
        const data = await response.json();
        const result = await getFaceLocation(data);
        setBox(result);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log("Error, please check the input URL", error);
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
    } else if (route == "SignIn") {
      setisSignedIn(false);
      setButtonClick("");
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
          <Rank user={user} />
          <ImageLinkform
            onInputChange={onInputChange}
            onSubmittButtonClick={onButtonClick}
          />
          <FaceRecognition box={box} img_url={buttonClickURL} />
        </>
      ) : route === "SignIn" ? (
        <SignIn sendUser={sendUser} onRouteChange={onRouteChage} />
      ) : (
        <Register sendUser={sendUser} onRouteChange={onRouteChage} />
      )}
    </div>
  );
}

export default App;

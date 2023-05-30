import React from "react";

const Navigation = ({ onRouteChange }) => {
  return (
    <nav style={{ display: "flex", justifyContent: "flex-end" }}>
      <p
        className="f3 link dim black underline pa3 pointers"
        onClick={() => onRouteChange("SignIn")}
      >
        Sign Out
      </p>
    </nav>
  );
};

export default Navigation;

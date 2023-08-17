import { useState } from "react";

export function LandingPage() {
  return (
    <>
      <div className="LandingPageDiv">
        <h1>Welcome to our store</h1>
        <br />
        <br />
        <button
          className="explorebutton"
          onClick={() => window.open("/index", "_self")}
        >
          Explore!
        </button>
      </div>
    </>
  );
}

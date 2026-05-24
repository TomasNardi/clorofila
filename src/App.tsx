import React from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import Section1 from "./sections/section1";
import Section2 from "./sections/section2";
import Section3 from "./sections/section3";
import "./App.css";

const App: React.FC = () => {
  return (
    <ReactFullpage
      credits={{ enabled: false }}
      scrollingSpeed={800}
      navigation
      sectionsColor={["#f5f0e8", "#ede8dc", "#2c2416"]}
      render={({ fullpageApi }) => {
        return (
          <ReactFullpage.Wrapper>
            <Section1 />
            <Section2 />
            <Section3 fullpageApi={fullpageApi} />
          </ReactFullpage.Wrapper>
        );
      }}
    />
  );
};

export default App;

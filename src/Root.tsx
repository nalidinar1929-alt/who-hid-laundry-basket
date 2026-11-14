import React from "react";
import { Composition } from "remotion";
import { WhoHidRabbit } from "./WhoHidRabbit";

export const Root: React.FC = () => {
  return (
    <Composition
      id="WhoHidRabbit"
      component={WhoHidRabbit}
      durationInFrames={1800}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};

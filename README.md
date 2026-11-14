import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { NarrationAudio } from "./NarrationAudio";

const W = 1080;
const H = 1920;
const CX = W / 2;
const BASKET_Y = 1310;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const NARRATION_CUES = [
  { start: 0, end: 8, text: "Who hid in the laundry basket?" },
  { start: 8, end: 16, text: "Did you hear that? Tap, tap! Someone's in there." },
  { start: 16, end: 24, text: "One long ear … and two! Hold up two fingers. Wiggle, wiggle!" },
  { start: 24, end: 27, text: "Who could it be? Say your guess!" },
  { start: 30, end: 38, text: "It's a rabbit! Look at that tiny blue cape!" },
  { start: 38, end: 46, text: "Tap your knees with me. Hop … hop … hop!" },
  { start: 46, end: 54, text: "Where did the rabbit go? There it is! Look at that wiggly nose." },
  { start: 54, end: 60, text: "Bye, little rabbit! Oh … it's hiding again!" },
];

const frameToSec = (frame: number): number => frame / 30;

const getCurrentCue = (frame: number) => {
  const seconds = frameToSec(frame);
  return NARRATION_CUES.find((cue) => seconds >= cue.start && seconds < cue.end) ?? null;
};

const Rug = () => (
  <div
    style={{
      position: "absolute",
      left: CX - 470,
      top: 1360,
      width: 940,
      height: 360,
      borderRadius: 120,
      background: "linear-gradient(180deg, #fff4d8 0%, #ecdcb8 100%)",
      boxShadow: "0 20px 30px rgba(135, 108, 74, 0.12)",
    }}
  />
);

const Basket = ({ frame }: { frame: number }) => {
  const basketBloom = interpolate(frame, [0, 8, 60, 220], [0, 18, 14, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const lidSwing = Math.sin(frame * 0.75) * (frame < 240 ? 10 : 6);

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: CX - 310,
          top: BASKET_Y - 125,
          width: 620,
          height: 360,
          borderRadius: 220,
          background: "linear-gradient(180deg, #84653d 0%, #5c432c 100%)",
          border: "18px solid #a57d4a",
          boxShadow: "0 24px 40px rgba(48, 28, 12, 0.15)",
          zIndex: 12,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "36px 42px 10px 42px",
            borderRadius: "50% 50% 30% 30% / 45% 45% 25% 25%",
            background: "linear-gradient(180deg, rgba(255,255,255,0.14), rgba(0,0,0,0.06))",
            transform: `rotate(${lidSwing}deg)`,
          }}
        />

        <div
          style={{
            position: "absolute",
            left: 36,
            right: 36,
            top: 26,
            height: 68,
            borderRadius: 30,
            background: "rgba(255,255,255,0.22)",
            border: "6px solid rgba(115, 82, 46, 0.7)",
            transform: `rotate(${lidSwing}deg) translateY(${basketBloom}px)`,
            zIndex: 14,
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          left: CX - 290,
          top: BASKET_Y + 135,
          width: 580,
          height: 120,
          borderRadius: 50,
          background: "linear-gradient(180deg, #f5e8cf 0%, #e8dcb7 58%, #d4c399 100%)",
          boxShadow: "0 8px 20px rgba(80, 58, 31, 0.12)",
          zIndex: 1,
        }}
      />
    </AbsoluteFill>
  );
};

const YellowSock = ({ frame }: { frame: number }) => {
  const visible = frame >= 180 && frame < 1200;
  const y = interpolate(frame, [180, 260, 320], [0, 30, 18], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const x = interpolate(frame, [180, 260], [0, 36], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const turn = interpolate(frame, [180, 370], [0, 18], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: CX + 140 + x,
        top: BASKET_Y - 70 + y,
        width: 110,
        height: 180,
        borderRadius: "50% 60% 42% 52% / 38% 44% 45% 48%",
        background: "linear-gradient(180deg, #f4d958 0%, #e0b040 100%)",
        border: "7px solid rgba(185, 124, 28, 0.7)",
        opacity: visible ? 1 : 0,
        transform: `rotate(${turn}deg)`,
        boxShadow: "0 12px 16px rgba(123, 83, 20, 0.12)",
        zIndex: 18,
      }}
    />
  );
};

const BlueWashcloth = ({ frame }: { frame: number }) => {
  const visible = frame < 300 || frame > 900;
  const x = interpolate(frame, [0, 140], [-30, 28], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(frame, [0, 140], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const revealAtBasket = frame >= 900 && frame < 1050;
  const onRabbitBack = frame >= 930 && frame < 1360;

  const rabbitPosition = getRabbitCenter(frame);

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: CX - 190 + x,
          top: BASKET_Y - 110 + y,
          width: 180,
          height: 126,
          borderRadius: 34,
          background: "linear-gradient(180deg, #dfeefc 0%, #bfd7f4 100%)",
          border: "6px solid rgba(140, 176, 214, 0.45)",
          opacity: visible ? 0.92 : 0,
          transform: "rotate(-24deg)",
          zIndex: 24,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: rabbitPosition.x - 155,
          top: rabbitPosition.y - 58,
          width: 310,
          height: 110,
          borderRadius: 34,
          background: "linear-gradient(180deg, #dfeefc 0%, #bfd7f4 100%)",
          border: "8px solid rgba(140, 176, 214, 0.45)",
          opacity: onRabbitBack ? 1 : 0,
          transform: "rotate(-7deg)",
          zIndex: 26,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: CX - 170,
          top: 980,
          width: 180,
          height: 120,
          borderRadius: 36,
          background: "linear-gradient(180deg, #dfeefc 0%, #bfd7f4 100%)",
          border: "6px solid rgba(140, 176, 214, 0.45)",
          opacity: revealAtBasket ? 0.95 : 0,
          transform: "rotate(24deg)",
          zIndex: 24,
        }}
      />
    </>
  );
};

const getRabbitCenter = (frame: number) => {
  if (frame < 900) {
    return { x: CX, y: 1020 };
  }

  if (frame < 1140) {
    return { x: CX, y: 1020 };
  }

  if (frame < 1380) {
    const phase = (frame - 1140) / 60;
    const hopIndex = Math.floor(phase);
    const local = (frame - 1140 - hopIndex * 60) / 60;
    const lift = Math.sin(local * Math.PI) * 68;
    return { x: CX, y: 1000 - lift };
  }

  if (frame < 1500) {
    return { x: CX, y: 1030 + (frame - 1380) * 0.8 };
  }

  if (frame < 1680) {
    return { x: CX, y: 1030 + Math.sin((frame - 1500) * 0.7) * 18 };
  }

  return {
    x: CX,
    y: 1050 + interpolate(frame, [1680, 1800], [0, 180], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
  };
};

const Rabbit = ({ frame }: { frame: number }) => {
  const rabbitPosition = getRabbitCenter(frame);
  const revealOpacity = interpolate(frame, [900, 980], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = frame < 1500 ? 1 : 0.96;
  const noseWiggle = Math.sin(frame * 0.7) * (frame > 1460 ? 10 : 4);

  const earLeftLift = interpolate(frame, [500, 600, 720], [0, 42, 38], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const earRightLift = interpolate(frame, [500, 610, 720], [0, 56, 42], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: rabbitPosition.x,
        top: rabbitPosition.y,
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity: revealOpacity,
        zIndex: 40,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: -120,
          top: -115,
          width: 240,
          height: 180,
          borderRadius: "50% 50% 44% 44% / 56% 56% 44% 44%",
          background: "linear-gradient(180deg, #f9f0dc 0%, #f1dbb9 100%)",
          boxShadow: "0 18px 28px rgba(88, 67, 43, 0.12)",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: -160,
          top: -235,
          width: 42,
          height: 170,
          borderRadius: 32,
          background: "linear-gradient(180deg, #f8f0de 0%, #e6d8c4 100%)",
          border: "4px solid rgba(120, 104, 89, 0.18)",
          transform: `rotate(-8deg) translateY(${earLeftLift}px)`,
          opacity: frame > 500 ? 1 : 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 8,
            top: 22,
            width: 20,
            height: 118,
            borderRadius: 18,
            background: "linear-gradient(180deg, #f8b9c9 0%, #ec93b4 100%)",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          left: 118,
          top: -235,
          width: 42,
          height: 170,
          borderRadius: 32,
          background: "linear-gradient(180deg, #f8f0de 0%, #e6d8c4 100%)",
          border: "4px solid rgba(120, 104, 89, 0.18)",
          transform: `rotate(10deg) translateY(${earRightLift}px)`,
          opacity: frame > 500 ? 1 : 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 8,
            top: 18,
            width: 20,
            height: 124,
            borderRadius: 18,
            background: "linear-gradient(180deg, #f8b9c9 0%, #ec93b4 100%)",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          left: -90,
          top: 30,
          width: 180,
          height: 150,
          borderRadius: "50% 50% 46% 46% / 63% 63% 37% 37%",
          background: "linear-gradient(180deg, #f8f0de 0%, #f0d7b1 100%)",
          boxShadow: "inset 0 8px 0 rgba(255,255,255,0.24)",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 48,
            top: 45,
            width: 22,
            height: 22,
            borderRadius: "50%",
            background: "#241f1f",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 110,
            top: 45,
            width: 22,
            height: 22,
            borderRadius: "50%",
            background: "#241f1f",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 78,
            top: 72,
            width: 28,
            height: 22,
            borderRadius: 18,
            background: "#f4b3c0",
            transform: `rotate(${noseWiggle}deg)`,
          }}
        />
      </div>
    </div>
  );
};

const GuessText = ({ frame }: { frame: number }) => {
  const visible = frame >= 930 && frame <= 1080;

  return (
    <div
      style={{
        position: "absolute",
        left: CX,
        top: 180,
        transform: "translateX(-50%)",
        fontSize: 110,
        letterSpacing: 12,
        fontWeight: 900,
        color: "#d78460",
        opacity: visible ? 1 : 0,
        textShadow: "0 10px 18px rgba(93, 59, 37, 0.18)",
      }}
    >
      RABBIT
    </div>
  );
};

const NarrationOverlay = ({ frame }: { frame: number }) => {
  const cue = getCurrentCue(frame);
  if (!cue) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: 60,
        right: 60,
        top: 72,
        background: "rgba(249, 239, 222, 0.66)",
        borderRadius: 32,
        padding: "18px 20px",
        fontSize: 42,
        lineHeight: 1.2,
        color: "#3c2f29",
        textAlign: "center",
        fontWeight: 700,
        boxShadow: "0 12px 24px rgba(84, 62, 43, 0.08)",
      }}
    >
      {cue.text}
    </div>
  );
};

const QuietGuessPrompt = ({ frame }: { frame: number }) => {
  const visible = frame >= 720 && frame <= 900;

  return (
    <div
      style={{
        position: "absolute",
        left: CX,
        top: 160,
        transform: "translateX(-50%)",
        fontSize: 72,
        fontWeight: 800,
        color: "#40362d",
        opacity: visible ? 1 : 0,
        textAlign: "center",
      }}
    >
      Say your guess!
    </div>
  );
};

export const WhoHidRabbit = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ background: "linear-gradient(180deg, #f7f0df 0%, #f9f4eb 100%)" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 50% 30%, rgba(255, 216, 139, 0.72), rgba(255,255,255,0) 36%)",
        }}
      />

      <Rug />
      <Basket frame={frame} />
      <BlueWashcloth frame={frame} />
      <YellowSock frame={frame} />
      <Rabbit frame={frame} />
      <GuessText frame={frame} />
      <QuietGuessPrompt frame={frame} />
      <NarrationOverlay frame={frame} />
      <NarrationAudio />
    </AbsoluteFill>
  );
};

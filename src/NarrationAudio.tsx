import { Audio } from "remotion";

export const KID_NARRATION_PATH: string | null = null;

export const NarrationAudio = () => {
  if (!KID_NARRATION_PATH) {
    return null;
  }

  return (
    <Audio
      src={KID_NARRATION_PATH}
      startFrom={0}
      endAt={1800}
      volume={0.9}
    />
  );
};

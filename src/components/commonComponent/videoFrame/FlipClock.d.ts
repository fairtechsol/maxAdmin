import { FC } from "react";

interface FlipClockProps {
  value: number | string;
}

interface Tick {
  value: number | string;
}

declare const FlipClock: FC<FlipClockProps>;

export default FlipClock;

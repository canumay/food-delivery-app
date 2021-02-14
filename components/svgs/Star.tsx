import React from "react";
import { SvgXml } from "react-native-svg";

interface ISvgProps {
  size: number;
  fill?: string;
}

export default function StarSVG({ size, fill }: ISvgProps) {
  const svg = `<svg viewBox="0 0 16 15" width="16" height="15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.378.247l2.036 4.736 5.21.44c.361.03.508.474.234.707l-3.952 3.366 1.184 5.008c.082.348-.301.621-.612.437l-4.477-2.655-4.478 2.655c-.311.183-.694-.09-.612-.437l1.184-5.008L.142 6.129a.402.402 0 01.234-.707l5.21-.44L7.623.247a.413.413 0 01.756 0z"/></svg>`;
  const SvgComponent = () => <SvgXml xml={svg} width={size} height={size} fill={fill} />;
  return <SvgComponent />;
}

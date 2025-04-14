import { useEffect, useRef } from "preact/hooks";
import { useMousePosition } from "../hooks/useMousePosition";

const colorPairs = [
  ["hsl(100, 100%, 60%)", "hsl(200, 100%, 60%)"],
  ["hsl(308, 100%, 60%)", "hsl(50, 100%, 60%)"],
  ["hsl(49, 100%, 60%)", "hsl(173, 100%, 63%)"],
  ["hsl(180, 100%, 60%)", "hsl(0, 100%, 77%)"],
];
const randIndex = Math.floor(Math.random() * colorPairs.length);

const Logo = ({ name }) => {
  // Props
  name = name ?? "neenjaw.com";
  const firstLetter = name[0];
  const startColor = colorPairs[randIndex][0];
  const endColor = colorPairs[randIndex][1];

  // Hooks
  const cardEl = useRef(null);
  const { mouseX, mouseY } = useMousePosition();

  useEffect(() => {
    if (!cardEl.current) {
      return;
    }

    const { x, y, width, height } = cardEl.current.getBoundingClientRect();
    const dx = mouseX - (x + 0.5 * width);
    const dy = mouseY - (y + 0.5 * height);
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
    cardEl.current.style.setProperty("--startDeg", `${angle + 90}deg`);
  }, [mouseX, mouseY]);

  return (
    <div className="logo__wrapper">
      <div
        ref={cardEl}
        className="logo__card"
        style={{ "--startColor": startColor, "--endColor": endColor }}
      >
        {firstLetter}
      </div>
      <span className="logo__name">{name}</span>
    </div>
  );
};

export default Logo;

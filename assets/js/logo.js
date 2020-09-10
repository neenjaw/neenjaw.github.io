"use strict";

const useState = React.useState;
const useEffect = React.useEffect;
const useRef = React.useRef;
const e = React.createElement;

const useMousePosition = () => {
  const [position, setPosition] = useState({ mouseX: 0, mouseY: 0 });

  useEffect(() => {
    const setFromEvent = (e) =>
      setPosition({ mouseX: e.clientX, mouseY: e.clientY });

    window.addEventListener("mousemove", setFromEvent);
    return () => window.removeEventListener("mousemove", setFromEvent);
  }, []);
  return position;
};

const Logo = ({ name }) => {
  name = name ?? "neenjaw.com";
  const firstLetter = name[0];
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

  return e(
    "div",
    {
      className: "logo__container",
    },
    e(
      "div",
      {
        ref: cardEl,
        className: "logo__card",
      },
      firstLetter
    ),
    e(
      "span",
      {
        className: "logo__name",
      },
      name
    )
  );
};

const logoContainer = document.getElementById("logo-container");
if (logoContainer) {
  ReactDOM.render(React.createElement(Logo, null), logoContainer);
} else {
  console.log("No logo container");
}

import { render } from "preact";

function renderPreactComponents() {
  const componentElements = document.querySelectorAll(
    "[data-preact-component]"
  );

  componentElements.forEach((element) => {
    const componentName = element.dataset.preactComponent;
    const props = JSON.parse(element.dataset.preactProps || "{}");

    switch (componentName) {
      case "Logo":
        import("./components/Logo").then(({ default: Logo }) => {
          render(<Logo {...props} />, element);
        });
        break;
    }
  });
}

// Call the function when the DOM is ready
document.addEventListener("DOMContentLoaded", renderPreactComponents);

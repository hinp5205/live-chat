import { useLayoutEffect, useState } from "react";
import * as ReactDOM from "react-dom";
import { PortalProps } from "./portal.types";

function createWrapperAndAppendToBody(wrapperId: string) {
  const wrapperElement = document.createElement("div");
  wrapperElement.setAttribute("id", wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}

const Portal = (props: PortalProps) => {
  const [wrapperElement, setWrapperElement] = useState<Element | null>(null);
  const { children, wrapperId = "react-portal-wrapper" } = props;

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    let systemCreated = false;
    // if element is not found with wrapperId or wrapperId is not provided,
    // create and append to body
    if (!element) {
      systemCreated = true;
      element = createWrapperAndAppendToBody(wrapperId);
    }
    setWrapperElement(element);

    return () => {
      // delete the programatically created element
      if (systemCreated && element?.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [wrapperId]);
  if (wrapperElement === null) return null;

  return ReactDOM.createPortal(children, wrapperElement);
};

export default Portal;

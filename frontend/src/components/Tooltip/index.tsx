import { FC, useEffect, useRef, useState } from "react";

interface TooltipProps {
  alignment: "top";
  text: string | JSX.Element;
}

const Tooltip: FC<TooltipProps> = (props) => {
  const component = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<boolean>(false);
  const _get_tooltip_classes = () => {
    const classes: string[] = [];
    switch (props.alignment) {
      case "top":
        classes.push("bottom-[calc(200%+0.5rem)]");
    }

    if (active) {
      classes.push("visible");
    } else {
      classes.push("invisible");
    }

    return classes.join(" ");
  };

  useEffect(() => {
    component.current?.addEventListener("mouseenter", () => {
      setActive(true);
    });
    component.current?.addEventListener("mouseleave", () => {
      setActive(false);
    });
  }, []);

  return (
    <div className="relative inline-flex justify-center items-center">
      <div ref={component}>{props.children}</div>
      <div
        className={
          "bg-[#151717] whitespace-pre absolute py-2 px-3 shadow shadow-ui-transparent-3 rounded-md text-sm font-semibold text-gray-300 z-[999999] " +
          _get_tooltip_classes()
        }
      >
        {props.text}
      </div>
    </div>
  );
};

export default Tooltip;

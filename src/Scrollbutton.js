import React, { useEffect, useState } from "react";
import { useWindowScroll } from "react-use";

export default function Scrollbutton() {
  const { y: pageYOffset } = useWindowScroll();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (pageYOffset > 400) {
      setVisible(true);
    } else {
      setVisible(true);
    }
  }, [pageYOffset]);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  if (!visible) {
    return false;
  }
  return (
    <div className="top" onClick={scrollToTop}>
      Top
    </div>
  );
}

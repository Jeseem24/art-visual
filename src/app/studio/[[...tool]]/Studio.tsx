"use client";

import { useEffect } from "react";
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export function Studio() {
  useEffect(() => {
    document.body.style.zoom = "1";
    document.documentElement.style.backgroundColor = "#101112";
    document.body.style.backgroundColor = "#101112";

    return () => {
      document.body.style.zoom = "";
      document.documentElement.style.backgroundColor = "";
      document.body.style.backgroundColor = "";
    };
  }, []);

  return <NextStudio config={config} />;
}

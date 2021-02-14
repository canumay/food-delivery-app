import React, { useState } from "react";
import { useEffect } from "react";
import Loading from "./screens/Loading";
import MainStack from "./stacks/MainStack";

export default function App() {
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    // Fake loading effect... (1 sec)
    setTimeout(() => setLoaded(true), 2000);
  }, []);

  if (!isLoaded) {
    return <Loading />;
  } else {
    return <MainStack />;
  }
}

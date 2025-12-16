import { useEffect, useState } from "react";

type Props = {};

export default function ServerStatus({}: Props) {
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch("/api/health")
      .then((response) => response.json())
      .then((data) => setStatus(data))
      .catch((error) => setStatus("Error"));
  }, []);

  return (
    <div>
      <h1>Server Status: {status}</h1>
    </div>
  );
}

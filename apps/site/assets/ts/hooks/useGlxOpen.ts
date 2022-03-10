import { useEffect, useState } from "react"

const glxStations = ["place-lech", "place-unsqu", "place-spmnl"];

const useGlxOpen = (stationId: string): boolean => {
  const [isGlxOpen, setIsGlxOpen] = useState(false)
  useEffect(() => {
    const glxOpen = document.querySelector(".glx-is-open");
    if (glxOpen instanceof HTMLElement) {
      setIsGlxOpen(glxOpen.dataset.open === "true")
    }
  }, []);

  return isGlxOpen && (glxStations.indexOf(stationId) > 0);
}

export default useGlxOpen;
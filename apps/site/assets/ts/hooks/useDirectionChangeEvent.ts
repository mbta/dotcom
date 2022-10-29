import { useEffect, useState } from "react";
import { DirectionId } from "../__v3api";

const EVENT_NAME = "changeddirection";

// for valid typing, extend DocumentEventMap interface to include custom event
declare global {
  interface DocumentEventMap {
    [EVENT_NAME]: CustomEvent<{ direction: DirectionId }>;
  }
}

export function dispatchChangedDirection(direction: DirectionId): void {
  document.dispatchEvent(
    new CustomEvent(EVENT_NAME, {
      detail: { direction }
    })
  );
}

// outputs the direction from a "changeddirection" event
function useDirectionChangeEvent(initialDirection: DirectionId): DirectionId {
  const [currentDirection, setCurrentDirection] = useState<DirectionId>(
    initialDirection
  );

  useEffect(() => {
    function listener(e: CustomEvent<{ direction: DirectionId }>): void {
      setCurrentDirection(e.detail.direction);
    }

    document.addEventListener(EVENT_NAME, listener);

    return () => {
      document.removeEventListener(EVENT_NAME, listener);
    };
  }, []);

  return currentDirection;
}

export default useDirectionChangeEvent;

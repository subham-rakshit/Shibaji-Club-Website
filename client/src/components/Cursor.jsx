import { useEffect, useRef, useState } from "react";

function Cursor() {
  const [boxPosition, setBoxPosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const cursorRef = useRef(null);

  useEffect(() => {
    let animationFrameId;

    const handleMouseMove = (e) => {
      setBoxPosition({ x: e.clientX, y: e.clientY });
    };

    const updatePosition = () => {
      setCursorPosition((prev) => {
        const delay = 0.1; // Adjust this value to control the delay (higher = more lag)
        const newX = prev.x + (boxPosition.x - prev.x) * delay;
        const newY = prev.y + (boxPosition.y - prev.y) * delay;
        return { x: newX, y: newY };
      });

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Start updating position
    updatePosition();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [boxPosition]);

  return (
    <div
      ref={cursorRef}
      style={{
        left: `${cursorPosition.x}px`,
        top: `${cursorPosition.y}px`,
        transform: "translate(-50%, -50%)", // Center the box on the cursor
        width: "20px", // Invisible center
        height: "20px", // Invisible center
        borderRadius: "50%", // Ensures the light effect is circular
        pointerEvents: "none", // Ensures the cursor does not interact with elements
      }}
      className={`fixed pointer-events-none blur-[10px] bg-[#95C121] hidden lg:inline`}
    ></div>
  );
}

export default Cursor;

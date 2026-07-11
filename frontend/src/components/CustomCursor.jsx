import React, { useState, useEffect } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on desktop devices
    if (window.innerWidth < 1024) return;

    // Enable custom cursor styles on body
    document.body.classList.add('custom-cursor-active');

    const addEventListeners = () => {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseenter', onMouseEnter);
      document.addEventListener('mouseleave', onMouseLeave);
      document.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mouseup', onMouseUp);
    };

    const removeEventListeners = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.body.classList.remove('custom-cursor-active');
    };

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const onMouseEnter = () => {
      setHidden(false);
    };

    const onMouseLeave = () => {
      setHidden(true);
    };

    const onMouseDown = () => {
      setClicked(true);
    };

    const onMouseUp = () => {
      setClicked(false);
    };

    const handleLinkHover = () => {
      const clickables = document.querySelectorAll('a, button, select, input, textarea, [role="button"], .hover-target');
      clickables.forEach((el) => {
        el.addEventListener('mouseenter', () => setLinkHovered(true));
        el.addEventListener('mouseleave', () => setLinkHovered(false));
      });
    };

    addEventListeners();
    handleLinkHover();

    // Re-check elements periodically in case DOM updates (SPA page transitions)
    const interval = setInterval(handleLinkHover, 2000);

    return () => {
      removeEventListeners();
      clearInterval(interval);
    };
  }, []);

  if (hidden || window.innerWidth < 1024) return null;

  return (
    <>
      {/* Outer Ring */}
      <div
        className={`fixed pointer-events-none z-[9999] rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ease-out border ${
          clicked 
            ? 'w-6 h-6 border-accent-emerald bg-accent-emerald/10' 
            : linkHovered 
              ? 'w-16 h-16 border-accent-primary bg-accent-primary/10' 
              : 'w-10 h-10 border-accent-primary/50'
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
      {/* Inner Dot */}
      <div
        className={`fixed pointer-events-none z-[9999] rounded-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ${
          linkHovered ? 'w-2 h-2 bg-accent-primary scale-120' : 'w-2 h-2 bg-accent-primary'
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
    </>
  );
};

export default CustomCursor;

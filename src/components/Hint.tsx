"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

type Props = {
  term: string;
  explanation: string;
};

export default function Hint({ term, explanation }: Props) {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0, align: "center" as "center" | "left" | "right" });
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const computePos = useCallback(() => {
    if (!triggerRef.current) return;
    const r = triggerRef.current.getBoundingClientRect();
    const tooltipWidth = 260;
    const margin = 12;
    const scrollY = window.scrollY;

    let left = r.left + r.width / 2 - tooltipWidth / 2;
    let align: "center" | "left" | "right" = "center";

    if (left < margin) {
      left = margin;
      align = "left";
    } else if (left + tooltipWidth > window.innerWidth - margin) {
      left = window.innerWidth - tooltipWidth - margin;
      align = "right";
    }

    setPos({ top: r.top + scrollY - 8, left, align });
  }, []);

  const show = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    computePos();
    setVisible(true);
  }, [computePos]);

  const hide = useCallback(() => {
    hideTimer.current = setTimeout(() => setVisible(false), 120);
  }, []);

  const cancelHide = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
  }, []);

  // Close on outside click (mobile tap-away)
  useEffect(() => {
    if (!visible) return;
    const handler = (e: MouseEvent | TouchEvent) => {
      if (
        triggerRef.current?.contains(e.target as Node) ||
        tooltipRef.current?.contains(e.target as Node)
      ) return;
      setVisible(false);
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [visible]);

  const arrowOffset =
    pos.align === "left"
      ? Math.max(triggerRef.current ? triggerRef.current.getBoundingClientRect().left + triggerRef.current.getBoundingClientRect().width / 2 - pos.left : 20, 12)
      : pos.align === "right"
      ? Math.min(triggerRef.current ? triggerRef.current.getBoundingClientRect().left + triggerRef.current.getBoundingClientRect().width / 2 - pos.left : 240, 248)
      : 130;

  return (
    <>
      <span
        ref={triggerRef}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        onClick={(e) => {
          e.stopPropagation();
          visible ? setVisible(false) : show();
        }}
        tabIndex={0}
        role="button"
        aria-describedby={visible ? "hint-tooltip" : undefined}
        style={{
          borderBottom: "1px dotted rgba(0,229,255,0.55)",
          color: "inherit",
          cursor: "help",
          display: "inline",
          outline: "none",
        }}
        onFocusCapture={(e) => e.currentTarget.style.borderBottomColor = "rgba(0,229,255,0.9)"}
        onBlurCapture={(e) => e.currentTarget.style.borderBottomColor = "rgba(0,229,255,0.55)"}
      >
        {term}
        <svg
          aria-hidden
          width="9"
          height="9"
          viewBox="0 0 9 9"
          fill="none"
          style={{
            display: "inline-block",
            verticalAlign: "middle",
            marginLeft: "2px",
            marginBottom: "2px",
            opacity: visible ? 0.9 : 0.45,
            transition: "opacity 0.15s",
            flexShrink: 0,
          }}
        >
          <circle cx="4.5" cy="4.5" r="4" stroke="rgba(0,229,255,0.7)" strokeWidth="1" />
          <text
            x="4.5"
            y="6.5"
            textAnchor="middle"
            fontSize="5.5"
            fontFamily="monospace"
            fill="rgba(0,229,255,0.85)"
            fontWeight="700"
          >
            i
          </text>
        </svg>
      </span>

      {visible &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            id="hint-tooltip"
            ref={tooltipRef}
            role="tooltip"
            onMouseEnter={cancelHide}
            onMouseLeave={hide}
            style={{
              position: "absolute",
              top: pos.top,
              left: pos.left,
              width: 260,
              transform: "translateY(-100%)",
              zIndex: 9999,
              pointerEvents: "auto",
            }}
          >
            {/* Arrow */}
            <div
              style={{
                position: "absolute",
                bottom: -6,
                left: arrowOffset - 6,
                width: 12,
                height: 12,
                background: "rgba(18,24,32,0.97)",
                border: "1px solid rgba(0,229,255,0.25)",
                borderTop: "none",
                borderLeft: "none",
                transform: "rotate(45deg)",
                borderRadius: "0 0 2px 0",
              }}
            />
            {/* Box */}
            <div
              style={{
                background: "rgba(18,24,32,0.97)",
                border: "1px solid rgba(0,229,255,0.25)",
                borderRadius: 10,
                padding: "10px 13px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,229,255,0.06)",
                backdropFilter: "blur(12px)",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: 12,
                  lineHeight: 1.55,
                  color: "rgba(255,255,255,0.82)",
                  fontFamily: "inherit",
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontWeight: 600,
                    fontSize: 11,
                    letterSpacing: "0.04em",
                    color: "rgba(0,229,255,0.8)",
                    marginBottom: 4,
                    fontFamily: "monospace",
                  }}
                >
                  {term}
                </span>
                {explanation}
              </p>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

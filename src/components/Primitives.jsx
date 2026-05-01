import { useState } from "react";

export function Mascot({ variant = "default", size = 96 }) {
  const map = {
    default: "/assets/p-kun/p-kun.svg",
    wave: "/assets/p-kun/p-kun-wave.svg",
    sleep: "/assets/p-kun/p-kun-sleep.svg",
  };
  return <img src={map[variant]} alt="P-kun" style={{ width: size, height: size, display: "block" }} />;
}

export function Logo({ height = 44 }) {
  return <img src="/assets/logo/logo.svg" alt="ぴーくんアルバム" style={{ height, display: "block" }} />;
}

export function Avatar({ name, color = "sky", size = 36 }) {
  const palette = {
    sky:     { bg: "#d3d8a8", fg: "#5d6535" },
    blossom: { bg: "#ffc9d6", fg: "#b53a5a" },
    mint:    { bg: "#d2f0db", fg: "#2a8a4a" },
    cream:   { bg: "#ffe6c8", fg: "#8a4d0c" },
    lavender:{ bg: "#ebe6ff", fg: "#6a5cb8" },
  }[color];
  return (
    <div style={{
      width: size, height: size, borderRadius: 999,
      background: palette.bg, color: palette.fg,
      fontFamily: "Zen Maru Gothic, sans-serif", fontWeight: 900,
      fontSize: size * 0.42,
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0,
    }}>{name?.[0] || "?"}</div>
  );
}

export function Button({ variant = "primary", size = "md", children, onClick, icon }) {
  const sizes = {
    sm: { padding: "8px 16px", fontSize: 13 },
    md: { padding: "12px 22px", fontSize: 15 },
    lg: { padding: "16px 28px", fontSize: 17 },
  };
  const variants = {
    primary:   { background: "#97a05c", color: "#fff" },
    secondary: { background: "#ffe6c8", color: "#8a4d0c" },
    ghost:     { background: "transparent", color: "#42452f" },
    danger:    { background: "#ffe6ec", color: "#b53a5a" },
  };
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        ...sizes[size], ...variants[variant],
        fontFamily: "M PLUS Rounded 1c, sans-serif", fontWeight: 700,
        border: "none", borderRadius: 999,
        cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8,
        boxShadow: hover ? "0 8px 20px rgba(60,70,30,.12)" : "0 4px 12px rgba(60,70,30,.08)",
        transform: hover ? "translateY(-1px)" : "none",
        transition: "all 200ms cubic-bezier(.22,1,.36,1)",
      }}
    >
      {icon && <i className={`ph-duotone ph-${icon}`} style={{ fontSize: 18 }}></i>}
      {children}
    </button>
  );
}

export function Badge({ children, color = "sky", dot }) {
  const palette = {
    sky:     { bg: "#e9ecd2", fg: "#5d6535", dot: "#97a05c" },
    blossom: { bg: "#ffe6ec", fg: "#b53a5a", dot: "#ec6385" },
    mint:    { bg: "#d2f0db", fg: "#2a8a4a", dot: "#45b06a" },
    cream:   { bg: "#ffe6c8", fg: "#8a4d0c", dot: "#f5942a" },
    lavender:{ bg: "#ebe6ff", fg: "#6a5cb8", dot: "#9882e6" },
  }[color];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "4px 12px", borderRadius: 999,
      background: palette.bg, color: palette.fg,
      fontFamily: "M PLUS Rounded 1c, sans-serif", fontWeight: 600, fontSize: 12,
    }}>
      {dot && <span style={{ width: 7, height: 7, borderRadius: 999, background: palette.dot }}></span>}
      {children}
    </span>
  );
}

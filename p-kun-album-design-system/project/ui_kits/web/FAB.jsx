/* global React, Button */

function FAB({ onClick }) {
  return (
    <button onClick={onClick} title="写真をアップロード" style={{
      position: "fixed", bottom: 32, right: 32,
      width: 64, height: 64, borderRadius: 999,
      background: "#97a05c", color: "#fff",
      border: "none", cursor: "pointer",
      boxShadow: "0 12px 28px rgba(60,70,30,.18), 0 2px 4px rgba(60,70,30,.06)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 40,
      transition: "all 200ms cubic-bezier(.22,1,.36,1)",
    }}
    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px) scale(1.04)"; e.currentTarget.style.background = "#7a8347"; }}
    onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.background = "#97a05c"; }}
    >
      <i className="ph-bold ph-plus" style={{ fontSize: 28 }}></i>
    </button>
  );
}

window.FAB = FAB;

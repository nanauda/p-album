/* global React, Avatar */
const { useState: useStateHeader } = React;

function Header({ user }) {
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      background: "rgba(251,253,242,0.88)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderBottom: "1px solid #e7ecd0",
      padding: "14px 32px",
      display: "flex", alignItems: "center", gap: 24,
    }}>
      <img src="../../assets/logo/logo.svg" alt="ぴーくんアルバム" style={{ height: 42, display: "block" }}/>
      <div style={{ flex: 1 }}></div>
      <button title="お知らせ" style={{
        border: "none", background: "transparent", cursor: "pointer", padding: 10, borderRadius: 999,
        position: "relative",
      }}>
        <i className="ph-duotone ph-bell" style={{ fontSize: 24, color: "#6b6f53" }}></i>
        <span style={{
          position: "absolute", top: 8, right: 8, width: 8, height: 8, background: "#ec6385", borderRadius: 999,
          border: "2px solid #fbfdf2",
        }}></span>
      </button>
      <Avatar name={user.name} color={user.color} size={40} />
    </header>
  );
}

window.Header = Header;

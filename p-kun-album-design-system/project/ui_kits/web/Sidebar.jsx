/* global React */

function Sidebar({ current, onNavigate }) {
  const items = [
    { id: "home",    label: "ホーム",       icon: "house" },
    { id: "albums",  label: "アルバム",     icon: "images-square" },
    { id: "history", label: "履歴",         icon: "clock-counter-clockwise" },
    { id: "family",  label: "家族",         icon: "users-three" },
    { id: "favorites", label: "お気に入り", icon: "heart" },
  ];
  return (
    <aside style={{
      width: 220, padding: "24px 16px",
      borderRight: "1px solid #e7ecd0",
      background: "#fbfdf2",
      display: "flex", flexDirection: "column", gap: 4,
    }}>
      {items.map((item) => {
        const active = item.id === current;
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "12px 16px", borderRadius: 14,
              background: active ? "#e9ecd2" : "transparent",
              color: active ? "#5d6535" : "#42452f",
              border: "none", cursor: "pointer", textAlign: "left",
              fontFamily: "M PLUS Rounded 1c, sans-serif",
              fontWeight: active ? 700 : 500, fontSize: 15,
              transition: "background 200ms",
            }}
          >
            <i className={`ph-duotone ph-${item.icon}`} style={{ fontSize: 22 }}></i>
            {item.label}
          </button>
        );
      })}
      <div style={{ flex: 1 }}></div>
      <div style={{
        padding: 16, background: "#fff", borderRadius: 18,
        boxShadow: "0 4px 12px rgba(60,70,30,.06)",
        textAlign: "center",
      }}>
        <img src="../../assets/p-kun/p-kun-wave.svg" alt="" style={{ width: 72, margin: "0 auto" }}/>
        <div style={{
          fontFamily: "Zen Maru Gothic, sans-serif", fontWeight: 700, fontSize: 13, marginTop: 6, color: "#272a18",
        }}>こんにちは！</div>
        <div style={{
          fontFamily: "M PLUS Rounded 1c, sans-serif", fontSize: 11, color: "#6b6f53", marginTop: 4, lineHeight: 1.5,
        }}>きょうも見守ってるよ〜</div>
      </div>
    </aside>
  );
}

window.Sidebar = Sidebar;

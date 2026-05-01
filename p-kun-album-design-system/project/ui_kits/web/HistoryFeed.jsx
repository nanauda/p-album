/* global React, Avatar */

function HistoryFeed({ entries }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {entries.map((e) => (
        <div key={e.id} style={{
          background: "#fff", borderRadius: 22, padding: "16px 18px",
          boxShadow: "0 4px 12px rgba(60,70,30,.06)",
          display: "flex", flexDirection: "column", gap: 12,
        }}>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <Avatar name={e.who} color={e.color} size={40} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontFamily: "M PLUS Rounded 1c, sans-serif", fontSize: 13.5, color: "#272a18", lineHeight: 1.55,
              }}>
                <strong style={{ fontWeight: 700 }}>{e.who}さん</strong>
                {"が"}
                <strong style={{ fontWeight: 700, color: "#5d6535" }}>{e.album}</strong>
                {"に"}
                <strong style={{ fontWeight: 700, whiteSpace: "nowrap" }}>{e.count}枚</strong>
                {"の写真を追加"}
              </div>
              <div style={{
                fontFamily: "M PLUS Rounded 1c, sans-serif", fontSize: 12, color: "#969b78", marginTop: 4,
              }}>{e.when}</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {e.thumbs.slice(0,4).map((g, i) => (
              <div key={i} style={{
                width: 44, height: 44, borderRadius: 10,
                background: g, boxShadow: "0 2px 6px rgba(40,46,28,.08)",
              }}></div>
            ))}
            {e.count > 4 && (
              <div style={{
                width: 44, height: 44, borderRadius: 10, background: "#f3f5e3",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "M PLUS Rounded 1c, sans-serif", fontSize: 11, fontWeight: 700, color: "#6b6f53",
              }}>+{e.count - 4}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

window.HistoryFeed = HistoryFeed;

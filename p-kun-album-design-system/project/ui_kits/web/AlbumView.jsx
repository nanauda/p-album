/* global React, Button, Badge */
const { useState: useStateAlbumView } = React;

function PhotoTile({ photo, onClick }) {
  const [hover, setHover] = useStateAlbumView(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        borderRadius: 18, overflow: "hidden", cursor: "pointer",
        boxShadow: "0 4px 12px rgba(40,46,28,.08)",
        aspectRatio: photo.ratio || "1 / 1",
      }}
    >
      <div style={{
        position: "absolute", inset: 0,
        background: photo.gradient,
        transform: hover ? "scale(1.05)" : "scale(1)",
        transition: "transform 360ms cubic-bezier(.22,1,.36,1)",
      }}></div>
      {photo.favorite && (
        <div style={{
          position: "absolute", top: 10, right: 10,
          width: 30, height: 30, borderRadius: 999,
          background: "rgba(255,255,255,0.92)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <i className="ph-fill ph-heart" style={{ color: "#ec6385", fontSize: 16 }}></i>
        </div>
      )}
    </div>
  );
}

function AlbumView({ album, onBack, onUpload }) {
  // Generate fake photos
  const palettes = [
    "linear-gradient(135deg, #d3d8a8, #ffb558)",
    "linear-gradient(135deg, #ffc9d6, #ffe6c8)",
    "linear-gradient(135deg, #d2f0db, #d3d8a8)",
    "linear-gradient(135deg, #ffe6c8, #ffc9d6)",
    "linear-gradient(135deg, #ebe6ff, #d3d8a8)",
    "linear-gradient(135deg, #d2f0db, #ffe6c8)",
    "linear-gradient(135deg, #d3d8a8, #ebe6ff)",
    "linear-gradient(135deg, #ffd092, #ffc9d6)",
  ];
  const photos = Array.from({ length: album.count || 12 }, (_, i) => ({
    id: i,
    gradient: palettes[i % palettes.length],
    ratio: i % 5 === 0 ? "3 / 4" : i % 7 === 0 ? "4 / 3" : "1 / 1",
    favorite: i === 1 || i === 5,
  }));

  return (
    <div>
      {/* Album hero */}
      <div style={{
        background: album.gradient,
        borderRadius: 28, padding: "32px 36px", marginBottom: 28,
        display: "flex", alignItems: "flex-end", justifyContent: "space-between",
        minHeight: 200,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0, opacity: 0.5, mixBlendMode: "soft-light",
          backgroundImage: "radial-gradient(circle at 70% 30%, #fff 0%, transparent 60%)",
        }}></div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <button onClick={onBack} style={{
            background: "rgba(255,253,249,0.85)", border: "none", borderRadius: 999,
            padding: "6px 14px 6px 10px", display: "inline-flex", alignItems: "center", gap: 4,
            fontFamily: "M PLUS Rounded 1c, sans-serif", fontWeight: 600, fontSize: 13, color: "#42452f",
            cursor: "pointer", marginBottom: 16,
            backdropFilter: "blur(8px)",
          }}>
            <i className="ph-bold ph-caret-left" style={{ fontSize: 14 }}></i>もどる
          </button>
          <h1 style={{
            fontFamily: "Zen Maru Gothic, sans-serif", fontWeight: 900, fontSize: 36, margin: 0, color: "#272a18",
          }}>{album.title}</h1>
          <div style={{
            fontFamily: "M PLUS Rounded 1c, sans-serif", fontSize: 14, color: "#42452f", marginTop: 8,
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <span>{album.date}</span>
            <span>·</span>
            <span>{album.count}枚</span>
            <span>·</span>
            <Badge color={album.tagColor}>{album.tag}</Badge>
          </div>
        </div>
        <div style={{ position: "relative", zIndex: 1, display: "flex", gap: 8 }}>
          <Button variant="ghost" size="sm" icon="share-network">共有</Button>
          <Button variant="primary" size="sm" icon="plus" onClick={onUpload}>追加</Button>
        </div>
      </div>

      {/* Photo grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: 14,
      }}>
        {photos.map((p) => <PhotoTile key={p.id} photo={p} />)}
      </div>
    </div>
  );
}

window.AlbumView = AlbumView;
window.PhotoTile = PhotoTile;

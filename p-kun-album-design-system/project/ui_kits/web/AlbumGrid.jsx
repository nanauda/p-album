/* global React, Button */
const { useState: useStateAlbum, useEffect: useEffectAlbum, useRef: useRefAlbum, useMemo: useMemoAlbum } = React;

const PALETTES = [
  "linear-gradient(135deg, #d3d8a8, #ffd092)",
  "linear-gradient(135deg, #ffc9d6, #ffe6c8)",
  "linear-gradient(135deg, #d2f0db, #d3d8a8)",
  "linear-gradient(135deg, #ffe6c8, #ffc9d6)",
  "linear-gradient(135deg, #ebe6ff, #d3d8a8)",
  "linear-gradient(135deg, #d2f0db, #ffe6c8)",
  "linear-gradient(135deg, #d3d8a8, #ebe6ff)",
  "linear-gradient(135deg, #ffd092, #ffc9d6)",
];

// Generate a deterministic photo by index (newest = 0)
function makePhoto(i) {
  const day = Math.floor(i / 6);
  const date = new Date(2026, 4, 1);
  date.setDate(date.getDate() - day);
  return {
    id: i,
    gradient: PALETTES[i % PALETTES.length],
    favorite: i % 23 === 0,
    date,
  };
}

function formatDateGroup(d) {
  const today = new Date(2026, 4, 1);
  const diff = Math.floor((today - d) / (1000 * 60 * 60 * 24));
  if (diff === 0) return "きょう";
  if (diff === 1) return "きのう";
  if (diff < 7) return `${diff}日まえ`;
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

const TOTAL_PHOTOS = 8432; // huge album simulation
const PAGE_SIZE = 60;

function Photo({ p, onClick }) {
  const [hover, setHover] = useStateAlbum(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        aspectRatio: "1 / 1",
        borderRadius: 14,
        overflow: "hidden",
        cursor: "pointer",
        boxShadow: "0 2px 8px rgba(40,46,28,.08)",
        background: "#f3f5e3",
      }}
    >
      <div style={{
        position: "absolute", inset: 0,
        background: p.gradient,
        transform: hover ? "scale(1.05)" : "scale(1)",
        transition: "transform 360ms cubic-bezier(.22,1,.36,1)",
      }}></div>
      {p.favorite && (
        <div style={{
          position: "absolute", top: 8, right: 8,
          width: 24, height: 24, borderRadius: 999,
          background: "rgba(255,255,255,0.92)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <i className="ph-fill ph-heart" style={{ color: "#ec6385", fontSize: 13 }}></i>
        </div>
      )}
    </div>
  );
}

function DateHeader({ label, count }) {
  return (
    <div style={{
      gridColumn: "1 / -1",
      display: "flex", alignItems: "baseline", gap: 12,
      padding: "20px 0 6px",
    }}>
      <div style={{
        fontFamily: "Zen Maru Gothic, sans-serif", fontWeight: 700, fontSize: 18, color: "#272a18",
        whiteSpace: "nowrap",
      }}>{label}</div>
      <div style={{
        fontFamily: "M PLUS Rounded 1c, sans-serif", fontSize: 12, color: "#969b78",
        whiteSpace: "nowrap",
      }}>{count}枚</div>
    </div>
  );
}

function AlbumGrid({ onSelect, onUpload }) {
  // Lazy/infinite — newest first; only render `loaded` photos
  const [loaded, setLoaded] = useStateAlbum(PAGE_SIZE);
  const sentinelRef = useRefAlbum(null);
  const containerRef = useRefAlbum(null);

  useEffectAlbum(() => {
    if (!sentinelRef.current) return;
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setLoaded((n) => Math.min(n + PAGE_SIZE, TOTAL_PHOTOS));
      }
    }, { rootMargin: "400px" });
    io.observe(sentinelRef.current);
    return () => io.disconnect();
  }, []);

  // Build photo list with date-group headers inserted
  const items = useMemoAlbum(() => {
    const out = [];
    let lastGroup = null;
    let groupCount = 0;
    let groupStartIdx = -1;

    for (let i = 0; i < loaded; i++) {
      const p = makePhoto(i);
      const g = formatDateGroup(p.date);
      if (g !== lastGroup) {
        if (groupStartIdx >= 0) {
          out[groupStartIdx].count = groupCount;
        }
        lastGroup = g;
        groupCount = 0;
        out.push({ type: "header", label: g, count: 0 });
        groupStartIdx = out.length - 1;
      }
      out.push({ type: "photo", p });
      groupCount++;
    }
    if (groupStartIdx >= 0) out[groupStartIdx].count = groupCount;
    return out;
  }, [loaded]);

  return (
    <div ref={containerRef}>
      {/* Sticky header bar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginBottom: 16,
      }}>
        <div>
          <h1 style={{
            fontFamily: "Zen Maru Gothic, sans-serif", fontWeight: 900, fontSize: 32,
            margin: 0, color: "#272a18",
          }}>みんなのアルバム</h1>
          <div style={{
            fontFamily: "M PLUS Rounded 1c, sans-serif", fontSize: 13, color: "#6b6f53", marginTop: 4,
          }}>新しい順 · 全{TOTAL_PHOTOS.toLocaleString()}枚</div>
        </div>
        <Button variant="primary" icon="upload-simple" onClick={onUpload}>追加する</Button>
      </div>

      {/* Photo grid (square, dense) */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
        gap: 10,
      }}>
        {items.map((it, i) =>
          it.type === "header" ? (
            <DateHeader key={`h-${i}`} label={it.label} count={it.count} />
          ) : (
            <Photo key={it.p.id} p={it.p} onClick={() => onSelect(it.p)} />
          )
        )}
      </div>

      {/* Infinite-scroll sentinel + footer */}
      <div ref={sentinelRef} style={{ height: 60, marginTop: 24, display: "flex", justifyContent: "center", alignItems: "center" }}>
        {loaded < TOTAL_PHOTOS ? (
          <div style={{
            fontFamily: "M PLUS Rounded 1c, sans-serif", fontSize: 13, color: "#969b78",
            display: "inline-flex", alignItems: "center", gap: 8,
          }}>
            <i className="ph-duotone ph-circle-notch" style={{ fontSize: 18, animation: "spin 900ms linear infinite" }}></i>
            もっと読み込んでいます…
          </div>
        ) : (
          <div style={{
            fontFamily: "M PLUS Rounded 1c, sans-serif", fontSize: 13, color: "#969b78",
          }}>すべて表示しました</div>
        )}
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}

window.AlbumGrid = AlbumGrid;

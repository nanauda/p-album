/* global React, Header, AlbumGrid, UploadModal, HistoryFeed, LoginScreen, FAB, Mascot, Button */
const { useState: useStateApp } = React;

const SEED_HISTORY = [
  { id: 1, who: "ママ", color: "blossom", album: "アルバム", count: 12, when: "1時間まえ",
    thumbs: ["linear-gradient(135deg, #d3d8a8, #ffd092)","linear-gradient(135deg, #ffc9d6, #ffe6c8)","linear-gradient(135deg, #d2f0db, #d3d8a8)","linear-gradient(135deg, #ffe6c8, #ffc9d6)"] },
  { id: 2, who: "パパ", color: "sky", album: "アルバム", count: 3, when: "今朝",
    thumbs: ["linear-gradient(135deg, #d2f0db, #d3d8a8)","linear-gradient(135deg, #ffe6c8, #ffc9d6)","linear-gradient(135deg, #ebe6ff, #d3d8a8)"] },
  { id: 3, who: "おばあちゃん", color: "cream", album: "アルバム", count: 18, when: "きのう",
    thumbs: ["linear-gradient(135deg, #ffe6c8, #ffc9d6)","linear-gradient(135deg, #d3d8a8, #ffd092)","linear-gradient(135deg, #ebe6ff, #d3d8a8)","linear-gradient(135deg, #d2f0db, #ffe6c8)"] },
];

function Lightbox({ photo, onClose }) {
  if (!photo) return null;
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, background: "rgba(40,46,28,0.78)", backdropFilter: "blur(10px)",
      zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 32,
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        width: "min(720px, 90vw)", aspectRatio: "1 / 1",
        background: photo.gradient, borderRadius: 28,
        boxShadow: "0 24px 48px rgba(0,0,0,.30)",
      }}></div>
      <button onClick={onClose} style={{
        position: "absolute", top: 24, right: 24,
        width: 44, height: 44, borderRadius: 999,
        background: "rgba(251,253,242,0.95)", border: "none", cursor: "pointer",
      }}>
        <i className="ph ph-x" style={{ fontSize: 20, color: "#42452f" }}></i>
      </button>
    </div>
  );
}

function App() {
  const [authed, setAuthed] = useStateApp(false);
  const [uploadOpen, setUploadOpen] = useStateApp(false);
  const [history, setHistory] = useStateApp(SEED_HISTORY);
  const [toast, setToast] = useStateApp(null);
  const [lightbox, setLightbox] = useStateApp(null);
  const [showHistory, setShowHistory] = useStateApp(false);

  const handleUploadComplete = (count) => {
    setUploadOpen(false);
    const newEntry = {
      id: Date.now(), who: "あなた", color: "mint",
      album: "アルバム", count, when: "たった今",
      thumbs: [
        "linear-gradient(135deg, #d3d8a8, #ffd092)",
        "linear-gradient(135deg, #ffc9d6, #ffe6c8)",
        "linear-gradient(135deg, #d2f0db, #d3d8a8)",
        "linear-gradient(135deg, #ebe6ff, #d3d8a8)",
      ],
    };
    setHistory([newEntry, ...history]);
    setToast(`${count}枚の写真をアップロードしました`);
    setTimeout(() => setToast(null), 3000);
  };

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;

  return (
    <div style={{ minHeight: "100vh", background: "#fbfdf2" }}>
      <Header user={{ name: "ま", color: "blossom" }} />
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 40px", display: "grid", gridTemplateColumns: "1fr 320px", gap: 32, alignItems: "flex-start" }}>
        <main style={{ minWidth: 0 }}>
          <AlbumGrid onSelect={setLightbox} onUpload={() => setUploadOpen(true)} />
        </main>
        <aside style={{ position: "sticky", top: 96, display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
            <h2 style={{ fontFamily: "Zen Maru Gothic, sans-serif", fontWeight: 700, fontSize: 18, margin: 0, color: "#272a18" }}>
              さいきんの更新
            </h2>
            <button onClick={() => setShowHistory(!showHistory)} style={{
              background: "transparent", border: "none", cursor: "pointer",
              fontFamily: "M PLUS Rounded 1c, sans-serif", fontSize: 12, color: "#6b6f53", fontWeight: 600,
            }}>{showHistory ? "閉じる" : "すべて見る"}</button>
          </div>
          <HistoryFeed entries={showHistory ? history : history.slice(0,3)} />
          <div style={{
            background: "#fff", borderRadius: 22, padding: "18px 22px",
            boxShadow: "0 4px 12px rgba(60,70,30,.06)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
              <div style={{ fontFamily: "Zen Maru Gothic, sans-serif", fontWeight: 700, fontSize: 14, color: "#272a18" }}>使っている容量</div>
              <div style={{ fontFamily: "M PLUS Rounded 1c, sans-serif", fontSize: 12, color: "#969b78", whiteSpace: "nowrap" }}>4.2 / 50 GB</div>
            </div>
            <div style={{ height: 10, background: "#f3f5e3", borderRadius: 999, overflow: "hidden" }}>
              <div style={{ width: "8.4%", height: "100%", background: "linear-gradient(90deg, #97a05c, #b6bd7c)", borderRadius: 999 }}></div>
            </div>
          </div>
        </aside>
      </div>

      <FAB onClick={() => setUploadOpen(true)} />
      <UploadModal open={uploadOpen} onClose={() => setUploadOpen(false)} onComplete={handleUploadComplete} />
      <Lightbox photo={lightbox} onClose={() => setLightbox(null)} />

      {toast && (
        <div style={{
          position: "fixed", bottom: 32, left: "50%", transform: "translateX(-50%)",
          background: "#272a18", color: "#fff",
          padding: "14px 24px", borderRadius: 999,
          fontFamily: "M PLUS Rounded 1c, sans-serif", fontWeight: 600, fontSize: 14,
          boxShadow: "0 12px 28px rgba(40,46,28,.20)",
          display: "flex", alignItems: "center", gap: 10, zIndex: 300,
          animation: "toastIn 240ms cubic-bezier(.22,1,.36,1)",
        }}>
          <i className="ph-fill ph-check-circle" style={{ color: "#6fc88c", fontSize: 18 }}></i>
          {toast}
          <style>{`@keyframes toastIn { 0% { opacity:0; transform: translate(-50%, 12px); } 100% {opacity:1; transform: translate(-50%, 0);} }`}</style>
        </div>
      )}
    </div>
  );
}

window.App = App;

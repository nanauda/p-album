/* global React, Button, Mascot */
const { useState: useStateUpload, useRef: useRefUpload } = React;

function UploadModal({ open, onClose, onComplete }) {
  const [stage, setStage] = useStateUpload("idle"); // idle | uploading | done
  const [files, setFiles] = useStateUpload([]);
  const [albumName, setAlbumName] = useStateUpload("");
  const [progress, setProgress] = useStateUpload(0);
  const inputRef = useRefUpload(null);
  const dragCount = useRefUpload(0);
  const [dragActive, setDragActive] = useStateUpload(false);

  if (!open) return null;

  const palettes = [
    "linear-gradient(135deg, #d3d8a8, #ffb558)",
    "linear-gradient(135deg, #ffc9d6, #ffe6c8)",
    "linear-gradient(135deg, #d2f0db, #d3d8a8)",
    "linear-gradient(135deg, #ffe6c8, #ffc9d6)",
    "linear-gradient(135deg, #ebe6ff, #d3d8a8)",
  ];

  const addFakeFiles = (n) => {
    const next = Array.from({ length: n }, (_, i) => ({
      id: Date.now() + i,
      name: `IMG_${1000 + files.length + i}.jpg`,
      gradient: palettes[(files.length + i) % palettes.length],
    }));
    setFiles([...files, ...next]);
  };

  const startUpload = () => {
    setStage("uploading");
    let p = 0;
    const t = setInterval(() => {
      p += 7 + Math.random() * 10;
      if (p >= 100) {
        clearInterval(t);
        setProgress(100);
        setStage("done");
        setTimeout(() => onComplete(files.length), 1100);
      } else {
        setProgress(p);
      }
    }, 140);
  };

  const reset = () => {
    setFiles([]); setProgress(0); setStage("idle"); setAlbumName("");
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(40,46,28,0.45)", backdropFilter: "blur(8px)",
      zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
    }} onClick={() => { if (stage === "idle") onClose(); }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        width: 560, maxHeight: "85vh", overflow: "auto",
        background: "#fff", borderRadius: 32,
        boxShadow: "0 24px 48px rgba(60,70,30,.18), 0 4px 8px rgba(60,70,30,.08)",
        padding: 32,
      }}>
        {stage === "done" ? (
          <div style={{ textAlign: "center", padding: "16px 0 8px" }}>
            <div style={{ animation: "pkbounce 700ms cubic-bezier(.34,1.56,.64,1)" }}>
              <Mascot variant="wave" size={120} />
            </div>
            <h2 style={{
              fontFamily: "Zen Maru Gothic, sans-serif", fontWeight: 900, fontSize: 26,
              margin: "8px 0 6px", color: "#272a18",
            }}>アップロードできました！</h2>
            <p style={{
              fontFamily: "M PLUS Rounded 1c, sans-serif", fontSize: 14,
              color: "#6b6f53", margin: 0,
            }}>{files.length}枚の写真を追加したよ〜</p>
            <style>{`@keyframes pkbounce { 0%{transform:scale(.6);opacity:0} 60%{transform:scale(1.1)} 100%{transform:scale(1);opacity:1} }`}</style>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{
                fontFamily: "Zen Maru Gothic, sans-serif", fontWeight: 700, fontSize: 22,
                margin: 0, color: "#272a18",
              }}>写真をアップロード</h2>
              {stage === "idle" && (
                <button onClick={onClose} style={{
                  border: "none", background: "transparent", cursor: "pointer", padding: 6,
                }}>
                  <i className="ph ph-x" style={{ fontSize: 20, color: "#6b6f53" }}></i>
                </button>
              )}
            </div>

            {stage === "idle" && (
              <>
                <div
                  onDragOver={(e) => { e.preventDefault(); }}
                  onDragEnter={(e) => { e.preventDefault(); dragCount.current += 1; setDragActive(true); }}
                  onDragLeave={() => { dragCount.current -= 1; if (dragCount.current <= 0) setDragActive(false); }}
                  onDrop={(e) => { e.preventDefault(); setDragActive(false); dragCount.current = 0;
                    const n = e.dataTransfer.files?.length || 5;
                    addFakeFiles(Math.min(n, 8));
                  }}
                  onClick={() => inputRef.current?.click()}
                  style={{
                    border: `2px dashed ${dragActive ? "#97a05c" : "#c2c8a3"}`,
                    background: dragActive ? "#e9ecd2" : "#fbfdf2",
                    borderRadius: 24, padding: "36px 24px",
                    textAlign: "center", cursor: "pointer",
                    transition: "all 200ms",
                  }}>
                  <input ref={inputRef} type="file" multiple style={{ display: "none" }}
                    onChange={(e) => addFakeFiles(e.target.files?.length || 5)} />
                  <i className="ph-duotone ph-upload-simple" style={{ fontSize: 44, color: "#97a05c" }}></i>
                  <div style={{
                    fontFamily: "Zen Maru Gothic, sans-serif", fontWeight: 700, fontSize: 17,
                    marginTop: 12, color: "#272a18",
                  }}>ここに写真をドロップ</div>
                  <div style={{
                    fontFamily: "M PLUS Rounded 1c, sans-serif", fontSize: 13, color: "#6b6f53", marginTop: 6,
                  }}>または、クリックしてえらぶ</div>
                </div>

                {files.length > 0 && (
                  <div style={{ marginTop: 20 }}>
                    <div style={{
                      fontFamily: "M PLUS Rounded 1c, sans-serif", fontSize: 12, color: "#6b6f53",
                      letterSpacing: ".08em", textTransform: "uppercase", fontWeight: 600, marginBottom: 10,
                    }}>選んだ写真 · {files.length}枚</div>
                    <div style={{
                      display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(70px, 1fr))",
                      gap: 8, maxHeight: 200, overflow: "auto",
                    }}>
                      {files.map(f => (
                        <div key={f.id} style={{
                          aspectRatio: "1/1", borderRadius: 12, background: f.gradient,
                          boxShadow: "0 2px 6px rgba(40,46,28,.08)",
                        }}></div>
                      ))}
                    </div>

                    <div style={{ marginTop: 20 }}>
                      <label style={{
                        display: "block", fontFamily: "M PLUS Rounded 1c, sans-serif", fontWeight: 600, fontSize: 13,
                        color: "#272a18", marginBottom: 8,
                      }}>アルバム名（任意）</label>
                      <input value={albumName} onChange={(e) => setAlbumName(e.target.value)}
                        placeholder="例: 4月のおさんぽ"
                        style={{
                          width: "100%", boxSizing: "border-box",
                          padding: "12px 16px", background: "#fbfdf2", border: "1.5px solid #e7ecd0",
                          borderRadius: 14, outline: "none",
                          fontFamily: "M PLUS Rounded 1c, sans-serif", fontSize: 15, color: "#272a18",
                        }} />
                    </div>

                    <div style={{ marginTop: 24, display: "flex", gap: 12, justifyContent: "flex-end" }}>
                      <Button variant="ghost" onClick={reset}>やりなおす</Button>
                      <Button variant="primary" icon="upload-simple" onClick={startUpload}>
                        {files.length}枚をアップロード
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}

            {stage === "uploading" && (
              <div style={{ padding: "20px 0" }}>
                <div style={{ textAlign: "center", marginBottom: 24 }}>
                  <Mascot variant="default" size={96} />
                </div>
                <div style={{
                  fontFamily: "Zen Maru Gothic, sans-serif", fontWeight: 700, fontSize: 18,
                  textAlign: "center", color: "#272a18", marginBottom: 16,
                }}>{files.length}枚をアップロードしています…</div>
                <div style={{
                  height: 12, background: "#f3f5e3", borderRadius: 999, overflow: "hidden",
                }}>
                  <div style={{
                    height: "100%", width: `${progress}%`,
                    background: "linear-gradient(90deg, #97a05c, #b6bd7c)",
                    borderRadius: 999, transition: "width 140ms",
                  }}></div>
                </div>
                <div style={{
                  fontFamily: "M PLUS Rounded 1c, sans-serif", fontSize: 13, color: "#6b6f53",
                  textAlign: "center", marginTop: 10,
                }}>{Math.round(progress)}%</div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

window.UploadModal = UploadModal;

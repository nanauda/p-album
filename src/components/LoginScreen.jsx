import { Button, Logo, Mascot } from "./Primitives.jsx";

export default function LoginScreen({ onLogin }) {
  return (
    <div style={{
      minHeight: "100vh", background: "#fbfdf2",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 24,
      backgroundImage: "radial-gradient(#ffd092 1.4px, transparent 1.4px)",
      backgroundSize: "32px 32px",
    }}>
      <div style={{
        background: "#fff", borderRadius: 36, padding: "48px 56px",
        boxShadow: "0 24px 48px rgba(60,70,30,.10), 0 4px 8px rgba(60,70,30,.04)",
        maxWidth: 480, width: "100%", textAlign: "center",
      }}>
        <div style={{ marginBottom: 20, display: "flex", justifyContent: "center" }}>
          <Mascot variant="wave" size={140} />
        </div>
        <Logo height={48} />
        <p style={{
          fontFamily: "M PLUS Rounded 1c, sans-serif", fontSize: 15, color: "#6b6f53",
          margin: "20px 0 32px", lineHeight: 1.7,
        }}>家族のおもいでを、<br />そっと重ねていく場所。</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Button variant="primary" size="lg" onClick={onLogin}>はじめる</Button>
          <button onClick={onLogin} style={{
            background: "transparent", border: "none", cursor: "pointer", padding: 10,
            fontFamily: "M PLUS Rounded 1c, sans-serif", fontSize: 14, color: "#6b6f53",
          }}>すでにアカウントをお持ちの方</button>
        </div>
      </div>
    </div>
  );
}

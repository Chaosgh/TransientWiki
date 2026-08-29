import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ minHeight: "100svh", display: "grid", placeItems: "center", padding: 24, textAlign: "center" }}>
      <div>
        <p style={{ color: "#f2a01b", font: "700 .75rem var(--font-mono)", letterSpacing: ".15em" }}>404 // LOST IN THE REALM</p>
        <h1 style={{ margin: "12px 0", fontSize: "clamp(3rem, 10vw, 7rem)", letterSpacing: "-.06em" }}>Nothing here.</h1>
        <p style={{ color: "#a5adba", marginBottom: 28 }}>Diese Route existiert nicht · This route does not exist.</p>
        <Link href="/" style={{ display: "inline-block", padding: "13px 18px", border: "1px solid #ffc354", borderRadius: 2, background: "#f2a01b", color: "#1c0e05", fontWeight: 800 }}>Back to TransientRealm</Link>
      </div>
    </main>
  );
}

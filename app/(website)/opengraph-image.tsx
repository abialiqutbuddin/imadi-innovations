import { ImageResponse } from "next/og";

export const alt = "Imadi Innovations — software built around your workflow";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "64px 72px",
          background: "#f6f8fa",
          color: "#081421",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", width: "100%", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", fontSize: 24, fontWeight: 700, letterSpacing: 2 }}>
                IMADI INNOVATIONS
              </div>
            </div>
            <div style={{ display: "flex", color: "#1d4e73", fontSize: 18 }}>
              Operational clarity
            </div>
          </div>

          <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", maxWidth: 630, flexDirection: "column" }}>
              <div style={{ display: "flex", color: "#1d4e73", fontSize: 18, letterSpacing: 2 }}>
                CUSTOM SOFTWARE FOR OPERATIONAL WORK
              </div>
              <div style={{ display: "flex", marginTop: 24, fontSize: 72, fontWeight: 700, lineHeight: 0.98 }}>
                Software built around your workflow.
              </div>
            </div>

            <div style={{ display: "flex", width: 360, flexDirection: "column", gap: 16 }}>
              {["Problem", "Decision", "Delivered system", "Outcome"].map((label, index) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div
                    style={{
                      display: "flex",
                      width: 32,
                      height: 32,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 16,
                      background: index === 3 ? "#118a78" : "#1d4e73",
                      color: "white",
                      fontSize: 14,
                    }}
                  >
                    {index + 1}
                  </div>
                  <div style={{ display: "flex", flex: 1, paddingBottom: 10, borderBottom: "1px solid #b9c5ce", fontSize: 19 }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", height: 8, background: "#f26a2e" }} />
        </div>
      </div>
    ),
    size,
  );
}

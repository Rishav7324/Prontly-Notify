import { ImageResponse } from "next/og";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") ?? "Prontly Notify";
    const description =
      searchParams.get("description") ??
      "AI-assisted browser push notification platform";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
            padding: "60px 80px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "32px",
            }}
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="48" height="48" rx="12" fill="#3b82f6" />
              <path
                d="M14 18C14 15.7909 15.7909 14 18 14H30C32.2091 14 34 15.7909 34 18V26C34 28.2091 32.2091 30 30 30H26L20 34V30H18C15.7909 30 14 28.2091 14 26V18Z"
                fill="white"
              />
              <path
                d="M20 21H28M20 25H25"
                stroke="#3b82f6"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span
              style={{
                fontSize: 36,
                fontWeight: 700,
                color: "#f8fafc",
                fontFamily: "system-ui",
              }}
            >
              Prontly Notify
            </span>
          </div>
          <h1
            style={{
              fontSize: 56,
              fontWeight: 800,
              color: "#f8fafc",
              textAlign: "center",
              lineHeight: 1.2,
              margin: 0,
              maxWidth: 900,
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: 28,
              color: "#94a3b8",
              textAlign: "center",
              marginTop: "20px",
              maxWidth: 700,
              lineHeight: 1.4,
            }}
          >
            {description}
          </p>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch {
    return new Response("Failed to generate OG image", { status: 500 });
  }
}

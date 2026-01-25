import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// 1. Load Local Fonts
const interRegular = fetch(
  new URL('../../../../fonts/Inter_18pt-Regular.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

const interExtraBold = fetch(
  new URL('../../../../fonts/Inter_28pt-ExtraBold.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

// Helper to handle line breaks with "|"
function parseText(text: string) {
  if (!text) return '';
  const parts = text.split('|');
  return parts.map((part, index) => (
    <span key={index}>
      {part}
      {index < parts.length - 1 && <br />}
    </span>
  ));
}

const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  // Vercel preview deployments, use the system variable
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return 'http://localhost:3000';
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Get params from URL
    const title = searchParams.get('title') || 'Enterprise-Grade IT Solutions.';
    const subtitle = searchParams.get('subtitle') || 'Scalable software infrastructure for modern businesses';

    // Load fonts and logo
    const [fontExtraBold, fontRegular] = await Promise.all([interExtraBold, interRegular]);

    const baseUrl = getBaseUrl();
    const logoUrl = `${baseUrl}/Arvo_logo_rb.png`;

    // Fetch Logo Buffer
    const logoBuffer = await fetch(logoUrl).then(res => res.arrayBuffer());

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#1a1a1a', // Dark BG
            position: 'relative',
            fontFamily: '"Inter"',
          }}
        >
          {/* Top Green Strip */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '16px',
              backgroundColor: '#19e188',
            }}
          />

          {/* Logo (Top Left) */}
          <div
            style={{
              display: 'flex',
              position: 'absolute',
              top: 80,
              left: 70,
            }}
          >
            <img
              src={logoBuffer as any}
              height="100"
              alt="Arvo Logo"
              style={{ objectFit: 'contain' }}
            />
          </div>

          {/* Main Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              height: '100%',
              width: '1000px',
              paddingLeft: '80px',
              paddingRight: '150px',
              paddingTop: '60px',
            }}
          >
            <h1
              style={{
                fontSize: 96,
                fontWeight: 800,
                color: 'white',
                lineHeight: 1.1,
                marginBottom: 24,
                letterSpacing: '-0.03em',
                textAlign: 'left',
                display: 'block',
              }}
            >
              {/* USE THE HELPER HERE */}
              {parseText(title)}
            </h1>
            <p
              style={{
                fontSize: 36,
                fontWeight: 400,
                color: 'white',
                lineHeight: 1.4,
                width: '700px',
                textAlign: 'left',
                margin: 0,
                opacity: 0.9,
                display: 'block',
              }}
            >
              {/* USE THE HELPER HERE */}
              {parseText(subtitle)}
            </p>
          </div>

          {/* Bottom Right "L" Accent */}
          <div
            style={{
              position: 'absolute',
              bottom: 60,
              right: 60,
              display: 'flex',
            }}
          >
            {/* Horizontal Line */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '80px',
                height: '12px',
                backgroundColor: '#19e188',
              }}
            />
            {/* Vertical Line */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '12px',
                height: '80px',
                backgroundColor: '#19e188',
              }}
            />
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter',
            data: fontExtraBold,
            style: 'normal',
            weight: 800,
          },
          {
            name: 'Inter',
            data: fontRegular,
            style: 'normal',
            weight: 400,
          },
        ],
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, { status: 500 });
  }
}
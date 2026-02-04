import { ImageResponse } from 'next/og';

export const runtime = 'edge';

const fontRegularUrl = 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff';
const fontExtraBoldUrl = 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyYAZ9hjp-Ek-_EeA.woff';

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

export async function GET(request: Request) {
  // Logging for debugging
  const userAgent = request.headers.get('user-agent') || 'Unknown';
  console.log(`[OG HIT] UA: ${userAgent}`);

  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'Enterprise-Grade IT Solutions.';
    const subtitle = searchParams.get('subtitle') || 'Scalable software infrastructure for modern businesses';

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL || 'http://localhost:3000';
    const logoUrl = `${baseUrl}/Arvo_logo_rb.png`;

    const userAgentLower = userAgent.toLowerCase();
    
    // Update user agents
    const isSmallPlatform =
      userAgentLower.includes('instagram') ||
      userAgentLower.includes('whatsapp') ||
      userAgentLower.includes('facebookexternalhit');

    // If it's a Meta platform, use the smaller 630x331 ratio.
    const width = isSmallPlatform ? 630 : 1200;
    const height = isSmallPlatform ? 331 : 630; 
    const scale = isSmallPlatform ? 0.525 : 1;

    const [fontExtraBold, fontRegular, logoBuffer] = await Promise.all([
      fetch(fontExtraBoldUrl).then((res) => res.arrayBuffer()),
      fetch(fontRegularUrl).then((res) => res.arrayBuffer()),
      fetch(logoUrl).then((res) => res.arrayBuffer())
    ]);

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            backgroundColor: '#1a1a1a',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            width: '1200px',
            height: '630px',
            backgroundColor: '#1a1a1a',
            fontFamily: '"Inter"',
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '16px', backgroundColor: '#19e188' }} />
            <div style={{ display: 'flex', position: 'absolute', top: 80, left: 70 }}>
              <img src={logoBuffer as any} height="100" alt="Logo" style={{ objectFit: 'contain' }} />
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              height: '100%',
              width: '1100px',
              paddingLeft: '80px',
              paddingRight: '150px',
              paddingTop: '60px'
            }}>
              <h1 style={{
                fontSize: 96,
                fontWeight: 800,
                color: 'white',
                lineHeight: 1.1,
                marginBottom: 24,
                letterSpacing: '-0.03em',
                textAlign: 'left',
                display: 'block'
              }}>
                {parseText(title)}
              </h1>
              <p style={{ fontSize: 36, fontWeight: 400, color: 'white', lineHeight: 1.4, width: '700px', textAlign: 'left', margin: 0, opacity: 0.9, display: 'block' }}>
                {parseText(subtitle)}
              </p>
            </div>

            {/* Bottom Right "L" Accent */}
            <div style={{ position: 'absolute', bottom: 60, right: 60, display: 'flex' }}>
              <div style={{ position: 'absolute', bottom: 0, right: 0, width: '80px', height: '12px', backgroundColor: '#19e188' }} />
              <div style={{ position: 'absolute', bottom: 0, right: 0, width: '12px', height: '80px', backgroundColor: '#19e188' }} />
            </div>

          </div>
        </div>
      ),
      {
        width: width,
        height: height,
        fonts: [
          { name: 'Inter', data: fontExtraBold, weight: 800 },
          { name: 'Inter', data: fontRegular, weight: 400 },
        ],
        headers: { 'Vary': 'User-Agent' }
      }
    );
  } catch (e: any) {
    return new Response(`Failed to generate: ${e.message}`, { status: 500 });
  }
}
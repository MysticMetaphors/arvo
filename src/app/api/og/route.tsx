import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const runtime = 'nodejs';

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
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'Enterprise-Grade IT Solutions.';
    const subtitle = searchParams.get('subtitle') || 'Scalable software infrastructure for modern businesses';

    const fontRegularPath = join(process.cwd(), 'fonts', 'Inter_18pt-Regular.ttf');
    const fontExtraBoldPath = join(process.cwd(), 'fonts', 'Inter_28pt-ExtraBold.ttf');
    const logoPath = join(process.cwd(), 'public', 'Arvo_logo_rb.png');

    // 2. Read Files
    const fontRegular = readFileSync(fontRegularPath);
    const fontExtraBold = readFileSync(fontExtraBoldPath);
    const logoBuffer = readFileSync(logoPath);

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
            width: '1080px',
            height: '1080px',
            backgroundColor: '#1a1a1a',
            fontFamily: '"Inter"',
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '16px', backgroundColor: '#19e188' }} />
            <div style={{ display: 'flex', position: 'absolute', top: 120, left: 110 }}>
              <img src={`data:image/png;base64,${logoBuffer.toString('base64')}`} height="100" alt="Logo" style={{ objectFit: 'contain' }} />
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              height: '100%',
              width: '1000px',
              paddingLeft: '120px',
              paddingTop: '180px',
              paddingBottom: '180px',
            }}>
              <h1 style={{
                fontSize: 90,
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
              <p style={{ fontSize: 36, fontWeight: 400, color: 'white', lineHeight: 1.4, width: '800px', textAlign: 'left', margin: 0, opacity: 0.9, display: 'block' }}>
                {parseText(subtitle)}
              </p>
            </div>

            <div style={{ display: 'flex', position: 'absolute', bottom: -170, left: 60, width: '100%' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative',
                  width: '350px',
                  height: '400px',
                  transform: 'scale(1.3)',
                }}
              >

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                  <div style={{ width: '8px', height: '30px', backgroundColor: '#555', position: 'absolute', top: '-25px', left: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#00FF99', position: 'absolute', top: '-12px', boxShadow: `0 0 10px #00FF99` }} />
                  </div>

                  <div
                    style={{
                      width: '300px',
                      height: '110px',
                      backgroundColor: '#333',
                      border: `2px solid #00FF99`,
                      borderRadius: '12px',
                      position: 'relative',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                      background: 'linear-gradient(180deg, #444 0%, #222 100%)',
                    }}
                  >
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginTop: '10px' }}>

                      <div style={{ width: '80px', height: '80px', backgroundColor: '#000', borderRadius: '50%', border: '4px solid #555', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                        <div style={{ width: '70px', height: '70px', borderRadius: '50%', border: `2px solid #00FF99`, position: 'absolute' }} />
                        <div style={{ position: 'absolute', top: '-10px', width: '100%', height: '40px', backgroundColor: '#333', borderBottom: `2px solid #00FF99`, transform: 'rotate(-10deg)' }} />
                        <div style={{ width: '20px', height: '20px', backgroundColor: '#00FF99', borderRadius: '50%', boxShadow: `0 0 15px #00FF99` }} />
                      </div>

                      <div style={{ width: '30px', height: '50px', backgroundColor: '#222', border: '1px solid #444', borderRadius: '4px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '5px' }}>
                        <div style={{ width: '100%', height: '2px', backgroundColor: '#555' }} />
                        <div style={{ width: '100%', height: '2px', backgroundColor: '#555' }} />
                        <div style={{ width: '100%', height: '2px', backgroundColor: '#555' }} />
                      </div>

                      <div style={{ width: '80px', height: '80px', backgroundColor: '#000', borderRadius: '50%', border: '4px solid #555', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                        <div style={{ width: '70px', height: '70px', borderRadius: '50%', border: `2px solid #00FF99`, position: 'absolute' }} />
                        <div style={{ position: 'absolute', top: '-10px', width: '100%', height: '40px', backgroundColor: '#333', borderBottom: `2px solid #00FF99`, transform: 'rotate(10deg)' }} />
                        <div style={{ width: '20px', height: '20px', backgroundColor: '#00FF99', borderRadius: '50%', boxShadow: `0 0 15px #00FF99` }} />
                      </div>

                    </div>
                  </div>

                  <div style={{ width: '120px', height: '20px', backgroundColor: '#222', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', border: `1px solid #00FF99`, borderTop: 'none', marginTop: '-2px' }} />
                </div>

                <div style={{ display: 'flex', width: '60px', height: '50px', background: 'linear-gradient(90deg, #222, #444, #222)', borderLeft: '2px solid #555', borderRight: '2px solid #555', marginTop: '-5px' }}>
                  <div style={{ position: 'absolute', left: '-20px', height: '100%', width: '10px', backgroundColor: '#333', border: `1px solid #00FF99` }} />
                  <div style={{ position: 'absolute', right: '-20px', height: '100%', width: '10px', backgroundColor: '#333', border: `1px solid #00FF99` }} />
                </div>

                <div style={{ width: '320px', height: '60px', backgroundColor: '#333', borderRadius: '30px 30px 0 0', borderTop: `2px solid #00FF99`, position: 'relative', display: 'flex', justifyContent: 'space-between', padding: '0 20px' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#111', marginTop: '15px', border: '1px solid #444' }} />
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#111', marginTop: '15px', border: '1px solid #444' }} />
                </div>

                <div style={{ width: '200px', height: '120px', backgroundColor: '#2a2a2a', border: '1px solid #444', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div style={{ width: '140px', height: '80px', backgroundColor: '#111', border: `1px solid #00FF99`, borderRadius: '4px', display: 'flex', flexDirection: 'column', padding: '10px', gap: '5px' }}>
                    <div style={{ width: '100%', height: '4px', backgroundColor: '#00FF99', opacity: 0.5 }} />
                    <div style={{ width: '80%', height: '4px', backgroundColor: '#00FF99', opacity: 0.3 }} />
                    <div style={{ width: '40%', height: '4px', backgroundColor: '#00FF99', opacity: 0.8 }} />
                  </div>
                </div>
              </div>
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
        width: 1080,
        height: 1080,
        fonts: [
          { name: 'Inter', data: fontExtraBold.buffer, weight: 800, style: 'normal' },
          { name: 'Inter', data: fontRegular.buffer, weight: 400, style: 'normal' },
        ],
      }
    );
  } catch (e: any) {
    return new Response(`Failed to generate: ${e.message}`, { status: 500 });
  }
}
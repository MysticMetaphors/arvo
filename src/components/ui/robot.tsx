export default function Robot() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        width: '350px', // Scaled down container
        height: '400px',
        transform: 'scale(0.8)', // Adjust overall size here
      }}
    >
      {/* HEAD GROUP */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 10 }}>
        {/* Antenna */}
        <div style={{ width: '8px', height: '30px', backgroundColor: '#555', position: 'absolute', top: '-25px', left: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#00FF99', position: 'absolute', top: '-12px', boxShadow: `0 0 10px #00FF99` }} />
        </div>

        {/* Head Box */}
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
          {/* EYES CONTAINER */}
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginTop: '10px' }}>

            {/* LEFT EYE */}
            <div style={{ width: '80px', height: '80px', backgroundColor: '#000', borderRadius: '50%', border: '4px solid #555', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
              <div style={{ width: '70px', height: '70px', borderRadius: '50%', border: `2px solid #00FF99`, position: 'absolute' }} />
              {/* Eyelid */}
              <div style={{ position: 'absolute', top: '-10px', width: '100%', height: '40px', backgroundColor: '#333', borderBottom: `2px solid #00FF99`, transform: 'rotate(-10deg)', zIndex: 20 }} />
              {/* Pupil */}
              <div style={{ width: '20px', height: '20px', backgroundColor: '#00FF99', borderRadius: '50%', boxShadow: `0 0 15px #00FF99` }} />
            </div>

            {/* CENTER BRIDGE */}
            <div style={{ width: '30px', height: '50px', backgroundColor: '#222', border: '1px solid #444', borderRadius: '4px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '5px' }}>
              <div style={{ width: '100%', height: '2px', backgroundColor: '#555' }} />
              <div style={{ width: '100%', height: '2px', backgroundColor: '#555' }} />
              <div style={{ width: '100%', height: '2px', backgroundColor: '#555' }} />
            </div>

            {/* RIGHT EYE */}
            <div style={{ width: '80px', height: '80px', backgroundColor: '#000', borderRadius: '50%', border: '4px solid #555', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
              <div style={{ width: '70px', height: '70px', borderRadius: '50%', border: `2px solid #00FF99`, position: 'absolute' }} />
              {/* Eyelid */}
              <div style={{ position: 'absolute', top: '-10px', width: '100%', height: '40px', backgroundColor: '#333', borderBottom: `2px solid #00FF99`, transform: 'rotate(10deg)', zIndex: 20 }} />
              {/* Pupil */}
              <div style={{ width: '20px', height: '20px', backgroundColor: '#00FF99', borderRadius: '50%', boxShadow: `0 0 15px #00FF99` }} />
            </div>

          </div>
        </div>

        {/* Mouth Area */}
        <div style={{ width: '120px', height: '20px', backgroundColor: '#222', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', border: `1px solid #00FF99`, borderTop: 'none', marginTop: '-2px' }} />
      </div>

      {/* NECK */}
      <div style={{ width: '60px', height: '50px', background: 'linear-gradient(90deg, #222, #444, #222)', borderLeft: '2px solid #555', borderRight: '2px solid #555', zIndex: 5, marginTop: '-5px' }}>
        {/* Hydraulic Pistons */}
        <div style={{ position: 'absolute', left: '-20px', height: '100%', width: '10px', backgroundColor: '#333', border: `1px solid #00FF99` }} />
        <div style={{ position: 'absolute', right: '-20px', height: '100%', width: '10px', backgroundColor: '#333', border: `1px solid #00FF99` }} />
      </div>

      {/* SHOULDERS */}
      <div style={{ width: '320px', height: '60px', backgroundColor: '#333', borderRadius: '30px 30px 0 0', borderTop: `2px solid #00FF99`, position: 'relative', zIndex: 6, display: 'flex', justifyContent: 'space-between', padding: '0 20px' }}>
        {/* Left Shoulder Light */}
        <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#111', marginTop: '15px', border: '1px solid #444' }} />
        {/* Right Shoulder Light */}
        <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#111', marginTop: '15px', border: '1px solid #444' }} />
      </div>

      {/* BODY */}
      <div style={{ width: '200px', height: '120px', backgroundColor: '#2a2a2a', border: '1px solid #444', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {/* Chest Panel */}
        <div style={{ width: '140px', height: '80px', backgroundColor: '#111', border: `1px solid #00FF99`, borderRadius: '4px', display: 'flex', flexDirection: 'column', padding: '10px', gap: '5px' }}>
          <div style={{ width: '100%', height: '4px', backgroundColor: '#00FF99', opacity: 0.5 }} />
          <div style={{ width: '80%', height: '4px', backgroundColor: '#00FF99', opacity: 0.3 }} />
          <div style={{ width: '40%', height: '4px', backgroundColor: '#00FF99', opacity: 0.8 }} />
        </div>
      </div>
    </div>
  )
}
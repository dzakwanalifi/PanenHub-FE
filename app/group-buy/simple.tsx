'use client';

export default function GroupBuyPageSimple() {
  console.log('🔥 SIMPLEST GROUP BUY PAGE RENDERING');
  
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <h1 style={{ color: 'red', fontSize: '24px' }}>SIMPLE GROUP BUY PAGE</h1>
      <p>This is the simplest possible page with inline styles.</p>
      <p>If you can see this, React is working fine.</p>
      <p>Current time: {new Date().toLocaleString()}</p>
      
      <div style={{ 
        backgroundColor: 'yellow', 
        padding: '10px', 
        margin: '10px 0',
        border: '2px solid red' 
      }}>
        <strong>DEBUG: This content should ALWAYS be visible</strong>
      </div>
    </div>
  );
}

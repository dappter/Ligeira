const fs = require('fs');
const path = require('path');

const features = ['Plans', 'Coverage', 'DemandMap', 'Blog', 'Testimonials', 'Media', 'SEO', 'Analytics', 'Campaigns', 'Reports', 'Settings', 'Logs'];

features.forEach(f => {
  const dir = path.join('src', 'admin', 'features', f.charAt(0).toLowerCase() + f.slice(1));
  fs.mkdirSync(dir, { recursive: true });
  
  const content = `export function ${f}() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>${f}</h1>
        <p>Feature em desenvolvimento</p>
      </div>
      <div className="page-content">
        <div className="card glass" style={{padding: '40px', textAlign: 'center', color: 'var(--text-muted)'}}>
          Em breve...
        </div>
      </div>
    </div>
  )
}
`;
  fs.writeFileSync(path.join(dir, `${f}.tsx`), content);
});

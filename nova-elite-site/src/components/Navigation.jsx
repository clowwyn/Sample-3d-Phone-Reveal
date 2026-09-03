import './Navigation.css';

export default function Navigation({ activeSection = 'hero' }) {
  const links = [
    { id: 'hero', label: 'NOVA Elite' },
    { id: 'camera', label: 'Camera' },
    { id: 'design', label: 'Design' },
    { id: 'display', label: 'Display' },
    { id: 'materials', label: 'Craft' },
    { id: 'specs', label: 'Specs' },
  ];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="nav">
      <div className="nav-brand" onClick={() => scrollTo('hero')}>
        <span className="nav-brand-text">NOVA</span>
      </div>

      <div className="nav-links">
        {links.filter(l => l.id !== 'hero').map((link) => (
          <button
            key={link.id}
            className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
            onClick={() => scrollTo(link.id)}
          >
            {link.label}
          </button>
        ))}
      </div>

      <div className="nav-right">
        <button className="nav-cta">Reserve</button>
      </div>
    </nav>
  );
}

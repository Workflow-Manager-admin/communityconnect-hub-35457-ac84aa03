import React, { useState } from 'react';
import './App.css';

/**
 * Main container for CommunityConnect Hub
 *
 * Features:
 *  - User Registration & Profiles (stub)
 *  - Community News Feed (stub)
 *  - Events Calendar (stub)
 *  - Weather Updates (stub)
 *  - Messaging & Forums (stub)
 *  - Resource Directory (stub)
 *
 * Dark theme, responsive sidebar layout per specs.
 */

// PUBLIC_INTERFACE
function App() {
  // State for sidebar navigation
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // State for navigation tab ("home", "forums", "messages", etc.)
  const [navTab, setNavTab] = useState("home");

  // Sidebar links config
  const sidebarLinks = [
    { label: 'Home', key: 'home', icon: '🏠' },
    { label: 'News Feed', key: 'news', icon: '📰' },
    { label: 'Events', key: 'events', icon: '📆' },
    { label: 'Weather', key: 'weather', icon: '⛅' },
    { label: 'Forums', key: 'forums', icon: '💬' },
    { label: 'Messages', key: 'messages', icon: '✉️' },
    { label: 'Resources', key: 'resources', icon: '📚' },
    { label: 'Profile', key: 'profile', icon: '👤' }
  ];

  // Main content switcher
  function renderMainContent() {
    switch(navTab) {
      case "news":
        return <NewsFeed />;
      case "events":
        return <EventsCalendar />;
      case "weather":
        return <WeatherUpdates />;
      case "forums":
        return <Forums />;
      case "messages":
        return <Messaging />;
      case "resources":
        return <ResourceDirectory />;
      case "profile":
        return <UserProfile />;
      // Home view: News + Weather + Events highlights on homepage
      case "home":
      default:
        return (
          <>
            <section style={{marginBottom: "2rem"}}>
              <div style={{display: "flex", flexWrap: "wrap", gap: 24}}>
                <div style={{flex: '2 1 320px', minWidth: 300}}>
                  <NewsFeed compact />
                </div>
                <div style={{flex: '1 1 180px', minWidth: 160}}>
                  <WeatherUpdates />
                </div>
              </div>
            </section>
            <section>
              <EventsCalendar compact />
            </section>
          </>
        );
    }
  }

  // Accessibility: trap focus when sidebar open on mobile

  return (
    <div className="app cchub-root">
      {/* Top Navbar */}
      <nav className="cchub-navbar" style={{background: '#000', color: '#fff', borderBottom: '1px solid #222'}}>
        <div className="cchub-navbar-inner">
          <button
            className="cchub-sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Open navigation"
          >☰</button>
          <div className="cchub-logo"><span className="cchub-logo-symbol">*</span> CommunityConnect Hub</div>
          <div className="cchub-nav-actions">
            {/* Quick actions (sign up, messages) */}
            <button className="cchub-btn cchub-btn-accent" onClick={()=>setNavTab("profile")}>Profile</button>
            <button className="cchub-btn" onClick={()=>setNavTab("messages")}>Messages</button>
          </div>
        </div>
      </nav>
      
      {/* Sidebar for navigation and resources */}
      <aside className={`cchub-sidebar${sidebarOpen ? " cchub-sidebar-open" : ""}`}>
        <div className="cchub-sidebar-header">
          <span className="cchub-logo-symbol">*</span> Menu
          <button onClick={()=>setSidebarOpen(false)} className="cchub-sidebar-close" aria-label="Close navigation">×</button>
        </div>
        <ul className="cchub-sidebar-links">
          {sidebarLinks.map(link => (
            <li key={link.key}>
              <button
                className={`cchub-sidebar-link${navTab === link.key ? " active" : ""}`}
                onClick={() => { setNavTab(link.key); setSidebarOpen(false); }}
              >
                <span className="cchub-sidebar-link-icon">{link.icon}</span> {link.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="cchub-sidebar-section">
          <h4 style={{margin:'1.5em 0 0.6em 0'}}>Quick Resources</h4>
          <ResourceDirectory mini />
        </div>
      </aside>

      {/* Main body container */}
      <main className="cchub-main" onClick={()=> sidebarOpen && setSidebarOpen(false)}>
        <div className="cchub-main-inner">
          {renderMainContent()}
        </div>
      </main>
    </div>
  );
}

/* ---------------- Stub/Mock Feature Components ---------------- */

// PUBLIC_INTERFACE
function NewsFeed({compact}) {
  // This would fetch and render news stories
  return (
    <section className={`cchub-section cchub-news-feed${compact ? " compact" : ""}`}>
      <h2 className="cchub-section-title">Community News Feed</h2>
      <div className="cchub-section-content">
        <div className="cchub-card">
          <h4>Sample News Headline</h4>
          <p>Latest local news will appear here. (API integration pending)</p>
        </div>
        {compact ? null : (
        <div className="cchub-card">
          <h4>Sample Second Headline</h4>
          <p>More community news stories...<br/>&nbsp;</p>
        </div>)}
      </div>
    </section>
  );
}

// PUBLIC_INTERFACE
function EventsCalendar({compact}) {
  // This would fetch/render event calendar entries
  return (
    <section className={`cchub-section cchub-events-calendar${compact ? " compact" : ""}`}>
      <h2 className="cchub-section-title">Events Calendar</h2>
      <div className="cchub-section-content">
        <div className="cchub-card">
          <strong>Next Event:</strong> Community Meetup<br/>
          <span>Sunday, 14th July, 6:00 PM</span>
        </div>
        {!compact &&
        <div className="cchub-card">
          <strong>Upcoming:</strong> Farmer's Market<br/>
          <span>Saturday, 20th July, 9:00 AM</span>
        </div>}
      </div>
    </section>
  );
}

// PUBLIC_INTERFACE
function WeatherUpdates() {
  // Render weather widget, stub with sample data
  return (
    <section className="cchub-section cchub-weather-updates">
      <h2 className="cchub-section-title">Weather Updates</h2>
      <div className="cchub-weather-widget">
        <div className="cchub-weather-now">⛅ 23°C</div>
        <div className="cchub-weather-desc">Partly Cloudy</div>
        <div className="cchub-weather-meta">Sample Data (API pending)</div>
      </div>
    </section>
  );
}

// PUBLIC_INTERFACE
function Forums() {
  // Forum view stub
  return (
    <section className="cchub-section">
      <h2 className="cchub-section-title">Community Forums</h2>
      <div className="cchub-card">
        <p>Join the conversation! (Forum feature coming soon...)</p>
      </div>
    </section>
  );
}

// PUBLIC_INTERFACE
function Messaging() {
  // Messaging view stub
  return (
    <section className="cchub-section">
      <h2 className="cchub-section-title">Messages</h2>
      <div className="cchub-card">
        <p>Your messages and conversations will appear here. (Messaging integration pending)</p>
      </div>
    </section>
  );
}

// PUBLIC_INTERFACE
function ResourceDirectory({mini}) {
  // Resource directory stub
  const resources = [
    {label: "Emergency Contacts", desc: "911, 112, local police", icon: '🚨'},
    {label: "Public Library", desc: "123 Main St.", icon: '📚'},
    {label: "Community Center", desc: "45 Maple Ave.", icon: '🏫'},
    {label: "Local Businesses", desc: "See directory", icon: '🏬'}
  ];
  return (
    <div className={`cchub-section cchub-resource-directory${mini ? " mini" : ""}`}>
      <ul className="cchub-res-list">
        {resources.slice(0, mini ? 2 : resources.length).map((r, i) =>
          <li key={r.label} className="cchub-res-item">
            <span className="cchub-res-icon">{r.icon}</span>
            <span className="cchub-res-main">
              <div className="cchub-res-label">{r.label}</div>
              {!mini && <span className="cchub-res-desc">{r.desc}</span>}
            </span>
          </li>
        )}
      </ul>
      {!mini && <div style={{fontSize: "0.85em", color: "#888"}}>More resources coming soon...</div>}
    </div>
  );
}

// PUBLIC_INTERFACE
function UserProfile() {
  // User registration/profile stub
  return (
    <section className="cchub-section">
      <h2 className="cchub-section-title">Your Profile</h2>
      <div className="cchub-card">
        <div>
          <span role="img" aria-label="Profile">👤</span>
          <span style={{marginLeft: 8, fontWeight: 500}}>Username</span>
        </div>
        <p>Registration and profile editing coming soon.</p>
      </div>
    </section>
  );
}

// Export app
export default App;

import React, { useState, useRef, useEffect } from 'react';
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

  // Focus trap for sidebar, accessibility
  const sidebarRef = useRef(null);

  useEffect(() => {
    if (sidebarOpen && sidebarRef.current) {
      // Focus first interactive element in sidebar for accessibility
      const firstButton = sidebarRef.current.querySelector("button.cchub-sidebar-close, button.cchub-sidebar-link");
      if (firstButton) firstButton.focus();

      // Focus trap logic (esc closes sidebar on mobile)
      const handleKeyDown = (e) => {
        if (e.key === "Escape") setSidebarOpen(false);

        if (e.key === "Tab" && sidebarRef.current) {
          const tabbables = sidebarRef.current.querySelectorAll('button, [tabindex="0"]');
          if (tabbables.length === 0) return;
          const first = tabbables[0];
          const last = tabbables[tabbables.length - 1];
          if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          } else if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [sidebarOpen]);

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
            <section className="cchub-home-hero">
              <div className="cchub-hero-main">
                <div className="cchub-hero-welcome">
                  <h1 className="cchub-title focusable" tabIndex="0" aria-label="Welcome to CommunityConnect Hub">Welcome to <span className="cchub-brand-highlight">CommunityConnect Hub</span></h1>
                  <div className="cchub-description">
                    <span role="img" aria-label="community">🤝</span> Bringing your local community together with news, events, weather, and shared resources—one easy-to-use hub, 24/7.
                  </div>
                </div>
              </div>
              <div className="cchub-hero-row">
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

  // Make body unscrollable when sidebar open (mobile)
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  return (
    <div className={`app cchub-root${sidebarOpen ? " sidebar-open" : ""}`}>
      {/* Top Navbar */}
      <nav className="cchub-navbar" style={{background: '#000', color: '#fff', borderBottom: '1px solid #222'}} aria-label="Main navigation">
        <div className="cchub-navbar-inner">
          <button
            className="cchub-sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Open navigation"
            aria-expanded={sidebarOpen}
            aria-controls="cchub-sidenav"
          >☰</button>
          <div
            className="cchub-logo"
            tabIndex="0"
            aria-label="CommunityConnect Hub Home"
            role="banner"
            onClick={() => { setNavTab("home"); window.scrollTo(0,0); }}
            style={{ cursor: "pointer", outline: "none" }}
          >
            <span className="cchub-logo-symbol animate-pop" aria-hidden="true">*</span>
            CommunityConnect Hub
          </div>
          <div className="cchub-nav-actions">
            <button
              className={`cchub-btn cchub-btn-accent${navTab==="profile" ? " nav-active" : ""}`}
              onClick={()=>setNavTab("profile")}
              aria-current={navTab==="profile"}
            >
              <span role="img" aria-label="Profile">👤</span>
              <span className="btn-label">Profile</span>
            </button>
            <button
              className={`cchub-btn${navTab==="messages" ? " nav-active" : ""}`}
              onClick={()=>setNavTab("messages")}
              aria-current={navTab==="messages"}
            >
              <span role="img" aria-label="Messages">✉️</span>
              <span className="btn-label">Messages</span>
            </button>
          </div>
        </div>
      </nav>
      
      {/* Sidebar for navigation and resources */}
      <aside
        className={`cchub-sidebar${sidebarOpen ? " cchub-sidebar-open" : ""}`}
        id="cchub-sidenav"
        aria-label="Site sidebar"
        aria-modal={sidebarOpen}
        ref={sidebarRef}
        tabIndex="-1"
      >
        <div className="cchub-sidebar-header">
          <span className="cchub-logo-symbol animate-pop" aria-hidden="true">*</span>
          <span>Menu</span>
          <button
            onClick={()=>setSidebarOpen(false)}
            className="cchub-sidebar-close"
            aria-label="Close navigation"
            tabIndex={sidebarOpen ? 0 : -1}
            aria-hidden={!sidebarOpen}
          >×</button>
        </div>
        <ul className="cchub-sidebar-links" role="menu">
          {sidebarLinks.map(link => (
            <li key={link.key}>
              <button
                className={`cchub-sidebar-link transition-focus${navTab === link.key ? " active" : ""}`}
                onClick={() => { setNavTab(link.key); setSidebarOpen(false); }}
                aria-current={navTab === link.key}
                tabIndex={sidebarOpen ? 0 : -1}
                role="menuitem"
              >
                <span className="cchub-sidebar-link-icon">{link.icon}</span> {link.label}
                {navTab === link.key && <span className="cchub-nav-indicator" aria-hidden="true"></span>}
              </button>
            </li>
          ))}
        </ul>
        <div className="cchub-sidebar-section">
          <h4 style={{margin:'1.5em 0 0.6em 0', letterSpacing: "0.02em"}}>Quick Resources</h4>
          <ResourceDirectory mini />
        </div>
      </aside>

      {/* Overlay behind sidebar for mobile */}
      {sidebarOpen &&
        <div
          className="cchub-sidebar-overlay"
          aria-label="Sidebar overlay"
          tabIndex="0"
          onClick={()=>setSidebarOpen(false)}
        ></div>
      }

      {/* Main body container */}
      <main
        className="cchub-main"
        onClick={()=> sidebarOpen && setSidebarOpen(false)}
        tabIndex="-1"
        aria-label="Main content"
      >
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

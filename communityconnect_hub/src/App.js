import React, { useState, useRef, useEffect } from 'react';
import './App.css';

/**
 * Main container for CommunityConnect Hub — highly polished, modern, visually rich.
 * All UI is dark-themed, crisp, and community-centric with advanced card, gradient, and icon effects.
 */

// PUBLIC_INTERFACE
function App() {
  // State
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navTab, setNavTab] = useState("home");
  const sidebarRef = useRef(null);

  // Accessibility: Focus trap in sidebar
  useEffect(() => {
    if (sidebarOpen && sidebarRef.current) {
      const firstButton = sidebarRef.current.querySelector("button.cchub-sidebar-close, button.cchub-sidebar-link");
      if (firstButton) firstButton.focus();

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

  // Sidebar link configuration, including simple emoji icons
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

  // Content switcher for main area
  function renderMainContent() {
    switch(navTab) {
      case "news": return <NewsFeed />;
      case "events": return <EventsCalendar />;
      case "weather": return <WeatherUpdates />;
      case "forums": return <Forums />;
      case "messages": return <Messaging />;
      case "resources": return <ResourceDirectory />;
      case "profile": return <UserProfile />;
      case "home":
      default:
        return (
          <>
            <section className="cchub-home-hero">
              <div className="cchub-hero-main">
                <div className="cchub-hero-welcome">
                  <h1 className="cchub-title focusable" tabIndex="0" aria-label="Welcome to CommunityConnect Hub">
                    Welcome to <span className="cchub-brand-highlight">CommunityConnect&nbsp;Hub</span>
                  </h1>
                  <div className="cchub-description">
                    <span role="img" aria-label="community">🤝</span>{" "}
                    Bringing your local community together with news, events, weather, and shared resources—one easy-to-use hub, 24/7.
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

  // Body scroll lock on sidebar
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  return (
    <div className={`app cchub-root${sidebarOpen ? " sidebar-open" : ""}`}>
      {/* Top Navbar */}
      <nav className="cchub-navbar" aria-label="Main navigation">
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
            style={{ outline: "none" }}
          >
            <span className="cchub-logo-symbol animate-pop" aria-hidden="true">*</span>
            CommunityConnect&nbsp;Hub
          </div>
          <div className="cchub-nav-actions">
            <button
              className={`cchub-btn cchub-btn-accent${navTab === "profile" ? " nav-active" : ""}`}
              onClick={() => setNavTab("profile")}
              aria-current={navTab === "profile"}
            >
              <span role="img" aria-label="Profile">👤</span>
              <span className="btn-label">Profile</span>
            </button>
            <button
              className={`cchub-btn${navTab === "messages" ? " nav-active" : ""}`}
              onClick={() => setNavTab("messages")}
              aria-current={navTab === "messages"}
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
        aria-modal={sidebarOpen || undefined}
        ref={sidebarRef}
        tabIndex="-1"
      >
        <div className="cchub-sidebar-header">
          <span className="cchub-logo-symbol animate-pop" aria-hidden="true">*</span>
          <span>Menu</span>
          <button
            onClick={() => setSidebarOpen(false)}
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
                {navTab === link.key && (
                  <span className="cchub-nav-indicator" aria-hidden="true"></span>
                )}
              </button>
            </li>
          ))}
        </ul>
        <div className="cchub-sidebar-section">
          <h4 style={{margin:'1.3em 0 0.5em 0', letterSpacing: "0.02em"}}>Quick Resources</h4>
          <ResourceDirectory mini />
        </div>
      </aside>
      {/* Overlay behind sidebar for mobile */}
      {sidebarOpen && (
        <div
          className="cchub-sidebar-overlay"
          aria-label="Sidebar overlay"
          tabIndex="0"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      {/* Main body container */}
      <main
        className="cchub-main"
        onClick={() => sidebarOpen && setSidebarOpen(false)}
        tabIndex="-1"
        aria-label="Main content"
      >
        <div className="cchub-main-inner">{renderMainContent()}</div>
      </main>
    </div>
  );
}

/* =================== Modular Feature Components === */

// PUBLIC_INTERFACE
function NewsFeed({compact}) {
  // Empty/news stub for advanced empty state demo
  const articles = compact
    ? [{title: "Sample News Headline", snippet: "Latest local news will appear here. (API integration pending)"}]
    : [
        {title: "Sample News Headline", snippet: "Latest local news will appear here. (API integration pending)"},
        {title: "Second Headline", snippet: "More community news stories..." }
      ];
  return (
    <section className={`cchub-section cchub-news-feed${compact ? " compact" : ""}`}>
      <h2 className="cchub-section-title">
        <span role="img" aria-label="News Feed">📰</span> Community News Feed
      </h2>
      <div className="cchub-section-content">
        {articles.length === 0
          ? <div className="cchub-card-empty" aria-live="polite"><strong>No news available.</strong> Please check back soon.</div>
          : articles.map((a, i) => (
            <div className="cchub-card" tabIndex="0" key={a.title}>
              <h4>{a.title}</h4>
              <p>{a.snippet}</p>
              <div style={{display: 'flex', alignItems: 'center', gap: 10, marginTop: 12}}>
                <span className="cchub-avatar" aria-label="News">{i === 0 ? "📰" : "🌍"}</span>
                <span style={{color: "#92e2ffcc", fontWeight: 500, fontSize: "0.97em"}}>CommunityBot</span>
              </div>
            </div>
          ))}
      </div>
      {!compact && articles.length === 0 && (
        <div className="cchub-section-empty">No current news. Check back soon for updates from your community.</div>
      )}
    </section>
  );
}

// PUBLIC_INTERFACE
function EventsCalendar({compact}) {
  // Placeholder for future API events
  const events = compact
    ? [{title: "Next Event: Community Meetup", date: "Sunday, 14th July, 6:00 PM"}]
    : [
        {title: "Next Event: Community Meetup", date: "Sunday, 14th July, 6:00 PM"},
        {title: "Upcoming: Farmer's Market", date: "Saturday, 20th July, 9:00 AM"}
      ];
  return (
    <section className={`cchub-section cchub-events-calendar${compact ? " compact" : ""}`}>
      <h2 className="cchub-section-title">
        <span role="img" aria-label="Events">📆</span> Events Calendar
      </h2>
      <div className="cchub-section-content">
        {events.length === 0
          ? <div className="cchub-card-empty" aria-live="polite"><strong>No events available.</strong> Please check back!</div>
          : events.map((event, i) => (
              <div className="cchub-card" tabIndex="0" key={event.title}>
                <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
                  <span className="cchub-avatar" style={{fontSize: '1.45em'}} aria-label="Event">{i === 0 ? "🎉" : "🛒"}</span>
                  <div>
                    <strong>{event.title}</strong>
                    <br/>
                    <span style={{color: "#93cff0"}}>{event.date}</span>
                  </div>
                </div>
              </div>
            ))
        }
      </div>
      {!compact && events.length === 0 && (
        <div className="cchub-section-empty">No upcoming events found for your community.</div>
      )}
    </section>
  );
}

// PUBLIC_INTERFACE
function WeatherUpdates() {
  // Demo content for weather card; "API" data would replace
  const weatherData = {
    temp: "23°C", icon: "⛅", main: "Partly Cloudy", note: "Sample Data (API pending)"
  };
  return (
    <section className="cchub-section cchub-weather-updates">
      <h2 className="cchub-section-title">
        <span role="img" aria-label="Weather">⛅</span> Weather Updates
      </h2>
      <div className="cchub-weather-widget" tabIndex="0">
        <div className="cchub-weather-now">{weatherData.icon} {weatherData.temp}</div>
        <div className="cchub-weather-desc">{weatherData.main}</div>
        <div className="cchub-weather-meta">{weatherData.note}</div>
      </div>
    </section>
  );
}

// PUBLIC_INTERFACE
function Forums() {
  // Demo Forums card w/ enhanced empty state and icon
  return (
    <section className="cchub-section">
      <h2 className="cchub-section-title">
        <span role="img" aria-label="Forums">💬</span> Community Forums
      </h2>
      <div className="cchub-card" tabIndex="0" style={{display: "flex", alignItems: "center"}}>
        <span className="cchub-avatar" aria-label="Forum" style={{marginRight: 18, background: "linear-gradient(94deg,#8833ff 21%,#1dbaff 81%)"}}>💬</span>
        <span>Join the conversation! (Forum feature coming soon...)</span>
      </div>
      <div className="cchub-section-empty" style={{marginTop:10}}>No threads or posts yet—be the first to start a discussion when live!</div>
    </section>
  );
}

// PUBLIC_INTERFACE
function Messaging() {
  // Messaging stub — polish for empty inbox
  return (
    <section className="cchub-section">
      <h2 className="cchub-section-title">
        <span role="img" aria-label="Messages">✉️</span> Messages
      </h2>
      <div className="cchub-card" tabIndex="0" style={{display: "flex", alignItems: "center", gap: 15}}>
        <span className="cchub-avatar" aria-label="Message" style={{background: "linear-gradient(76deg,#f7cbfd 7%,#8833ff 92%)"}}>✉️</span>
        <span>Your messages and conversations will appear here. (Messaging integration pending)</span>
      </div>
      <div className="cchub-section-empty" style={{marginTop:8}}>Inbox is empty. Connect with your community as soon as direct messaging launches!</div>
    </section>
  );
}

// PUBLIC_INTERFACE
function ResourceDirectory({mini}) {
  // Resource icons and enhanced style
  const resources = [
    {label: "Emergency Contacts", desc: "911, 112, local police", icon: '🚨', avatar: "🚨"},
    {label: "Public Library", desc: "123 Main St.", icon: '📚', avatar: "📚"},
    {label: "Community Center", desc: "45 Maple Ave.", icon: '🏫', avatar: "🏫"},
    {label: "Local Businesses", desc: "See directory", icon: '🏬', avatar: "🏬"},
    {label: "Senior Services", desc: "Assistance & support", icon:'👴', avatar: "👵"},
    {label: "Youth Programs", desc: "Clubs & activities", icon:'🧒', avatar:"🧒"}
  ];
  return (
    <div className={`cchub-section cchub-resource-directory${mini ? " mini" : ""}`}>
      <ul className="cchub-res-list">
        {resources.slice(0, mini ? 2 : resources.length).map((r, i) =>
          <li key={r.label} className="cchub-res-item" tabIndex={mini ? -1 : 0}>
            <span className="cchub-res-icon" aria-label={r.label}>{r.avatar}</span>
            <span className="cchub-res-main">
              <div className="cchub-res-label">{r.label}</div>
              {!mini && <span className="cchub-res-desc">{r.desc}</span>}
            </span>
          </li>
        )}
      </ul>
      {!mini && (
        <div style={{fontSize: "0.92em", color: "#7d7d99", marginTop:8}}>More resources coming soon...</div>
      )}
    </div>
  );
}

// PUBLIC_INTERFACE
function UserProfile() {
  // Demo profile with avatar/icon
  return (
    <section className="cchub-section">
      <h2 className="cchub-section-title">
        <span role="img" aria-label="User">👤</span> Your Profile
      </h2>
      <div className="cchub-card" tabIndex="0" style={{display:"flex", alignItems:"center", gap:18}}>
        <span className="cchub-avatar" aria-label="User" style={{background: "linear-gradient(110deg, #8833ff 19%, #00ffe0 99%)"}}>👤</span>
        <div>
          <div style={{fontWeight:600, fontSize:"1.09em", marginBottom:2}}>Username</div>
          <span style={{color:"#aedaea"}}>Registration and profile editing coming soon.</span>
        </div>
      </div>
      <div className="cchub-section-empty">
        No personal details stored yet. Set up your profile soon!
      </div>
    </section>
  );
}

export default App;

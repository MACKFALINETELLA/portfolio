/*
  PERSONAL SETTINGS — update these three values before publishing:
  1. GITHUB_USERNAME: your GitHub username (not the profile URL).
  2. GITHUB_PROFILE_URL: your actual GitHub profile URL.
  3. CONTACT_EMAIL: the email address that should receive contact-form messages.
*/
const SITE_CONFIG = {
  GITHUB_USERNAME: "YOUR_GITHUB_USERNAME",
  CONTACT_EMAIL: "YOUR_EMAIL@example.com"
};

document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle");
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const year = document.getElementById("year");

  // Footer year
  if (year) year.textContent = new Date().getFullYear();

  // Theme: remember the visitor's preference where browser storage is available.
  let savedTheme = null;
  try { savedTheme = localStorage.getItem("mack-portfolio-theme"); } catch (_) {}
  const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
  setTheme(savedTheme || (prefersLight ? "light" : "dark"));

  function setTheme(theme) {
    root.dataset.theme = theme;
    if (themeToggle) {
      const lightMode = theme === "light";
      themeToggle.textContent = lightMode ? "☾" : "☼";
      themeToggle.setAttribute("aria-label", lightMode ? "Switch to dark mode" : "Switch to light mode");
      themeToggle.title = lightMode ? "Switch to dark mode" : "Switch to light mode";
    }
  }

  themeToggle?.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    try { localStorage.setItem("mack-portfolio-theme", nextTheme); } catch (_) {}
  });

  // Mobile navigation
  menuToggle?.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });
  navLinks?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
      menuToggle?.setAttribute("aria-label", "Open navigation");
    });
  });

  // Typing animation
  const typingElement = document.getElementById("typing-text");
  const phrases = ["building useful projects.", "solving problems with code.", "learning new technologies.", "creating digital experiences."];
  if (typingElement) {
    let phraseIndex = 0, charIndex = 0, deleting = false;
    const type = () => {
      const phrase = phrases[phraseIndex];
      typingElement.textContent = phrase.slice(0, charIndex);
      let delay = deleting ? 38 : 75;
      if (!deleting && charIndex < phrase.length) charIndex++;
      else if (!deleting) { deleting = true; delay = 1250; }
      else if (charIndex > 0) charIndex--;
      else { deleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; delay = 350; }
      window.setTimeout(type, delay);
    };
    type();
  }

  // Reveal elements as they enter the viewport.
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("is-visible"));
  }

  // GitHub public repository integration. Public API only; no token is needed.
  const githubProfileLink = document.getElementById("github-profile-link");
  const contactGithub = document.getElementById("contact-github");
  const githubStatus = document.getElementById("github-status");
  const githubRepos = document.getElementById("github-repos");
  const username = SITE_CONFIG.GITHUB_USERNAME.trim();

  if (username && username !== "YOUR_GITHUB_USERNAME") {
    const profileUrl = `https://github.com/${encodeURIComponent(username)}`;
    githubProfileLink.href = profileUrl;
    contactGithub.href = profileUrl;
    githubStatus.textContent = "Loading public repositories from GitHub…";

    fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=6`)
      .then(response => {
        if (!response.ok) throw new Error(`GitHub API returned ${response.status}`);
        return response.json();
      })
      .then(repositories => {
        if (!Array.isArray(repositories) || repositories.length === 0) {
          githubStatus.textContent = "No public repositories were found for this account yet.";
          return;
        }
        githubStatus.textContent = "Recently updated public repositories:";
        repositories
          .filter(repo => !repo.fork)
          .slice(0, 6)
          .forEach(repo => {
            const card = document.createElement("article");
            card.className = "repo-card reveal is-visible";
            const description = repo.description || "No description added yet.";
            const language = repo.language || "Code";
            const stars = Number.isFinite(repo.stargazers_count) ? repo.stargazers_count : 0;
            card.innerHTML = `
              <div class="repo-top"><span>PUBLIC REPOSITORY</span><span>★ ${stars}</span></div>
              <h3></h3><p></p>
              <div class="repo-meta"><span></span><span>Updated ${new Date(repo.updated_at).toLocaleDateString()}</span></div>
              <a class="repo-open" target="_blank" rel="noopener noreferrer">View repository ↗</a>`;
            card.querySelector("h3").textContent = repo.name;
            card.querySelector("p").textContent = description;
            card.querySelector(".repo-meta span").textContent = language;
            card.querySelector(".repo-open").href = repo.html_url;
            githubRepos.appendChild(card);
          });
        if (!githubRepos.children.length) githubStatus.textContent = "No non-fork public repositories were found.";
      })
      .catch(error => {
        console.error("Unable to load GitHub repositories:", error);
        githubStatus.textContent = "Repositories could not be loaded. Check the username, internet connection, or GitHub API rate limit.";
      });
  }

  // Contact form configuration. FormSubmit sends the form to your email after you
  // confirm its activation email the first time you submit it.
  const contactForm = document.getElementById("contact-form");
  const formNote = document.getElementById("form-note");
  if (SITE_CONFIG.CONTACT_EMAIL && SITE_CONFIG.CONTACT_EMAIL !== "YOUR_EMAIL@example.com") {
    contactForm.action = `https://formsubmit.co/${encodeURIComponent(SITE_CONFIG.CONTACT_EMAIL)}`;
    formNote.textContent = "Your message will be sent securely through FormSubmit. The first submission requires email activation.";
  }
});

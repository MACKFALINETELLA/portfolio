# Mack Tella — Portfolio Website

A fresh static HTML, CSS and JavaScript portfolio. It is built as a new project and does not overwrite your original `index.html`.

## Folder structure

```text
mack-tella-portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
│   ├── profile-placeholder.svg
│   ├── project-dashboard.svg
│   ├── project-game.svg
│   └── project-web.svg
├── documents/
│   └── CV-INSTRUCTIONS.txt
└── README.md
```

## Before publishing — personalize these details

Open `js/script.js` and update the values in `SITE_CONFIG`:

```js
const SITE_CONFIG = {
  GITHUB_USERNAME: "YOUR_GITHUB_USERNAME",
  CONTACT_EMAIL: "YOUR_EMAIL@example.com"
};
```

Use your actual GitHub username and email address. Do not leave the placeholder values.

### Profile photo

Replace `images/profile-placeholder.svg` with your own professional photo named `profile.jpg`, then update the image source in `index.html`:

```html
<img id="profile-image" src="images/profile.jpg" alt="Mack Tella">
```

A square or portrait photo works best. Use a photo you have permission to publish.

### CV download

Add your real CV as a PDF at:

```text
documents/Mack-Tella-CV.pdf
```

The Download CV button already points to that file. The source package does not contain a personal CV because education, work history, qualifications and contact details were not supplied.

### Project screenshots and live demos

The three project images are sample SVG illustrations, not screenshots of finished applications. Replace them with your own screenshots and change the relevant `src` values in `index.html`.

For each project, replace the `Project details` link (`href="#contact"`) with its real GitHub repository URL, and replace `Add live demo URL` with a real hosted demo link once available. Do not publish placeholder links as if they were live projects.

## Contact form setup

The form uses FormSubmit (`https://formsubmit.co`). Set `CONTACT_EMAIL` in `js/script.js` and make the form action in `index.html` point to the same email:

```html
<form id="contact-form" action="https://formsubmit.co/YOUR_EMAIL@example.com" method="POST">
```

The first time someone submits the form, FormSubmit sends an activation email to that address. Open that email and confirm it. After activation, messages can be delivered to the configured inbox. Test the form after publishing. FormSubmit is a third-party service, so its availability and terms apply.

## GitHub projects integration

After you set `GITHUB_USERNAME`, the site uses the GitHub public REST API to load up to six of your most recently updated, non-fork public repositories. No access token is required for this public data. GitHub API rate limits can occasionally prevent the cards from loading.

## Run the site locally

1. Extract this folder.
2. Open the `mack-tella-portfolio` folder.
3. Double-click `index.html` to open it in your browser.

For a local development server, open the folder in Visual Studio Code and use the Live Server extension.

## Publish with GitHub Pages

1. Sign in to GitHub and create a new repository, for example `mack-tella-portfolio`.
2. Set the repository to **Public** if you want the portfolio to be publicly accessible.
3. Extract this ZIP file on your computer.
4. Upload the *contents* of the `mack-tella-portfolio` folder to the root of the new repository. `index.html` must be in the repository root.
5. Commit the files to the `main` branch.
6. In the repository, open **Settings → Pages**.
7. Under **Build and deployment**, choose **Deploy from a branch**.
8. Select branch **main** and folder **/(root)**, then click **Save**.
9. Wait for the GitHub Pages deployment to complete. GitHub will show the published website URL in the Pages section.

After publishing, open the URL and test the mobile menu, theme switch, typing effect, repository cards, CV link and contact form.

## Notes

- This site uses Google Fonts. If the visitor is offline, the browser will use fallback fonts.
- The theme preference is stored in browser local storage.
- Scroll effects respect the visitor's reduced-motion preference.
- Never put passwords, API secrets or private access tokens in front-end JavaScript.

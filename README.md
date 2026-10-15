# Meganathan M — Portfolio

A multi-page portfolio built with HTML, CSS, vanilla JavaScript, and Bootstrap 5.3.3. The deployed site requires no build process, package installation, backend, or API keys. Bootstrap and fonts are included locally.

## Preview

Open `index.html` in a browser, or serve the folder with any static web server. The portfolio also works under a GitHub Pages repository subdirectory because its asset and page links are relative.

## Pages

- Home
- About & Skills
- Projects, with category filters
- Experience (no education section)
- Expertise
- Resume, with updated PDF download and a printable web summary
- Contact
- Six dedicated project pages in `projects/`
- A custom 404 page

## Publish on GitHub Pages

1. Create a GitHub repository, or open the repository you want to use.
2. Upload the portfolio files, keeping `index.html` at the repository root and preserving the `assets/` and `projects/` folders. Include `.nojekyll`.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select your default branch (usually `main`) and **/(root)**, then save.
6. Open the published URL shown by GitHub after deployment completes.

For a user site, name the repository `CoderMegaa.github.io`. For a project repository, GitHub serves the site under that repository's name. No domain has been configured and nothing has been published by this implementation.

## Content and behavior

- Shared animated development visuals, navigation background transitions, and card hover effects support light/dark themes and reduced-motion preferences.
- The theme follows the visitor's system preference initially. The theme button saves an explicit light/dark choice across pages.
- Each project card opens a real, separate HTML detail page. Project content is present in HTML without JavaScript.
- All 48 supplied screenshots are associated with their project. Gallery dialogs support previous/next buttons, arrow keys, Escape, and focus return.
- Screenshot assets contain permanently blurred application content to protect customer, employee, and business details. Original screenshots, the original archive, and service-account files are **not** included in the website.
- The updated resume PDF is downloadable and includes Java, Spring Boot, React, integration skills, and AI-assisted development. Education remains in the PDF and is omitted from the website text.
- The contact form opens an email draft. It does not send email automatically or store submissions. The visitor needs an email application configured, or can use the email link/address directly.
- Live business applications may require authorized accounts. External service availability and repository visibility are controlled by their owners.

## Editing

The site is plain HTML and can be edited directly. Shared styling is in `assets/style.css`; behavior is in `assets/app.js`; initial theme selection is in `assets/theme.js`.

The workspace also contains an optional authoring script at `tools/build.py`. It generates the HTML pages from the content in that file and `tools/gallery-manifest.json`. Python is only needed if you choose to regenerate pages; it is never required to view or deploy the site. Direct HTML edits will be overwritten if you run the generator afterward. Authoring tools are omitted from the ready-to-deploy ZIP.

The workspace's local QA script `tools/check-site.cjs` requires Playwright and an installed Chromium browser. Its bundled-runtime path is specific to this workstation; update the import to your own Playwright installation if reusing it elsewhere. The website itself has no dependency on that script.

## Design

Navy, ivory, and teal; Manrope body text and Space Grotesk headings; responsive layouts; keyboard-visible focus states; reduced-motion support; and local SVG icons. Bootstrap is licensed under MIT; the included Google Fonts are distributed under the SIL Open Font License (see `assets/fonts/Manrope-OFL.txt` and `assets/fonts/SpaceGrotesk-OFL.txt`).

## Private and temporary files

Do not publish `tmp/`, local QA screenshots, original business screenshots, archives supplied for review, or any service-account credentials. The included `.gitignore` excludes temporary output. The deployment ZIP contains only the public website and these instructions.

The downloadable resume can be regenerated with `tools/build_resume.py` using Python and ReportLab. It draws on the shared content in `tools/build.py`.

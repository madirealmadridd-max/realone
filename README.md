# Wild Clothing (Mobile)

Static website structure for GitHub + Vercel deployment.

## Recommended repository structure

```
wild-clothing-mobile/
├── index.html                  # rename or copy from Home page.html
├── cart-page.html
├── checkout-page.html
├── clothing-page.html
├── accesories-belt.html
├── accesories-sunglasses.html
├── accessories-underwear.html
├── login-page.html
├── new-arrivals-page.html
├── perfume-french-avenue.html
├── perfumes-parfum-complet.html
├── perfumes.html
├── sale.html
├── shop-page.html
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
├── .gitignore
└── README.md
```

## Deployment notes

1. Rename `Home page.html` to `index.html` so Vercel serves your home page at the root URL.
2. Prefer consistent file names without spaces, using hyphens instead.
3. Put shared CSS, JS, and images under `assets/` and update references in your HTML.
4. Commit the repo and push it to GitHub.

## Connect to Vercel

1. Create a new GitHub repository and push this folder.
2. In Vercel, choose "Import Project" and select the GitHub repo.
3. For a static site, there is no build command required. Use the root directory as the project root.
4. Deploy. Vercel will serve `index.html` automatically.

## Optional `vercel.json`

If you want explicit routing, add a `vercel.json` file:

```json
{
  "rewrites": [
    { "source": "/", "destination": "/index.html" }
  ]
}
```

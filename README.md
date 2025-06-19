
# Zoho Bigin Widget with Automatic Token Refresh

## Setup

1. Copy `.env.example` to `.env` and fill in:
   - `ZOHO_CLIENT_ID`
   - `ZOHO_CLIENT_SECRET`
   - `ZOHO_REFRESH_TOKEN`

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. Open your browser at: `http://localhost:3000`

## Deployment (Render/Railway)

- Push to GitHub.
- Deploy as a web service.
- Add these environment variables:
  - `ZOHO_CLIENT_ID`
  - `ZOHO_CLIENT_SECRET`
  - `ZOHO_REFRESH_TOKEN`

## Embedding

```html
<iframe
  src="https://your-deployed-url.com"
  width="100%"
  height="600"
  style="border:none;"
></iframe>
```

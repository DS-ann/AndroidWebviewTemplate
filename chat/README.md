# TwoChat

A small 1-to-1 browser chat with WebRTC voice/video calling.

## Architecture

- `chat/` is the static GitHub Pages frontend.
- `cloudflare/` is the Cloudflare Worker API/signaling backend.
- Cloudflare D1 stores the last 200 messages per room.
- A Durable Object relays WebRTC signaling between the two browsers.
- Audio/video is peer-to-peer via WebRTC; it is not stored by this project.

## Deploy the backend

1. Install Wrangler and log in to Cloudflare.
2. From `cloudflare/`, create a D1 database named `twochat`.
3. Put the returned database ID into `wrangler.toml` as `database_id`.
4. Run the D1 migration.
5. Deploy the Worker.
6. Copy the Worker HTTPS URL into `chat/config.js`.
7. Commit/push `config.js`; GitHub Pages will deploy the `chat/` directory.

Example commands:

```bash
cd cloudflare
npx wrangler d1 create twochat
npx wrangler d1 migrations apply twochat --remote
npx wrangler deploy
```

Do not put Cloudflare API tokens or secrets in `chat/` or any browser JavaScript.

## Privacy note

The room code is the access credential in this first version. Anyone who knows it can join that room, so use a long random code and don't publish it.

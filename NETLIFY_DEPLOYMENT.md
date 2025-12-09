# Netlify Serverless Deployment Configuration

Your application has been configured for serverless deployment on Netlify. This document explains the setup and deployment process.

## Configuration Overview

### Build Process
The application uses a custom build script that:
1. Builds the React frontend with Vite → `dist/public/`
2. Builds the Express server as CommonJS → `dist/index.cjs` (for local development)
3. Builds a serverless function handler → `.netlify/functions/api.js`

### File Structure
```
.netlify/functions/api.js          # Serverless function entry point
dist/public/                       # Frontend static files
dist/index.cjs                     # Traditional HTTP server (local dev only)
netlify.toml                       # Netlify configuration
```

### Architecture

**Serverless Handler** (`netlify/functions/api.ts`):
- Wraps the Express app with `serverless-http`
- Caches the initialized app for better cold start performance
- Handles all requests routed to `/.netlify/functions/api/*`

**Express App** (`server/index.ts`):
- Refactored to export `createApp()` function
- Works in both HTTP server mode (development) and serverless mode (production)
- Sets `NODE_ENV=production` automatically for serverless functions

**Data Management**:
- Projects and testimonials are imported as JSON modules
- Data is bundled directly with the serverless function
- No filesystem access required in serverless environment

### Routing Configuration

The `netlify.toml` file configures:

```toml
[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/api:splat"
  status = 200
```

This routes all API requests (`/api/*`) to the serverless function while static files are served from `dist/public/`.

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

This handles client-side routing for the React SPA.

## Deployment Steps

### Prerequisites
- Netlify account (free tier works)
- GitHub/GitLab/Bitbucket repository connected to Netlify
- Node.js 18+ (Netlify default)

### Deploy to Netlify

1. **Connect Repository**
   - Go to https://app.netlify.com
   - Click "Add new site" → "Import an existing project"
   - Select your Git provider and repository

2. **Configure Build Settings**
   - Build command: `tsx script/build.ts`
   - Publish directory: `dist/public`
   - Functions directory: `.netlify/functions`
   - Node version: 20.x (or higher)

3. **Deploy**
   - Netlify automatically triggers a build on push
   - Monitor the deployment in the Netlify dashboard
   - Your site will be live at `https://your-site.netlify.app`

### Environment Variables

If your application needs environment variables in production:
1. Go to your Netlify site settings
2. Navigate to "Build & Deploy" → "Environment"
3. Add your variables (e.g., API keys, database URLs)

## Development

### Local Development
```bash
npm run dev
```

This starts:
- Vite dev server (frontend) on port 5000
- Express server with HMR
- No serverless function wrapper needed

### Local Testing with Netlify CLI
```bash
npm install -g netlify-cli
netlify dev
```

This simulates the Netlify environment locally:
- Runs the serverless function
- Serves static files
- Tests redirects and routing

### Build for Production
```bash
npm run build
```

This creates:
- Minified frontend in `dist/public/`
- Bundled serverless function in `.netlify/functions/api.js`
- Single CommonJS bundle in `dist/index.cjs` (unused in Netlify)

## Key Configuration Files

### netlify.toml
Main Netlify configuration with:
- Build command
- Functions directory
- Redirects for API and SPA routing
- Dev server settings

### script/build.ts
Custom build script that:
- Bundles dependencies to reduce cold start
- Uses esbuild for server bundles
- Builds serverless function separately

### server/index.ts
Refactored to export `createApp()` function:
- Works with both HTTP server and serverless modes
- Conditional startup for development vs. serverless

### netlify/functions/api.ts
Serverless handler:
- Wraps Express with `serverless-http`
- Caches handler for performance
- Exports default function for Netlify

## Performance Optimizations

1. **Bundle Analysis**: Dependencies are bundled into the serverless function to reduce cold start times
2. **Caching**: The serverless handler caches the initialized app across invocations
3. **Code Splitting**: Frontend uses dynamic imports to reduce chunk sizes
4. **Static Serving**: CSS and JS are served directly from `dist/public/` without going through the function

## Troubleshooting

### 404 on API Endpoints
- Check that redirects in `netlify.toml` are correct
- Verify the serverless function built successfully
- Check function logs in Netlify dashboard

### Data Files Not Found
- Ensure JSON files are imported in `server/routes.ts`
- Verify they're bundled in the serverless function

### Build Failures
- Check Node version (18+ required)
- Review build logs in Netlify dashboard
- Test build locally with `npm run build`

### Static Assets Not Loading
- Verify `dist/public/` is set as publish directory
- Check asset paths are relative
- Inspect network requests in browser DevTools

## Next Steps

1. Push your code to Git:
   ```bash
   git add .
   git commit -m "Configure for Netlify serverless deployment"
   git push
   ```

2. Connect to Netlify and trigger deployment

3. Test your deployed site:
   - Frontend functionality
   - API endpoints
   - Contact form (if applicable)
   - Error handling

## Additional Resources

- [Netlify Functions Documentation](https://docs.netlify.com/functions/overview/)
- [Netlify CLI Reference](https://docs.netlify.com/cli/get-started/)
- [Express.js on Netlify](https://docs.netlify.com/functions/on-demand-builders/)
- [serverless-http Documentation](https://github.com/dougmoscrop/serverless-http)

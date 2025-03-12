# Astro CSP Headers Example

This project showes how to implement Content Security Policy (CSP) headers in
Astro projects.

**Features:**

- CSP header implementation
- Custom script for SRI (scripts/generate-csp-header.mjs)

## 📋 Table of Contents

- [Project Structure](#-project-structure)
- [Configuration](#️-configuration)
  - [Cloudflare Caveats](#cloudflare-caveats)
  - [Basic CSP Setup](#basic-csp-setup)
  - [Script for SRI](#script-for-sri)
- [CSP Directives Reference](#-csp-directives-reference)
  - [Common Directives](#common-directives)
  - [Secure Values](#secure-values)
- [Usage](#-usage)
- [Security Testing](#-security-testing)

## 🚀 Project Structure

```
scripts/
├── generate-csp-header.mjs
src/
└── sriHashes.mjs
```

## ⚙️ Configuration

We use [Astro Shield](https://github.com/kindspells/astro-shield) for CSP
configuration. This project is designed to work on Cloudflare. If you want to
use it with Vercel or Netlify, simply delete the `scripts` folder and follow the
Astro Shield guide.

### Cloudflare Caveats

There are some caveats when using Cloudflare. We add hashes using Astro Shield,
which generates them in `src/generated/sriHashes.mjs.` It's preferable to add
this file to `.gitignore`, as it doesn’t need to be committed. However, in this
project, it’s included for demonstration purposes.

The script `scripts/generate-csp-header.mjs` collects inline scripts and styles,
adds them to the CSP header along with other necessary configurations, and
writes them to `_headers` after build time.

Cloudflare currently has a 2000-character limit for `_headers`,
[see more information here](https://developers.cloudflare.com/pages/configuration/headers/).
If you exceed this limit, note that Cloudflare concatenates headers using a
comma `( , )`, while CSP uses a semicolon `( ; )`, which prevents splitting.
Netlify does not have this issue, so if your CSP exceeds 2000 characters,
consider using Netlify or Cloudflare Functions to handle it.

Additionally, you need to add it to your package scripts:

```json
"postbuild": "node scripts/generate-csp-header.mjs"
```

On Cloudflare, this may not execute as expected during the build process.
Instead, use the following build command:

`pnpm run build && node scripts/generate-csp-header.mjs`

### Basic CSP Setup

Configure your CSP directives in `public/_headers`:

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 0
  Referrer-Policy: no-referrer
  Permissions-Policy: accelerometer=(), autoplay=(), camera=(), cross-origin-isolated=(), display-capture=(), document-domain=(), encrypted-media=(self), fullscreen=(self), geolocation=(), gyroscope=(), keyboard-map=(), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=(), sync-xhr=(), usb=(), web-share=(self), xr-spatial-tracking=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  # Access-Control-Allow-Origin: https://example.com
```

### Script for SRI

In `scripts/generate-csp-header.mjs`:

```ts
import fs from 'fs/promises';
import path from 'path';
import {
  inlineScriptHashes,
  inlineStyleHashes,
} from '../src/generated/sriHashes.mjs';

const headersPath = path.join(process.cwd(), 'dist', '_headers');

async function generateCSPHeader() {
  try {
    // Combine all script hashes
    const scriptHashes = new Set([...inlineScriptHashes]);

    // Combine all style hashes
    const styleHashes = new Set([...inlineStyleHashes]);

    // Generate CSP header
    const cspHeader =
      `Content-Security-Policy: default-src 'self'; object-src 'self'; script-src 'self' ${Array.from(
        scriptHashes
      )
        .map(hash => `'${hash}'`)
        .join(' ')}; connect-src 'self'; style-src 'self' ${Array.from(
        styleHashes
      )
        .map(hash => `'${hash}'`)
        .join(
          ' '
        )}; base-uri 'self'; img-src 'self' https://example.com; frame-ancestors 'none'; worker-src 'self'; manifest-src 'none'; form-action 'self';`.trim();

    // Read existing _headers file
    let headersContent = await fs.readFile(headersPath, 'utf-8');

    headersContent += '\n  ' + cspHeader;

    // Write updated content back to _headers file
    await fs.writeFile(headersPath, headersContent);

    console.log('CSP header generated and _headers file updated successfully.');
  } catch (error) {
    console.error('Error generating CSP header:', error);
  }
}

generateCSPHeader();
```

## 📝 CSP Directives Reference

### Common Directives

| Directive     | Purpose                       | Example Value            |
| ------------- | ----------------------------- | ------------------------ |
| `default-src` | Fallback for other directives | `'self'`                 |
| `script-src`  | Controls script sources       | `'self' 'nonce-{NONCE}'` |
| `style-src`   | Controls style sources        | `'self' 'unsafe-inline'` |
| `img-src`     | Controls image sources        | `'self' data: https:`    |
| `connect-src` | Controls fetch, XHR, etc.     | `'self'`                 |
| `font-src`    | Controls font loading         | `'self'`                 |

### Secure Values

- `'self'`: Only allow resources from the same origin
- `'none'`: Block all resources of this type
- `'unsafe-inline'`: Allow inline resources (use with caution)
- `'strict-dynamic'`: Enable trust propagation for scripts
- `'nonce-{NONCE}'`: Allow resources with matching nonce

## 📚 Usage

1. Clone this repository
2. Install dependencies: `pnpm install`
3. Configure CSP directives in `public/_headers` and
   `scripts/generate-csp-header.mjs`
4. Run `pnpm dev` to start development server
5. Run `pnpm build` to build your site

## 🔍 Security Testing

Verify your CSP implementation using:

- [Google CSP Evaluator](https://csp-evaluator.withgoogle.com/)
- [Security Headers](https://securityheaders.com/)
- Browser Developer Tools (Console for CSP violations)

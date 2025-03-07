import fs from 'fs/promises';
import path from 'path';
import {
  perResourceSriHashes,
  inlineScriptHashes,
  inlineStyleHashes,
  extScriptHashes,
  extStyleHashes,
} from '../src/generated/sriHashes.mjs';

const headersPath = path.join(process.cwd(), 'dist', '_headers');

async function generateCSPHeader() {
  try {
    // Combine all script hashes
    const scriptHashes = new Set([
      ...inlineScriptHashes,
      ...extScriptHashes,
      ...Object.values(perResourceSriHashes.scripts),
    ]);

    // Combine all style hashes
    const styleHashes = new Set([
      ...inlineStyleHashes,
      ...extStyleHashes,
      ...Object.values(perResourceSriHashes.styles),
    ]);

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

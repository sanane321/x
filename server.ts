import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import express from 'express';
import { createServer as createViteServer } from 'vite';

// Determine root directory equivalents for ES module and CommonJS bundle formats
const getDirname = () => {
  try {
    return __dirname;
  } catch {
    return path.dirname(fileURLToPath(import.meta.url));
  }
};
const dirPath = getDirname();

const seoMetadata: Record<string, { title: string; description: string; keywords: string }> = {
  'home': {
    title: "X Elektrik | Heavy-Duty Electrical Engineering & Grid Automation",
    description: "X Elektrik is a premium electrical contracting and heavy industrial power distribution engineer. Partnering with data centers, high-voltage networks, and green infrastructure.",
    keywords: "electrical engineering, grid automation, heavy voltage, power distribution, energy systems"
  },
  'services': {
    title: "X-Services Engineering | High-Tension Substation & Grid Commissioning",
    description: "Our world-class electrical contracting services cover medium to high-voltage grid integrations, BIM-clash prevention, substation assembly, and advanced safety interlocks.",
    keywords: "substation engineering, grid commissioning, BIM engineering, high voltage"
  },
  'products': {
    title: "X-Products Showcase | Medium Voltage Switchgear & MegaPack BESS Solutions",
    description: "Explore our ready-to-deploy industrial grid solutions, including custom XE-MVS Switchgear, Tesla MegaPack grid-scale batteries, dynamic ATS, and high-power EV chargers.",
    keywords: "medium voltage switchgear, battery energy storage systems, BESS, automatic transfer switch"
  },
  'estimator': {
    title: "X-Estimator | SmartGrid Project Cost & Asset Configurator",
    description: "Get real-time electrical engineering project cost estimates. Configure load currents, voltage steps, auxiliary safety integrations, and get instant timeline quotes.",
    keywords: "electrical project estimator, industrial power calculator, grid cost configured"
  },
  'portfolio': {
    title: "X-Portfolio | High-Fidelity Infrastructure Engineering Case Studies",
    description: "Explore our successful projects including the hyperscale Dublin Datacenter Backup Integration, Solar Array Grid stabilizing in Turkey, and complex grid-interlock operations.",
    keywords: "datacenter electrification, green energy microgrid, engineering case studies"
  },
  'blog': {
    title: "X-Insights Blog | Power Grid Security, BIM Engineering & IEEE Standards",
    description: "Stay ahead of the industry with advanced articles about double-feed ATS designs, electromagnetic interference safety, substation operations, and BIM modeling standards.",
    keywords: "substation safety, BIM clashing, IEEE compliance, grid security"
  },
  'about': {
    title: "About X Elektrik | Global Heavy Infrastructure Leaders Since 1998",
    description: "Driven by rigorous engineering standards, X Elektrik empowers critical industries with redundant power flows and zero-fault high-voltage transmission structures.",
    keywords: "electrical contracting firm, redundant power systems, heavy traction leaders"
  },
  'careers': {
    title: "Careers at X Elektrik | Shape the Next-Generation High-Voltage Grid",
    description: "Join our elite engineering force. We are recruiting lead protection engineers, BIM designers, commissioning experts, and field technicians with top tier compensation packages.",
    keywords: "electrical engineering jobs, BIM modeler careers, high voltage technician recruitment"
  },
  'contact': {
    title: "Contact X Elektrik | High-Tension Engineering Submissions & RFP",
    description: "Initiate your high-capacity grid configuration or RFP with us. Speak with our lead project engineers for data-center, renewable hub, and traction projects.",
    keywords: "electrical RFP, heavy power contact, grid connection consultation"
  },
  'downloads': {
    title: "Engineering Blueprints & Documentation | X Elektrik Technical Assets",
    description: "Download certified electrical schematics, Revit family models, compliance certificates, and IEEE grid integration papers for our complete product suite.",
    keywords: "revit families electrical, IEEE compliance documentation, switchgear specifications"
  },
  'iot': {
    title: "X-IoT Active Grid Control Center | Telemetry & Waveform Diagnostics",
    description: "Monitor real-time high-tension grid telemetry, harmonic distortions (THD), automatic phase alignment, and remote liquid-cooled BESS discharging metrics live.",
    keywords: "industrial iot grid, utility telemetry, power factor optimization, SCADA harmonics"
  }
};

async function startServer() {
  const app = express();
  const PORT = 3000;
  const isProd = process.env.NODE_ENV === 'production';

  let vite: any;
  if (!isProd) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom'
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production, EXCLUDING index.html itself so SSR handles requests
    // In production, dirPath is already /app/dist because server.cjs is in /dist
    const distPath = isProd ? dirPath : path.resolve(dirPath, 'dist');
    app.use(express.static(distPath, { index: false }));
  }

  // Handle SSR Rendering for page paths
  app.get('*', async (req, res, next) => {
    const url = req.originalUrl.split('?')[0]; // strip query params
    
    // Skip file-like assets (e.g. .png, .js, .css, etc) so that express.static or vite can handle them
    if (url.includes('.') || url.startsWith('/api/') || url.startsWith('/@fs/')) {
      return next();
    }

    try {
      // 1. Read index.html template
      let template: string;
      let renderFn: (path: string) => { html: string };

      if (!isProd) {
        // Dev: read template from root & transform using Vite compiled plugins/styles
        template = fs.readFileSync(path.resolve(dirPath, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        // Dev: load entry-server on the fly
        const serverModule = await vite.ssrLoadModule('/src/entry-server.tsx');
        renderFn = serverModule.render;
      } else {
        // Prod: read built template from dist/ (which is sibling to server.cjs as dirPath resolves to dist/)
        template = fs.readFileSync(path.resolve(dirPath, 'index.html'), 'utf-8');
        // Load the compiled SSR bundle from dist/entry-server.js
        const entryServerPath = pathToFileURL(path.resolve(dirPath, 'entry-server.js')).href;
        const serverModule = await import(entryServerPath);
        renderFn = serverModule.render;
      }

      // 2. Identify active route for SEO metadata lookup
      const routeName = url.replace(/^\//, '').toLowerCase() || 'home';
      const meta = seoMetadata[routeName] || seoMetadata['home'];

      // 3. Render the React App
      const { html } = renderFn(url);

      // 4. Inject rendered HTML into template
      let htmlOutput = template.replace(`<div id="root"></div>`, `<div id="root">${html}</div>`);

      // 5. Inject SEO title, description, and keywords
      const seoTags = `
    <title>${meta.title}</title>
    <meta name="description" content="${meta.description}" />
    <meta name="keywords" content="${meta.keywords}" />
    <meta property="og:title" content="${meta.title}" />
    <meta property="og:description" content="${meta.description}" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${meta.title}" />
    <meta name="twitter:description" content="${meta.description}" />
      `;

      // Replace pre-existing generic title or inject into head
      if (htmlOutput.includes('<title>')) {
        htmlOutput = htmlOutput.replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`);
      }
      htmlOutput = htmlOutput.replace('</head>', `${seoTags}\n</head>`);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(htmlOutput);
    } catch (e: any) {
      if (!isProd) {
        vite.ssrFixStacktrace(e);
      }
      console.error(e.stack);
      res.status(500).end(e.stack);
    }
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();

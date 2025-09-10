import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.join(__dirname, 'src', 'pages');
if (!fs.existsSync(pagesDir)) {
  fs.mkdirSync(pagesDir, { recursive: true });
  console.log('Carpeta src/pages creada.');
}

const pageName = process.argv[2];
if (!pageName) {
  console.log('Por favor, indica el nombre de la página. Ejemplo: npm run setup-pages about');
  process.exit(1);
}

const fileName = `${pageName}.js`;
const filePath = path.join(pagesDir, fileName);
if (fs.existsSync(filePath)) {
  console.log(`El archivo ${fileName} ya existe.`);
  process.exit(0);
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const template =
  `export default function ${capitalize(pageName)}() {\n  return \`<h1>${capitalize(pageName)}</h1><p>Esta es la página ${pageName}.</p>\`;\n}\n`;

fs.writeFileSync(filePath, template);
console.log(`Archivo ${fileName} creado en src/pages.`);

// --- Actualizar routes.js ---
const routesPath = path.join(pagesDir, 'routes.js');
let routesContent = fs.readFileSync(routesPath, 'utf-8');
const importLine = `import ${capitalize(pageName)} from './${pageName}.js';`;
const routeLine = `  '/${pageName}': ${capitalize(pageName)},`;

// Insertar importación antes del primer export
const lines = routesContent.split('\n');
let exportIndex = lines.findIndex(line => line.includes('export const routes'));
let lastImportIndex = lines.slice(0, exportIndex).reduce((acc, line, idx) => line.startsWith('import') ? idx : acc, -1);
lines.splice(lastImportIndex + 1, 0, importLine);

// Insertar ruta antes del cierre del objeto
let routesStart = lines.findIndex(line => line.includes('export const routes'));
let objStart = lines.findIndex((line, idx) => idx > routesStart && line.includes('{'));
let objEnd = lines.findIndex((line, idx) => idx > objStart && line.includes('}'));
lines.splice(objEnd, 0, routeLine);

fs.writeFileSync(routesPath, lines.join('\n'));
console.log(`Ruta '/${pageName}' agregada a routes.js.`);

const fs = require("fs");

const files = [
    "database.js",
    "ranks.js",
    "teams.js",
    "uniforms.js",
    "bot.js",
    "commands.js",
    "index.js"
];

let output = `// =====================================
// HaxLeague BR | 3v3
// Headless Build - Gerado automaticamente
// =====================================

`;

let totalLines = 0;

for (const file of files) {
    if (!fs.existsSync(file)) {
        console.log(`⚠️ Arquivo ${file} não encontrado, pulando...`);
        continue;
    }

    let code = fs.readFileSync(file, "utf8");
    let lines = code.split('\n').length;
    totalLines += lines;

    // Remove require do Node
    code = code.replace(/const\s+.*?\s*=\s*require\(.*?\);/g, "");

    // Remove module.exports
    code = code.replace(/module\.exports\s*=\s*[\s\S]*?;/g, "");
    code = code.replace(/exports\.[a-zA-Z_]+\s*=\s*[^;]*;/g, "");
    code = code.replace(/module\.exports\s*=\s*\{[\s\S]*?\};/g, "");
    code = code.replace(/export\s+default\s+[^;]*;/g, "");
    code = code.replace(/export\s+\{[^}]*\}/g, "");

    output += `

// =====================================
// ${file}
// =====================================

`;
    output += code;
    output += "\n\n";

    console.log(`📄 ${file} - ${lines} linhas`);
}

// Limpeza final
output = output.replace(/module\.exports[\s\S]*?;/g, "");
output = output.replace(/require\([\s\S]*?\);/g, "");
output = output.replace(/export\s+default\s+[^;]*;/g, "");
output = output.replace(/export\s+\{[^}]*\}/g, "");

// Remove múltiplas linhas em branco
output = output.replace(/\n{3,}/g, "\n\n");

// Remove linhas vazias no início
output = output.trimStart();

fs.writeFileSync("headless.js", output);

console.log(`
✅ headless.js criado com sucesso!

📊 Estatísticas:
   📁 Arquivos compilados: ${files.filter(f => fs.existsSync(f)).length}/${files.length}
   📝 Total de linhas: ${totalLines}
   💾 Tamanho: ${(fs.statSync("headless.js").size / 1024).toFixed(2)} KB

🚀 Arquivo pronto para uso!
`);
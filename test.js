
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fs = require('fs');
const html = fs.readFileSync('c:/Users/x/Desktop/PROJETOS IBRASE/site da GASCTPNA completo/temp_areadeloginintegra/matricula.html', 'utf8');
const dom = new JSDOM(html, { runScripts: 'dangerously', url: 'http://localhost/?instituto=GASCTPNA' });

const espacosGASCTPNA = [
    { id: 22, nome: 'Conselheiro Josino', cidade: 'Campos dos Goytacazes' },
    { id: 23, nome: 'Batelão (Barra Seca)', cidade: 'São Francisco de Itabapoana' },
    { id: 24, nome: 'Vila Nova', cidade: 'Conceição de Macabu' }
];

const nucleosGASCTPNA = [
    { id: 38, projeto_id: 5, espaco_id: 24, ativo: true },
    { id: 40, projeto_id: 5, espaco_id: 23, ativo: true },
    { id: 44, projeto_id: 5, espaco_id: 22, ativo: true }
];

dom.window.fetch = function(url) {
    if(url.includes('espacos-get')) return Promise.resolve({ json: () => Promise.resolve(espacosGASCTPNA) });
    if(url.includes('nucleos-get')) return Promise.resolve({ json: () => Promise.resolve(nucleosGASCTPNA) });
    return Promise.resolve({ json: () => Promise.resolve([]) });
};

setTimeout(() => {
    dom.window.carregarCidadesPorProjeto(5);
    setTimeout(() => {
        const select = dom.window.document.getElementById('cidade_id');
        console.log('Options:', Array.from(select.options).map(o => o.value));
    }, 500);
}, 100);


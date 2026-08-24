
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fs = require('fs');
const html = fs.readFileSync('c:/Users/x/Desktop/PROJETOS IBRASE/site da GASCTPNA completo/temp_areadeloginintegra/matricula.html', 'utf8');
const dom = new JSDOM(html, { runScripts: 'dangerously', url: 'http://localhost/?instituto=GASCTPNA' });

const espacosGASCTPNA = [
    { id: 22, nome: 'Conselheiro Josino', cidade: 'Campos dos Goytacazes' },
    { id: 23, nome: 'Batelão (Barra Seca)', cidade: 'São Francisco de Itabapoana' },
    { id: 24, nome: 'Vila Nova', cidade: 'Conceição de Macabu' },
    { id: 21, nome: 'Centro', cidade: 'São João da Barra' }
];

const nucleosGASCTPNA = [
    { id: 38, nome: 'Vila Nova', projeto_id: 5, espaco_id: 24, ativo: true },
    { id: 40, nome: 'Batelão', projeto_id: 5, espaco_id: 23, ativo: true },
    { id: 44, nome: 'Conselheiro Josino', projeto_id: 5, espaco_id: 22, ativo: true },
    { id: 39, nome: 'Centro', projeto_id: 5, espaco_id: 21, ativo: true }
];

dom.window.fetch = function(url) {
    if(url.includes('espacos-get')) return Promise.resolve({ json: () => Promise.resolve(espacosGASCTPNA) });
    if(url.includes('nucleos-get')) return Promise.resolve({ json: () => Promise.resolve(nucleosGASCTPNA) });
    if(url.includes('buscarprojetos')) return Promise.resolve({ json: () => Promise.resolve([{ id: 5, nome: 'Proj 5', limite_idade: 99 }]) });
    return Promise.resolve({ json: () => Promise.resolve([]) });
};

setTimeout(() => {
    dom.window.carregarCidadesPorProjeto(5);
    setTimeout(() => {
        dom.window.preencherBairrosGlobal(espacosGASCTPNA, nucleosGASCTPNA, 'São Francisco de Itabapoana', 5);
        const bs = dom.window.document.getElementById('bairro_id');
        console.log('Bairros for São Francisco:', Array.from(bs.options).map(o => o.textContent));
    }, 500);
}, 100);


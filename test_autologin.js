
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fs = require('fs');

const html = fs.readFileSync('c:/Users/x/Desktop/PROJETOS IBRASE/site da GASCTPNA completo/temp_areadeloginintegra/index.html', 'utf8');

const dom = new JSDOM(html, { 
    url: 'http://localhost/?autologin=true', 
    runScripts: 'dangerously' 
});

dom.window.localStorage.setItem('usuario_email', 'tioninja14@gmail.com');
dom.window.localStorage.setItem('usuario_senha', 'Y@nzinho15');

dom.window.fetch = async function(url) {
    console.log('Fetching:', url);
    return {
        text: async () => 'login aprovado\ntioninja14@gmail.com\nYAN\n229999999\n1444\n'
    };
};

setTimeout(() => {
    console.log('Form user:', dom.window.document.getElementById('username')?.value);
    console.log('Form pass:', dom.window.document.getElementById('password')?.value);
    console.log('Error div:', dom.window.document.getElementById('login-error')?.textContent);
}, 1000);


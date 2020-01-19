const lint = require('../src')
const fs = require('fs');

test('Тест страниц из 1 задания на исключения', () => {
    let indexText = fs.readFileSync('test/page/index.json', 'utf8');
    let productText = fs.readFileSync('test/page/index.json', 'utf8');

    lint(indexText)
    lint(productText)
    lint('asd')
});

const lint = require('../src')
const fs = require('fs');

test('Блок Warning;Размер текста;text-size-0-errors', () => {
    let text = fs.readFileSync('test/warning-text/text-size-0-errors.json', 'utf8');
    expect(lint(text).length).toBe(0);
});

test('Блок Warning;Размер текста;text-size-2-errors', () => {
    let text = fs.readFileSync('test/warning-text/text-size-2-errors.json', 'utf8');
    expect(lint(text).length).toBe(2);
});

test('Блок Warning;Размер кнопки;button-size-1-errors', () => {
    let text = fs.readFileSync('test/warning-text/button-size-1-errors.json', 'utf8');
    expect(lint(text).length).toBe(1);
});


test('Блок Warning;Размер кнопки;text-size-0-errors', () => {
    let text = fs.readFileSync('test/warning-text/button-size-0-errors.json', 'utf8');
    expect(lint(text).length).toBe(0);
});

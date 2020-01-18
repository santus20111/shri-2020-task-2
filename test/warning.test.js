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

test('Блок Warning;Размер текста;text-size-2-errors(2)', () => {
    let text = fs.readFileSync('test/warning-text/text-size-2-errors(2).json', 'utf8');
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


test('Блок Warning;Кнопка перед placeholder;button-placeholder-0-errors.json', () => {
    let text = fs.readFileSync('test/warning-text/button-placeholder-0-errors.json', 'utf8');
    expect(lint(text).length).toBe(0);
});


test('Блок Warning;Кнопка перед placeholder;button-placeholder-1-errors.json', () => {
    let text = fs.readFileSync('test/warning-text/button-placeholder-1-errors.json', 'utf8');
    expect(lint(text).length).toBe(1);
});

test('Блок Warning;Кнопка перед placeholder;button-placeholder-1-errors(2).json', () => {
    let text = fs.readFileSync('test/warning-text/button-placeholder-1-errors(2).json', 'utf8');
    expect(lint(text).length).toBe(1);
});

test('Блок Warning;Кнопка перед placeholder;button-placeholder-1-errors(3).json', () => {
    let text = fs.readFileSync('test/warning-text/button-placeholder-1-errors(3).json', 'utf8');
    expect(lint(text).length).toBe(1);
});

test('Блок Warning;Кнопка перед placeholder;button-placeholder-1-errors(4).json', () => {
    let text = fs.readFileSync('test/warning-text/button-placeholder-1-errors(4).json', 'utf8');
    expect(lint(text).length).toBe(1);
});


test('Блок Warning;Кнопка перед placeholder;button-placeholder-2-errors.json', () => {
    let text = fs.readFileSync('test/warning-text/button-placeholder-2-errors.json', 'utf8');
    expect(lint(text).length).toBe(2);
});

test('Блок Warning;Размер placeholder;placeholder-size-0-errors.json', () => {
    let text = fs.readFileSync('test/warning-text/placeholder-size-0-errors.json', 'utf8');
    expect(lint(text).length).toBe(0);
});

test('Блок Warning;Размер placeholder;placeholder-size-1-errors.json', () => {
    let text = fs.readFileSync('test/warning-text/placeholder-size-1-errors.json', 'utf8');
    expect(lint(text).length).toBe(1);
});

test('Блок Grid;Фукнциональные/Маркетинговые блоки;functional-offer-0-errors.json', () => {
    let text = fs.readFileSync('test/grid/functional-offer-0-errors.json', 'utf8');
    expect(lint(text).length).toBe(0);
});

test('Блок Grid;Фукнциональные/Маркетинговые блоки;functional-offer-1-errors.json', () => {
    let text = fs.readFileSync('test/grid/functional-offer-1-errors.json', 'utf8');
    expect(lint(text).length).toBe(1);
});

test('Блок Headers;H1 единственный на странице;h1-several-0-errors.json', () => {
    let text = fs.readFileSync('test/headers/h1-several-0-errors.json', 'utf8');
    expect(lint(text)
        .filter(error => error.code === 'TEXT.SEVERAL_H1')
        .length).toBe(0);
});

test('Блок Headers;H1 единственный на странице;h1-several-1-errors.json', () => {
    let text = fs.readFileSync('test/headers/h1-several-1-errors.json', 'utf8');
    expect(lint(text)
        .filter(error => error.code === 'TEXT.SEVERAL_H1')
        .length).toBe(2);
});

test('Блок Headers;H2 перед H1;h2-before-h1-1-errors.json', () => {
    let text = fs.readFileSync('test/headers/h2-before-h1-1-errors.json', 'utf8');
    expect(lint(text)
        .filter(error => error.code === 'TEXT.INVALID_H2_POSITION')
        .length).toBe(1);
});

test('Блок Headers;H3 перед H2;h3-before-h2-1-errors.json', () => {
    let text = fs.readFileSync('test/headers/h3-before-h2-1-errors.json', 'utf8');
    expect(lint(text)
        .filter(error => error.code === 'TEXT.INVALID_H3_POSITION')
        .length).toBe(1);
});

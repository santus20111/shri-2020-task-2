const lint = require('../src')
const fs = require('fs');

test('Блок Warning;Размер текста одинаковый на одном уровне', () => {
    let text = fs.readFileSync('test/warning-text/text-size-0-errors.json', 'utf8');
    let  errors = lint(text)
        .filter(error => {
            return error.code === 'WARNING.TEXT_SIZES_SHOULD_BE_EQUAL'
        })

    expect(errors.length).toBe(0);
});

test('Блок Warning;Разные размеры текста на 1 уровне', () => {
    let text = fs.readFileSync('test/warning-text/text-size-1-level-1-errors.json', 'utf8');
    let errors = lint(text)
        .filter(error => {
            return error.code === 'WARNING.TEXT_SIZES_SHOULD_BE_EQUAL'
        })

    expect(errors.length).toBe(1);
});


test('Блок Warning;Разные размеры текста на разных уровнях', () => {
    let text = fs.readFileSync('test/warning-text/text-size-2-level-1-errors.json', 'utf8');

    let errors = lint(text)
        .filter(error => {
            return error.code === 'WARNING.TEXT_SIZES_SHOULD_BE_EQUAL'
        })

    expect(errors.length).toBe(1);
});

test('Блок Warning;Рызные размеры текста с миксом', () => {
    let text = fs.readFileSync('test/warning-text/text-size-mix-2-level-1-errors.json', 'utf8');

    let errors = lint(text)
        .filter(error => {
            return error.code === 'WARNING.TEXT_SIZES_SHOULD_BE_EQUAL'
        })

    expect(errors.length).toBe(1);
});


test('Блок Warning;Размер кнопки;button-size-1-errors', () => {
    let text = fs.readFileSync('test/warning-text/button-size-1-errors.json', 'utf8');

    let errors = lint(text)
        .filter(error => {
            return error.code === 'WARNING.INVALID_BUTTON_SIZE'
        })

    expect(errors.length).toBe(1);
});


test('Блок Warning;Размер кнопки;text-size-0-errors', () => {
    let text = fs.readFileSync('test/warning-text/button-size-0-errors.json', 'utf8');

    let errors = lint(text)
        .filter(error => {
            return error.code === 'WARNING.INVALID_BUTTON_SIZE'
        })

    expect(errors.length).toBe(0);
});


test('Блок Warning;Кнопка перед placeholder;button-placeholder-0-errors.json', () => {
    let text = fs.readFileSync('test/warning-text/button-placeholder-0-errors.json', 'utf8');

    let errors = lint(text)
        .filter(error => {
            return error.code === 'WARNING.INVALID_BUTTON_POSITION'
        })

    expect(errors.length).toBe(0);
});

test('Блок Warning;Кнопка перед placeholder;button-placeholder-0-errors(1).json', () => {
    let text = fs.readFileSync('test/warning-text/button-placeholder-0-errors(1).json', 'utf8');

    let errors = lint(text)
        .filter(error => {
            return error.code === 'WARNING.INVALID_BUTTON_POSITION'
        })

    expect(errors.length).toBe(0);
});

test('Блок Warning;Кнопка перед placeholder;button-placeholder-0-errors(2).json', () => {
    let text = fs.readFileSync('test/warning-text/button-placeholder-0-errors(2).json', 'utf8');

    let errors = lint(text)
        .filter(error => {
            return error.code === 'WARNING.INVALID_BUTTON_POSITION'
        })

    expect(errors.length).toBe(0);
});


test('Блок Warning;Кнопка перед placeholder;button-placeholder-1-errors.json', () => {
    let text = fs.readFileSync('test/warning-text/button-placeholder-1-errors.json', 'utf8');

    let errors = lint(text)
        .filter(error => {
            return error.code === 'WARNING.INVALID_BUTTON_POSITION'
        })

    expect(errors.length).toBe(1);
});

test('Блок Warning;Кнопка перед placeholder;button-placeholder-2-errors.json', () => {
    let text = fs.readFileSync('test/warning-text/button-placeholder-2-errors.json', 'utf8');

    let errors = lint(text)
        .filter(error => {
            return error.code === 'WARNING.INVALID_BUTTON_POSITION'
        })

    expect(errors.length).toBe(2);
});


test('Блок Warning;Размер placeholder;placeholder-size-0-errors.json', () => {
    let text = fs.readFileSync('test/warning-text/placeholder-size-0-errors.json', 'utf8');

    let errors = lint(text)
        .filter(error => {
            return error.code === 'WARNING.INVALID_PLACEHOLDER_SIZE'
        })

    expect(errors.length).toBe(0);
});

test('Блок Warning;Размер placeholder;placeholder-size-1-errors.json', () => {
    let text = fs.readFileSync('test/warning-text/placeholder-size-1-errors.json', 'utf8');

    let errors = lint(text)
        .filter(error => {
            return error.code === 'WARNING.INVALID_PLACEHOLDER_SIZE'
        })

    expect(errors.length).toBe(1);
});

test('Блок Grid;Фукнциональные/Маркетинговые блоки;functional-offer-0-errors.json', () => {
    let text = fs.readFileSync('test/grid/functional-offer-0-errors.json', 'utf8');

    let errors = lint(text)
        .filter(error => {
            return error.code === 'GRID.TOO_MUCH_MARKETING_BLOCKS'
        })

    expect(errors.length).toBe(0);
});

test('Блок Grid;Фукнциональные/Маркетинговые блоки;functional-offer-1-errors.json', () => {
    let text = fs.readFileSync('test/grid/functional-offer-1-errors.json', 'utf8');

    let errors = lint(text)
        .filter(error => {
            return error.code === 'GRID.TOO_MUCH_MARKETING_BLOCKS'
        })

    expect(errors.length).toBe(1);
});

test('Блок Headers;H1 единственный на странице;h1-several-0-errors.json', () => {
    let text = fs.readFileSync('test/headers/h1-several-0-errors.json', 'utf8');

    let errors = lint(text)
        .filter(error => {
            return error.code === 'TEXT.SEVERAL_H1'
        })

    expect(errors.length).toBe(0);
});

test('Блок Headers;H1 единственный на странице;h1-several-1-errors.json', () => {
    let text = fs.readFileSync('test/headers/h1-several-1-errors.json', 'utf8');

    let errors = lint(text)
        .filter(error => {
            return error.code === 'TEXT.SEVERAL_H1'
        })


    expect(errors.length).toBe(2);
});

test('Блок Headers;H2 перед H1;h2-before-h1-0-errors.json', () => {
    let text = fs.readFileSync('test/headers/h2-before-h1-0-errors.json', 'utf8');

    let errors = lint(text)
        .filter(error => {
            return error.code === 'TEXT.INVALID_H2_POSITION'
        })


    expect(errors.length).toBe(0);
});


test('Блок Headers;H2 перед H1;h2-before-h1-1-errors.json', () => {
    let text = fs.readFileSync('test/headers/h2-before-h1-1-errors.json', 'utf8');

    let errors = lint(text)
        .filter(error => {
            return error.code === 'TEXT.INVALID_H2_POSITION'
        })

    expect(errors.length).toBe(1);
});

test('Блок Headers;H3 перед H2;h3-before-h2-1-errors.json', () => {
    let text = fs.readFileSync('test/headers/h3-before-h2-1-errors.json', 'utf8');

    let errors = lint(text)
        .filter(error => {
            return error.code === 'TEXT.INVALID_H3_POSITION'
        })

    expect(errors.length).toBe(1);
});

test('Блок Headers;H3 перед H2;h3-before-h2-0-errors.json', () => {
    let text = fs.readFileSync('test/headers/h3-before-h2-0-errors.json', 'utf8');

    let errors = lint(text)
        .filter(error => {
            return error.code === 'TEXT.INVALID_H3_POSITION'
        })

    expect(errors.length).toBe(0);
});

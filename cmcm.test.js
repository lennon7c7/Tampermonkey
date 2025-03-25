// Test file for cmcm.js
const fs = require('fs');
const path = require('path');
const {JSDOM} = require('jsdom');

// Create a mock environment with jsdom
const createMockEnvironment = () => {
    const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
        url: 'https://advertiser.cheetahgo.cmcm.com/index/workplat',
        referrer: 'https://advertiser.cheetahgo.cmcm.com/',
        contentType: 'text/html',
        includeNodeLocations: true,
        storageQuota: 10000000,
        runScripts: 'dangerously'
    });

    const {window} = dom;
    const {document} = window;

    // Add missing properties to window
    window.echarts = {
        init: jest.fn().mockReturnValue({
            setOption: jest.fn(),
            resize: jest.fn()
        })
    };

    // Add history to window
    window.history = {
        pushState: jest.fn(),
        replaceState: jest.fn(),
        back: jest.fn(),
        forward: jest.fn(),
        go: jest.fn()
    };

    return {window, document};
};

// Mock jQuery
const createJQuery = (window, document) => {
    const jQueryFn = {
        first: jest.fn().mockReturnThis(),
        text: jest.fn().mockReturnValue(''),
        eq: jest.fn().mockReturnThis(),
        css: jest.fn().mockReturnThis(),
        html: jest.fn().mockReturnThis(),
        append: jest.fn().mockReturnThis(),
        remove: jest.fn().mockReturnThis(),
        parent: jest.fn().mockReturnThis(),
        val: jest.fn().mockReturnThis(),
        last: jest.fn().mockReturnThis(),
        on: jest.fn()
    };

    const jQuery = Object.assign(
        jest.fn((selector) => {
            if (selector === document) {
                return {
                    ready: jest.fn(callback => {
                        // Execute the callback immediately
                        callback();
                        return jQuery;
                    })
                };
            }
            return Object.assign(Object.create(jQueryFn), jQueryFn);
        }),
        {
            fn: jQueryFn,
            trim: jest.fn(str => str.trim())
        }
    );

    return {jQuery, jQueryFn};
};

// Create a function to evaluate the script in our mock environment
function evaluateScript(content) {
    const {window, document} = createMockEnvironment();
    const {jQuery, jQueryFn} = createJQuery(window, document);

    // Add jQuery to window and as global
    window.$ = jQuery;
    window.jQuery = jQuery;

    const vm = require('vm');
    const context = vm.createContext({
        window,
        document,
        $: jQuery,
        jQuery,
        console: window.console,
        echarts: window.echarts,
        history: window.history,
        location: window.location,
        setTimeout: (callback, delay) => {
            // Execute the callback immediately in tests
            callback();
            return 0;
        },
        clearTimeout: jest.fn(),
        setInterval: jest.fn(),
        clearInterval: jest.fn()
    });

    // Execute the script in the context
    vm.runInContext(`
        ${content}
        window.CONFIG = CONFIG;
        window.COMPANIES = COMPANIES;
        window.utils = utils;
        window.state = state;
        window.pageHandlers = pageHandlers;
    `, context);

    return {
        context: {
            CONFIG: window.CONFIG,
            COMPANIES: window.COMPANIES,
            utils: window.utils,
            state: window.state,
            pageHandlers: window.pageHandlers
        },
        jQueryFn,
        window,
        document
    };
}

describe('CMCM Script Tests', () => {
    let context;
    let jQueryFn;
    let window;
    let document;

    beforeEach(() => {
        const scriptContent = fs.readFileSync(path.join(__dirname, 'cmcm.js'), 'utf8');
        const result = evaluateScript(scriptContent);
        context = result.context;
        jQueryFn = result.jQueryFn;
        window = result.window;
        document = result.document;
    });

    describe('Utils', () => {
        test('formatDate should return array of 7 dates', () => {
            const dates = context.utils.formatDate();
            expect(dates).toHaveLength(7);
            dates.forEach(date => {
                expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
            });
        });

        test('generateRandomMoney should return number within range', () => {
            const money = context.utils.generateRandomMoney();
            expect(money).toBeGreaterThanOrEqual(context.CONFIG.MIN_RANDOM_MONEY);
            expect(money).toBeLessThanOrEqual(context.CONFIG.MAX_RANDOM_MONEY);
            expect(typeof money).toBe('number');
        });

        test('calculateAdFee should handle zero revenue', () => {
            const fee = context.utils.calculateAdFee(0);
            expect(fee).toBeGreaterThanOrEqual(context.CONFIG.MIN_DAILY_MONEY);
            expect(fee).toBeLessThanOrEqual(context.CONFIG.MAX_DAILY_MONEY);
        });

        test('calculateAdFee should handle positive revenue', () => {
            const revenue = 10000;
            const fee = context.utils.calculateAdFee(revenue);
            expect(fee).toBeGreaterThanOrEqual(context.CONFIG.MIN_DAILY_MONEY);
            expect(fee).toBeLessThanOrEqual(context.CONFIG.MAX_DAILY_MONEY + (revenue * 0.01 / 7));
        });
    });

    describe('State Management', () => {
        test('state should have correct initial values', () => {
            expect(context.state.pageIndexData).toEqual([]);
            expect(context.state.currentDomainKey).toBe(0);
            expect(context.state.currentCompany).toBeDefined();
        });
    });

    describe('Page Handlers', () => {
        test('pageIndex should update UI elements', () => {
            context.pageHandlers.pageIndex();
            expect(jQueryFn.text).toHaveBeenCalled();
            expect(jQueryFn.css).toHaveBeenCalledWith('height', context.CONFIG.TABLE_HEIGHT + 'px');
        });

        test('pageChart should handle missing domain', () => {
            context.state.currentDomainKey = 999; // Invalid index
            context.pageHandlers.pageChart();
            expect(jQueryFn.css).not.toHaveBeenCalledWith('height', context.CONFIG.CHART_HEIGHT + 'px');
        });

        test('pageChart should generate correct table rows', () => {
            context.state.currentDomainKey = 0;
            context.pageHandlers.pageChart();
            expect(jQueryFn.html).toHaveBeenCalled();
            expect(jQueryFn.css).toHaveBeenCalledWith('height', context.CONFIG.CHART_HEIGHT + 'px');
        });
    });

    describe('Company Data', () => {
        test('COMPANIES should have correct structure', () => {
            expect(context.COMPANIES).toBeDefined();
            expect(context.COMPANIES.BAIYU).toBeDefined();
            expect(context.COMPANIES.BAIYU.domains).toHaveLength(10);
            expect(context.COMPANIES.BAIYU.ids).toHaveLength(10);
            expect(context.COMPANIES.BAIYU.domains).toEqual(expect.arrayContaining(['vectorprompt.cc']));
        });
    });
});

import { App } from './App';
import { PageNotFoundComponent } from './components/error/PageNotFoundComponent';

describe('App', () => {

    const baseContentComponent = {
        render: async () => '<h1>Base content</h1><div id="contentRoot"></div>',
        applyDomChanges: () => {},
        getData: async () => new Map<string, object>(),
    }

    const ordinaryContentPageController = {
        getRoute: () => '/ordinary-content',
        render: async () => '<div class="ordinaryContent">Ordinary content</div>',
        applyDomChanges: () => {},
        getData: async () => new Map<string, object>(),
    }

    const secondContentPageController = {
        getRoute: () => '/second-content',
        render: async () => '<div class="ordinaryContent">Second content</div>',
        applyDomChanges: () => {},
        getData: async () => new Map<string, object>(),
    }

    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('should render a main page which is the base for varying contents', async () => {
        let app = new App('/ordinary-content', baseContentComponent);
        app.addPageController(ordinaryContentPageController);
        await app.init();

        expect(document.body.innerHTML).toBe('<h1>Base content</h1><div id="contentRoot"><div class="ordinaryContent">Ordinary content</div></div>');
    });

    it('should render content according to current route', async () => {
        let app = new App('/second-content', baseContentComponent);
        app.addPageController(ordinaryContentPageController);
        app.addPageController(secondContentPageController);
        await app.init();

        expect(document.body.innerHTML).toBe('<h1>Base content</h1><div id="contentRoot"><div class="ordinaryContent">Second content</div></div>');
    });

    it('should render page not found when there is no controller for the current route', async () => {
        let app = new App('/third-content', baseContentComponent, new PageNotFoundComponent());
        app.addPageController(ordinaryContentPageController);
        app.addPageController(secondContentPageController);
        await app.init();

        expect(document.body.innerHTML).toBe('<h1>Base content</h1><div id="contentRoot"><div>Page not found</div></div>');
    });

    it('should render error message when there is no contentRoot in main page', async () => {
        const noContentRootBaseComponent = {
            render: async () => '<h1>Base content</h1><div></div>',
            applyDomChanges: () => {},
            getData: async () => { throw new Error('Error on base component') },
        }

        let app = new App('/ordinary-content', noContentRootBaseComponent);
        app.addPageController(ordinaryContentPageController);
        app.addPageController(secondContentPageController);
        await app.init();

        expect(document.body.innerHTML).toBe("Element with id contentRoot not found");
    });

    it('should render error message when an error occurs on main page loading', async () => {
        const erroringBaseComponent = {
            render: async () => { throw new Error('Error on base component') },
            applyDomChanges: () => {},
            getData: async () => new Map<string, object>(),
        }

        let app = new App('/ordinary-content', erroringBaseComponent);
        app.addPageController(ordinaryContentPageController);
        app.addPageController(secondContentPageController);
        await app.init();

        expect(document.body.innerHTML).toBe("It was not possible to load main content: Error on base component");
    });

    it('should render error message when an error occurs on main page loading', async () => {
        const erroringPageController = {
            getRoute: () => '/erroring-page',
            render: async () => { throw new Error('Error on page controller') },
            applyDomChanges: () => {},
            getData: async () => new Map<string, object>(),
        }

        let app = new App('/erroring-page', baseContentComponent);
        app.addPageController(ordinaryContentPageController);
        app.addPageController(secondContentPageController);
        app.addPageController(erroringPageController);
        await app.init();

        expect(document.body.innerHTML).toBe("It was not possible to load controller content: Error on page controller");
    });

});
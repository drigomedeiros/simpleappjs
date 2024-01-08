import { App } from './../../App';
import { MainPageComponent } from './MainPageComponent';
import { ignoreBlanks } from './../../TestUtils';

describe('Main Page Component', () => {

    const pageWithMainPageComponent = {
        getRoute: () => '/ordinary-content',
        render: async () => "Some ordinary content",
        applyDomChanges: () => {},
        getData: async () => new Map<string, object>()
    }

    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('should render the base layout where all the content will be loaded', async () => {
        let app = new App(pageWithMainPageComponent.getRoute(), new MainPageComponent());
        app.addPageController(pageWithMainPageComponent);
        await app.init();

        expect(ignoreBlanks(document.body.innerHTML)).toContain(ignoreBlanks(`<div>
                                                                                    <h1>Welcome to main content, shared by all pages.</h1>
                                                                                    <!-- Content Wrapper. Contains page content -->
                                                                                    <div id="contentRoot">Some ordinary content</div>
                                                                                    <!-- /.content-wrapper -->
                                                                                </div>`));
    });

});
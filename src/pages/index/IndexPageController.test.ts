import { App } from '../../App';
import { MainPageComponent } from '../../components/main-page/MainPageComponent';
import { IndexPageController } from './IndexPageController';
import { ignoreBlanks } from '../../TestUtils';

describe('Index Page Controller', () => {

    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('should present the index page when the current route is "/"', async () => {
        let app = new App("/", new MainPageComponent());
        app.addPageController(new IndexPageController());
        await app.init();

        expect(ignoreBlanks(document.body.innerHTML)).toContain(ignoreBlanks(`<div>
                                                                                    <h1>Welcome to main content, shared by all pages.</h1>
                                                                                    <!-- Content Wrapper. Contains page content -->
                                                                                    <div id="contentRoot">
                                                                                        <div>Initial page content. <a href="other-page">Go to other page</a></div>
                                                                                    </div>
                                                                                    <!-- /.content-wrapper -->
                                                                                </div>`));
    });

});
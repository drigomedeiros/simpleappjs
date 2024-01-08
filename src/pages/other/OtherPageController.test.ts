import { App } from '../../App';
import { MainPageComponent } from '../../components/main-page/MainPageComponent';
import { OtherPageController } from './OtherPageController';
import { ignoreBlanks } from '../../TestUtils';

describe('Other Page Controller', () => {

    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('should present the other page when the current route is "/other-page"', async () => {
        let app = new App("/other-page", new MainPageComponent());
        app.addPageController(new OtherPageController());
        await app.init();

        expect(ignoreBlanks(document.body.innerHTML)).toContain(ignoreBlanks(`<div>
                                                                                    <h1>Welcome to main content, shared by all pages.</h1>
                                                                                    <!-- Content Wrapper. Contains page content -->
                                                                                    <div id="contentRoot">
                                                                                        <div>My other page. <a href="/">Go to initial page</a></div>
                                                                                    </div>
                                                                                    <!-- /.content-wrapper -->
                                                                                </div>`));
    });

});
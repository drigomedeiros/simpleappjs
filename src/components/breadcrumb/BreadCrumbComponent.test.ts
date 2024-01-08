import { App } from './../../App';
import { BreadCrumbComponent } from './BreadCrumbComponent';
import { BreadCrumbItemComponent } from './BreadCrumbItemComponent';
import { ignoreBlanks } from './../../TestUtils';

describe('Bread Crumb Component', () => {

    const breadCrumbItems = [ new BreadCrumbItemComponent('home', '/home'), new BreadCrumbItemComponent('ordinary content', '/ordinary-content', true) ];
    const breadCrumb = new BreadCrumbComponent(breadCrumbItems);        

    const baseContentComponent = {
        render: async () => '<h1>Base content</h1><div id="contentRoot"></div>',
        applyDomChanges: () => {},
        getData: async () => new Map<string, object>(),
    }

    const pageWithBreadCrumbController = {
        getRoute: () => '/ordinary-content',
        render: async () => {
            return await breadCrumb.render(new Map());
        },
        applyDomChanges: () => {},
        getData: async () => new Map<string, object>()
    }

    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('should render a bread crumb list according to the item it has', async () => {
        let app = new App(pageWithBreadCrumbController.getRoute(), baseContentComponent);
        app.addPageController(pageWithBreadCrumbController);
        await app.init();

        expect(ignoreBlanks(document.body.innerHTML)).toContain(ignoreBlanks(`<ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="/home">home</a></li><li class="breadcrumb-item active">ordinary content</li>
                    </ol>`));
    });

});
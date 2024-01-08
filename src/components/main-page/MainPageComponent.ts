import { IRendererComponent } from "../IRendererComponent";
import { HeaderComponent } from '../header/HeaderComponent';
import { MenuComponent } from '../menu/MenuComponent';
import { FooterComponent } from '../footer/FooterComponent';
import { Layout } from 'admin-lte/dist/js/adminlte';
import { IComponent } from "../IComponent";
import { IBehavioralComponent } from "../IBehavioralComponent";

export class MainPageComponent implements IComponent {
    
    private readonly header: IRendererComponent;
    private readonly menu: IRendererComponent & IBehavioralComponent;
    private readonly footer: IRendererComponent;
    
    constructor() {
        this.header = new HeaderComponent();
        this.menu = new MenuComponent();
        this.footer = new FooterComponent();
    }

    async getData() {
        let data = new Map<string, object>();
        data.set('name', new String('Rodrigo Medeiros'));
        data.set('menuData', {
            modules: [
                {
                    name: 'Calendar',
                    resources: [
                        {
                            name: 'Home',
                            route: '/'
                        },
                        {
                            name: 'Users',
                            route: '/users'
                        }
                    ]
                }
            ]
        });
        return data;
    }
    
    async render(data: Map<string, object>) {
        return `<div class="wrapper">
                    ${await this.header.render(data)}
                    ${await this.menu.render(data)}
                    <!-- Content Wrapper. Contains page content -->
                    <div class="content-wrapper" id="contentRoot"></div>
                    <!-- /.content-wrapper -->
                    ${await this.footer.render(data)}
                </div>`;
    }

    applyDomChanges(): void {
        let layoutOptions = {
            scrollbarTheme: 'os-theme-light',
            scrollbarAutoHide: 'l',
            panelAutoHeight: true,
            panelAutoHeightMode: 'min-height',
            preloadDuration: 200,
            loginRegisterAutoHeight: true
        };
        let pageLayout = new Layout(document.body, layoutOptions);
        pageLayout.fixLayoutHeight();
        this.menu.applyDomChanges();
                    
    }
}
import { IPageController } from "./pages/IPageController";
import { PreLoaderComponent } from "./components/preloader/PreLoaderComponent";
import { PageNotFoundComponent } from "./components/error/PageNotFoundComponent";
import { IRendererComponent } from "./components/IRendererComponent";
import { IComponent } from "./components/IComponent";

export class App {

    constructor(private readonly currentRoute: string,
                private readonly mainPageComponent: IComponent,
                private readonly pageNotFoundComponent: IRendererComponent = new PageNotFoundComponent(),
                private readonly controllers: IPageController[] = [],
                private preLoader: IRendererComponent = new PreLoaderComponent()) {
    }

    public async init() {
        let currentController = this.controllers.find(controller => controller.getRoute() === this.currentRoute);
        await this.present(currentController);
    }

    public addPageController(controller: IPageController) {
        this.controllers.push(controller);
    }

    private async present(currentController: IPageController | undefined) {
        try {
            await this.loadMainContent();  
            await this.loadControllerContent(currentController);
        } catch (error: unknown) {
            console.log(error);
            document.body.innerHTML = (error instanceof Error) ? error.message : "An error has occurred";
        }
    }

    private async loadMainContent() {
        try {
            document.body.innerHTML = await this.preLoader.render(new Map());
            
            let sessionDataObject: object | null;
            let sessionData = sessionStorage.getItem('mainData');
            if(sessionData !== null) {
                sessionDataObject = JSON.parse(sessionData);
            } else {
                sessionDataObject = sessionData;
            }
            
            let mainData: Map<string, object>;
            if (sessionDataObject === null) {
                mainData = await this.mainPageComponent.getData();
                sessionStorage.setItem('mainData', JSON.stringify(Object.fromEntries(mainData)));
            } else {
                mainData = new Map(Object.entries(sessionDataObject));
            }
            
            mainData.set('currentRoute', new String(this.currentRoute));
            let mainContent = await this.mainPageComponent.render(mainData);
            document.body.innerHTML = mainContent;
            this.mainPageComponent.applyDomChanges();
        } catch (error: unknown) {
            throw new Error(`It was not possible to load main content: ${(error instanceof Error) ? error.message : error}`);
        }
    }

    private async loadControllerContent(controller: IPageController | undefined) {
        const element = document.getElementById('contentRoot');
        if(element) {
            element.innerHTML = await this.preLoader.render(new Map());
            try {
                if (controller === undefined) {
                    element.innerHTML = await this.pageNotFoundComponent.render(new Map());
                } else {
                    let controllerData = await controller.getData();
                    element.innerHTML = await controller.render(controllerData);
                    controller.applyDomChanges();
                }
            } catch (error: unknown) {
                throw new Error(`It was not possible to load controller content: ${(error instanceof Error) ? error.message : error}`);
            }
        } else {
            throw new Error(`Element with id contentRoot not found`);
        }
    }
}

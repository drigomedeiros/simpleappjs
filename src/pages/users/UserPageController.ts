import { IComponent } from "../../components/IComponent";
import { IRendererComponent } from "../../components/IRendererComponent";
import { BreadCrumbComponent } from "../../components/breadcrumb/BreadCrumbComponent";
import { BreadCrumbItemComponent } from "../../components/breadcrumb/BreadCrumbItemComponent";
import { ContentHeaderComponent } from "../../components/content-header/ContentHeaderComponent";
import { IPageController } from "../IPageController";

export class UserPageController implements IPageController {   

    private readonly contentHeader: IRendererComponent;

    constructor() {
        let breadCrumbItems: Array<BreadCrumbItemComponent> = [];
        breadCrumbItems.push(new BreadCrumbItemComponent('Home', '/'));
        breadCrumbItems.push(new BreadCrumbItemComponent('Users', '/users', true));
        this.contentHeader = new ContentHeaderComponent('Users', new BreadCrumbComponent(breadCrumbItems));
    }
    
    async getData() {
        return new Map<string, object>();
    }
    
    async render(data: Map<string, object>) {
        return `
                ${await this.contentHeader.render(data)}
                <div>
                    Users List
                </div>`;
    }

    getRoute(): string {
        return '/users';
    }

    applyDomChanges(): void {}
}
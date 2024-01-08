import { IPageController } from '../IPageController';

export class IndexPageController implements IPageController {

    getRoute(): string {
        return '/';
    }

    async getData() {
        return  new Map<string, object>();
    }
    
    async render(data: Map<string, object>) {
        return `<div>Initial page content. <a href="other-page">Go to other page</a></div>`;
    }

    applyDomChanges(): void {}

}
import { IPageController } from "../IPageController";

export class OtherPageController implements IPageController {   

    async getData() {
        return new Map<string, object>();
    }
    
    async render(data: Map<string, object>) {
        return `<div>
                    My other page. <a href="/">Go to initial page</a>
                </div>`;
    }

    getRoute(): string {
        return '/other-page';
    }

    applyDomChanges(): void {}
}
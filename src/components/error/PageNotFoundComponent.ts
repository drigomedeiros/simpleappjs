import { IRendererComponent } from '../IRendererComponent';

export class PageNotFoundComponent implements IRendererComponent {
    async render(data: Map<string, object>) {
        return `<div>Page not found</div>`;
    }
}
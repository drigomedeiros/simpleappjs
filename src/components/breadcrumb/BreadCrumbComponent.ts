import { IRendererComponent } from "../IRendererComponent";
import { BreadCrumbItemComponent } from "./BreadCrumbItemComponent";

export class BreadCrumbComponent implements IRendererComponent {
    
    constructor(private readonly items: BreadCrumbItemComponent[]) {}
    
    async render(data: Map<string, object>) {
        let renderedItems = await Promise.all(this.items.map(async (item) => await item.render(data)));
        return `
        <ol class="breadcrumb float-sm-right">
            ${renderedItems.join('')}
        </ol>
        `;
    }

}
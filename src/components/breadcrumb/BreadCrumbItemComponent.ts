import { IRendererComponent } from "../IRendererComponent";

export class BreadCrumbItemComponent implements IRendererComponent {
    constructor(private readonly title: string,
                private readonly link: string,
                private readonly active: boolean = false) {
    }

    async render(data: Map<string, object>) {
        if(this.active) {
            return `<li class="breadcrumb-item active">${this.title}`;
        } else {
            return `<li class="breadcrumb-item"><a href="${this.link}">${this.title}</a></li>`;
        }
        
    }

}
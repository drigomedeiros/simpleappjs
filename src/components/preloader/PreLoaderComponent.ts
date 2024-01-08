import { IRendererComponent } from "../IRendererComponent";

export class PreLoaderComponent implements IRendererComponent {
    
    async render(data: Map<string, object>) {
        return `<div>
                    Loading...
                </div>`;
    }

}
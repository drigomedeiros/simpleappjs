import { IComponent } from "../IComponent";

export class MainPageComponent implements IComponent {
    
    async getData() {
        return new Map<string, object>();
    }
    
    async render(data: Map<string, object>) {
        return `<div>
                    <h1>Welcome to main content, shared by all pages.</h1>
                    <!-- Content Wrapper. Contains page content -->
                    <div id="contentRoot"></div>
                    <!-- /.content-wrapper -->
                </div>`;
    }

    applyDomChanges(): void {}
}
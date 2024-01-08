import { IRendererComponent } from "../IRendererComponent";

export class PreLoaderComponent implements IRendererComponent {
    
    async getData() {
        return new Map<string, object>();
    }
    
    async render(data: Map<string, object>) {
        return `<div class="content-preloader" style="text-align: center; vertical-align: center">
                    <img class="animation__shake" src="/img/AdminLTELogo.png" alt="AdminLTELogo" height="60" width="60">
                </div>`;
    }
    
    async applyDomChanges(){
        document.getElementsByClassName('content-preloader')[0].remove();
    }

}
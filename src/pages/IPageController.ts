import { IComponent } from "../components/IComponent";

export interface IPageController extends IComponent {
    getRoute(): string;
}
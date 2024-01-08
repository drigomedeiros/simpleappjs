import { IBehavioralComponent } from "./IBehavioralComponent";
import { IRendererComponent } from "./IRendererComponent";
import { IDataDrivenComponent } from "./IDataDrivenComponent";

export interface IComponent extends IRendererComponent, IBehavioralComponent, IDataDrivenComponent {

}
export interface IDataDrivenComponent {
    getData(): Promise<Map<string, object>>;
}
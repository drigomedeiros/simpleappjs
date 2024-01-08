export interface IRendererComponent {
    render(data: Map<string, object>): Promise<string>;
}
import { IRendererComponent } from "../IRendererComponent";
import { BreadCrumbComponent } from "../breadcrumb/BreadCrumbComponent";

export class ContentHeaderComponent implements IRendererComponent {

  constructor(private readonly title: string,
              private readonly breadcrumb: BreadCrumbComponent) {
  }

  async render(data: Map<string, object>) {
    return `
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0">${this.title}</h1>
            </div><!-- /.col -->
            <div class="col-sm-6">
              ${await this.breadcrumb.render(new Map())}
            </div><!-- /.col -->
          </div><!-- /.row -->
        </div><!-- /.container-fluid -->
      </div>
      <!-- /.content-header -->
    `;
  }

}
import { IRendererComponent } from "../IRendererComponent";
import { IMenu } from "./IMenu"
import { Treeview } from "admin-lte/dist/js/AdminLTE";
import $ from "jquery";
import ejs from "ejs";
import { IBehavioralComponent } from "../IBehavioralComponent";

export class MenuComponent implements IRendererComponent, IBehavioralComponent {
  
  async render(data: Map<string, object>){
      let currentRoute: String = data.get('currentRoute') as String;
      let menuData: IMenu = data.get('menuData') as IMenu;
      let template = 
             `<!-- Main Sidebar Container -->
              <aside class="main-sidebar sidebar-dark-primary elevation-4">
                <!-- Brand Logo -->
                <a href="/index3.html" class="brand-link">
                  <img src="/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
                  <span class="brand-text font-weight-light">AdminLTE 3</span>
                </a>
            
                <!-- Sidebar -->
                <div class="sidebar">
                  <!-- Sidebar user panel (optional) -->
                  <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div class="image">
                      <img src="/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image">
                    </div>
                    <div class="info">
                      <a href="#" class="d-block">${data.get('name')}</a>
                    </div>
                  </div>
            
                  <!-- SidebarSearch Form -->
                  <div class="form-inline">
                    <div class="input-group" data-widget="sidebar-search">
                      <input class="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search">
                      <div class="input-group-append">
                        <button class="btn btn-sidebar">
                          <i class="fas fa-search fa-fw"></i>
                        </button>
                      </div>
                    </div>
                  </div>
            
                  <!-- Sidebar Menu -->
                  <nav class="mt-2">
                    <ul id="app-menu" class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                      <!-- Add icons to the links using the .nav-icon class
                            with font-awesome or any other icon font library -->
                      <% for(let module of menuData.modules) { %>
                      <li class="nav-item menu-is-opening menu-open">
                        <a href="#" class="nav-link <%= module.resources.filter(resource => resource.route == currentRoute).length > 0 ? 'active' : '' %>">
                          <i class="nav-icon far fa-plus-square"></i>
                          <p>
                            <%= module.name %>
                            <i class="fas fa-angle-left right"></i>
                          </p>
                        </a>
                        <ul class="nav nav-treeview">
                          <% for(let resource of module.resources) { %>
                          <li class="nav-item">
                            <a href="<%= resource.route %>" class="nav-link <%= (resource.route == currentRoute) ? 'active' : '' %>">
                              <i class="far fa-circle nav-icon"></i>
                              <p><%= resource.name %></p>
                            </a>
                          </li>
                          <% } %>
                        </ul>
                      </li>
                      <% } %>
                    </ul>
                  </nav>
                  <!-- /.sidebar-menu -->
                </div>
                <!-- /.sidebar -->
              </aside>
              <!-- Control Sidebar -->
              <aside class="control-sidebar control-sidebar-dark">
                  <!-- Control sidebar content goes here -->
              </aside>
              <!-- /.control-sidebar -->`;
      return ejs.render(template, {currentRoute: currentRoute, menuData: menuData});
    }

    applyDomChanges(): void {
      let treeviewConfig = {
        trigger: `[data-widget="treeview"] .nav-link`,
        animationSpeed: 300,
        accordion: true,
        expandSidebar: false,
        sidebarButtonSelector: '[data-widget="pushmenu"]'
      };
      let treeview = new Treeview($('#app-menu'), treeviewConfig);
      treeview.init();
    }
    
}
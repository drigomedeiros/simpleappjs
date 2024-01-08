import { App } from "./App";
import { UserPageController } from "./pages/users/UserPageController";
import { MainPageComponent } from "./components/main-page/MainPageComponent";
import { IndexPageController } from "./pages/index/IndexPageController";

const app = new App(window.location.pathname, new MainPageComponent());

app.addPageController(new IndexPageController());
app.addPageController(new UserPageController());

window.onload = () => app.init();

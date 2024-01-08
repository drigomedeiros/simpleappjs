import { App } from "./App";
import { OtherPageController } from "./pages/other/OtherPageController";
import { MainPageComponent } from "./components/main-page/MainPageComponent";
import { IndexPageController } from "./pages/index/IndexPageController";

const app = new App(window.location.pathname, new MainPageComponent());

app.addPageController(new IndexPageController());
app.addPageController(new OtherPageController());

window.onload = () => app.init();

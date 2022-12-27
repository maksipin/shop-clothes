import AppRouter from "./components/AppRouter";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar/NavBar";
import AppLoader from "./layout/AppLoader";

function App() {
  console.log("App main render");
  return (
    <div className="relative flex flex-col min-h-screen ">
      <NavBar />
      <div className="m-auto max-w-screen-2xl flex-auto w-full items-center">
        <AppLoader>
          <AppRouter />
        </AppLoader>
      </div>

      <Footer />
    </div>
  );
}

export default App;

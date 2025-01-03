import "./App.css";
import { Header } from "./components/Header/Header";
import { MyRoutes } from "./routes/MyRoutes";

function App() {
  return (
    <>
      <Header />
      <main>
        <MyRoutes />
      </main>
    </>
  );
}

export default App;

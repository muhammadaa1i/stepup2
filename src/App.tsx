import { Outlet } from "react-router-dom";
import Header from "./components/layout/header/header";
import Footer from "./components/layout/footer/footer";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

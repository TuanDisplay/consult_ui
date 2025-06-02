import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "~/layouts/MainLayout";
import { priviteRoutes } from "~/routes";
import ConsultLogin from "~/pages/ConsultLogin";
import NotFound from "~/pages/NotFound";
import { Toaster } from "react-hot-toast";
import LoginAuth from "./utils/LoginAuth";

export default function App() {
  return (
    <>
      <Toaster position="bottom-center" toastOptions={{ duration: 3000 }} />
      <BrowserRouter>
        <Routes>
          <Route path="/consult-login" element={<ConsultLogin />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<MainLayout />}>
            {priviteRoutes.map((route, index) => {
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <LoginAuth>
                      <Page />
                    </LoginAuth>
                  }
                />
              );
            })}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

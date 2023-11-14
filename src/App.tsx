import { GlobalStyle } from "./style/GlobalStyle";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import PageNotFound from "./components/PageNotFound";
import { Theme, darkTheme, lightTheme } from "./style/theme";
import Profile from "./components/Profile/Profile";
import MainContents from "./Pages/MainContents";
import ProfilePage from "./Pages/Profile/ProfilePage";
import ProfileEditPage from "./Pages/Profile/ProfileEditPage";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import Chat from "./Pages/Chat";
import { AuthProvider } from "./hooks/useAuth";
import { createContext } from "react";
import { useDarkMode } from "./hooks/useDarkMode";
import ChatTest from "./Pages/ChatTest";

interface ContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ContextProps>({
  theme: lightTheme,
  toggleTheme: () => {}
});

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { path: "", element: <MainContents /> },
      {
        path: "profiles",
        element: <Profile />
      },
      {
        path: "profiles/:userid",
        element: <ProfilePage />
      },
      { path: "profiles/:userid/edit", element: <ProfileEditPage /> },
      {
        path: "chat",
        element: <Chat />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "signup",
        element: <SignUp />
      },
      {
        path: "chattest",
        element: <ChatTest />
      }
    ]
  },
  {
    path: "*",
    element: <PageNotFound />
  }
]);

const App: React.FC = () => {
  const { theme, toggleTheme } = useDarkMode();

  return (
    <>
      <AuthProvider>
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <GlobalStyle theme={theme === lightTheme ? lightTheme : darkTheme} />
          <RouterProvider router={router} />
        </ThemeContext.Provider>
      </AuthProvider>
    </>
  );
};

export default App;



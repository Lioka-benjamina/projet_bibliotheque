import "./assets/style.scss"
import { Router } from "./components/router/Router"
import createStore from "react-auth-kit/createStore"
import AuthProvider from "react-auth-kit/AuthProvider"
import { ToastContainer } from "react-toastify"

function App() {
  const storeAuth = createStore({
    authName : "auth",
    authType : "localstorage"
  })

  return (
    <>
      <AuthProvider store={storeAuth}>
        <ToastContainer/>
        <Router/>
      </AuthProvider>
    </>
  )
}

export default App
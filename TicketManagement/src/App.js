import "./App.scss";
import { Store, persistor } from "./Redux/Store/Store";
import Routing from "./Route/Routing";
import { Provider } from "react-redux"
import { Toaster } from "react-hot-toast"
import { PersistGate } from "redux-persist/integration/react";

function App() {

  return (
    <div className="App">
      <Toaster position="top-right" />
      <Provider  store={Store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routing />
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;

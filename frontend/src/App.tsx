import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import UploadHistory from "./pages/UploadHistory";

function App() {

    return (

        <Routes>

            <Route
                path="/"
                element={<Dashboard />}
            />

            <Route
                path="/history"
                element={<UploadHistory />}
            />

        </Routes>

    );

}

export default App;
import { Routes, Route } from "react-router-dom";
import { Layout, Home, Auth, NoPage } from "./pages";

const App = () => {
    console.log("Rendering App component");
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                {/* <Route path="about" element={<About />} /> */}
                {/* <Route path="profile" element={<Profile />} /> */}
                <Route path="auth" element={<Auth />} />
                <Route path="*" element={<NoPage />} />
            </Route>
        </Routes>
    );
};

export default App;

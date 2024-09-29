import React from "react";
import Auth from "./pages/Auth";
import Header from "./components/Header";

const App = () => {
    return (
        <div
            className="container mx-auto min-h-[100vh] py-4 grid grid-cols-1 md:grid-cols-7"
            id="app"
        >
            <div className="col-span-2"></div>
            <div className="col-span-3">
                <Header />
                <Auth /> {/** outlet */}
            </div>
            <div className="col-span-2"></div>
        </div>
    );
};

export default App;

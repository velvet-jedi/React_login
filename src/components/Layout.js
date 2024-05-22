import {Outlet} from "react-router-dom"

const Layout = () => {
    return (
        <main className="App">
            <Outlet/> {/* represents children of the layout component */}
        </main>
    )
}

export default Layout
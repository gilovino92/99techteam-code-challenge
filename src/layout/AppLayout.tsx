import { Outlet } from "react-router";
export default function AppLayout() {
    return (
        <>
           <div className="min-h-screen  max-w-full md:h-screen">
            <Outlet />
           </div>
        </>
    )
}
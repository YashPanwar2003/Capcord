import Navbar from "@/components/Navbar";

export default function Layout({children}:{children:React.ReactNode}){
    return (
        <div className="h-screen w-screen bg-white">
            <Navbar/>
            {children}
        </div>
    )

}
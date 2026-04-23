import { getUserAction } from "@/actions/auth/getUser.action";
import Footer from "@/components/modules/home/Footer";
import Navbar from "@/components/modules/home/Navbar";


export default async function CommonLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const user = await getUserAction();
    return (
        <>
            <Navbar user={user}></Navbar>
            {children}
            <Footer />
        </>
    )
}
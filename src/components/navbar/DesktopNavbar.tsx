import Image from "next/image"
import gurukul_logo from "../../../public/gurukul_logo.png"
import Link from "next/link"

const DesktopNavbar = () => {
  return (
    <nav className="flex justify-between py-3 px-16 shadow-md overflow-x-hidden">
        <Image src={gurukul_logo} className="h-12 w-fit" alt="Brand logo"/>
        <div className="flex gap-8 items-center justify-center">
            <Link href="/" className="hover:text-blue text-lg font-medium text-black">Home</Link>
            <Link href="/categories" className="hover:text-blue text-lg font-medium text-black">Categories</Link>
            <Link href="/explore" className="hover:text-blue text-lg font-medium text-black">Explore</Link>
            <input type="text" name="desktopNavSearch" id="desktopNavSearch" placeholder="Search course..." className="border-black/60 rounded-full border-2 font-medium text-lg px-5 py-[6px] focus:outline-none text-black/60 w-[25vw]"/>
            <button className="text-lg hover:text-white hover:bg-blue rounded-full px-5 py-[6px] border-2 border-blue font-medium">Login</button>
        </div>
    </nav>
  )
}

export default DesktopNavbar

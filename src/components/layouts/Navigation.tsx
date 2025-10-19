"use client";

export default function Navigation() {
    return (
        <nav className="absolute z-10 top-5 max-w-7xl w-full p-5 rounded-full flex justify-between">
            <img src="Arvo_logo_rb.png" alt="" className=" h-8"/>
            <div className="flex gap-5 text-white">
                <a href="#" className="cursor-pointer hover:text-green-primary hover:underline underline-offset-5s">Home</a>
                <a href="#" className="cursor-pointer hover:text-green-primary hover:underline underline-offset-5s">Projects</a>
                <a href="#" className="cursor-pointer hover:text-green-primary hover:underline underline-offset-5s">Team</a>
                <a href="#" className="cursor-pointer hover:text-green-primary hover:underline underline-offset-5s">Pricing</a>
                <a href="#" className="cursor-pointer hover:text-green-primary hover:underline underline-offset-5s">Services</a>
                <a href="#" className="cursor-pointer hover:text-green-primary hover:underline underline-offset-5s">Contact</a>
            </div>
            
        </nav>
    );
}

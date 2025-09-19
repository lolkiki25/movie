import { Search } from "lucide-react";
import { ThemeToggler } from "../home";
import { Input } from "../ui/input";
import { GenreDropdown } from "./GenreDropDown";
import { SearchSection } from "./SearchSection";


export const Header = () => {
    return (
        <header className="w-full">
            <div className="max-w-[1280px] flex justify-between m-auto items-center py-3">
                <div>
                    <img src="./Logo.png" className="h-5"/>
                </div>
                <div className="flex gap-4">
                    <GenreDropdown/>
                    <div className="flex items-center w-[379px] h-9">
                        <Search className="-mr-8 " />
                        <Input className="pl-9" placeholder="Search.." />
                        <SearchSection />
                    </div>
                </div>
                <div>
                    <ThemeToggler />
                </div>
            </div>
        </header>
    )
};
"use client";

import { FaSearch } from "react-icons/fa";

const Search = () => {
    return ( 
        <div
        className="
        w-full p-2 mr-2
        md:w-auto md:mx-auto md:absolute md:left-1/2 md:top-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2
        rounded-full bg-white border-[1px] shadow-md hover:shadow-lg transition cursor-pointer  
        "
        >
            <div className="flex flex-row items-center flex-auto justify-between text-sm font-semibold">
                <div className="px-4">Anywhere</div>
                <div className="hidden md:block px-4 border-x-[1px]">Any Week</div>
                <div className="flex flex-row items-center gap-4 pl-4">
                    <div className="text-sm font-normal text-gray-500 hidden md:block">Add guests</div>
                    <div className="bg-rose-500 text-white rounded-full p-2.5">
                        <FaSearch size={13} />
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Search;


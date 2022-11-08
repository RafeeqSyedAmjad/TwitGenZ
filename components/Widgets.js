import { SearchIcon } from "@heroicons/react/outline";
import Trending from "./Trending";
import Image from "next/image";

function Widgets({ trendingResults, followResults }) {
    return (
        <div className="hidden lg:inline ml-8 xl:w-[450px] py-1 space-y-5">
            <div className="sticky top-0 py-1.5 bg-[#15202b] z-50 w-11/12 xl:w-9/12">
                <div className="flex items-center bg-[#263341] p-3 rounded-full relative">
                    <SearchIcon className="text-gray-500 h-5 z-50" />
                    <input
                        type="text"
                        className="bg-transparent placeholder-gray-500 outline-none text-[#d9d9d9] absolute inset-0 pl-11 border border-transparent w-full focus:border-[#229758] rounded-full focus:bg-[#15202b] focus:shadow-lg"
                        placeholder="Search TwitGenZ"
                    />
                </div>
            </div>

            <div className="text-[#d9d9d9] space-y-3 bg-[#192734] pt-2 rounded-xl w-11/12 xl:w-9/12">
                <h4 className="font-bold text-xl px-4">What's happening</h4>
                {trendingResults.map((result, index) => (
                    <Trending key={index} result={result} />
                ))}
                <button className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-3 cursor-pointer transition duration-200 ease-out flex items-center justify-between w-full text-[#229758] font-medium">
                    Show more
                </button>
            </div>

            <div className="text-[#d9d9d9] space-y-3 bg-[#192734] pt-2 rounded-xl w-11/12 xl:w-9/12">
                <h4 className="font-bold text-xl px-4">Who to follow</h4>
                {followResults.map((result, index) => (
                    <div
                        className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-2 cursor-pointer transition duration-200 ease-out flex items-center"
                        key={index}
                    >
                        <Image
                            src={result.userImg}
                            width={50}
                            height={50}
                            objectFit="cover"
                            className="rounded-full"
                            alt = ""
                        />
                        <div className="ml-4 leading-5 group">
                            <h4 className="font-bold group-hover:underline">
                                {result.username}
                            </h4>
                            <h5 className="text-gray-500 text-[15px]">{result.tag}</h5>
                        </div>
                        <button className="ml-auto bg-[#229758] text-[#d9d9d9] rounded-full font-bold text-sm py-1.5 px-3.5">
                            Follow
                        </button>
                    </div>
                ))}
                <button className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-3 cursor-pointer transition duration-200 ease-out flex items-center justify-between w-full text-[#229758] font-medium">
                    Show more
                </button>
            </div>
        </div>
    );
}

export default Widgets;


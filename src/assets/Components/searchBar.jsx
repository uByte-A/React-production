function SearchBar({value, setValue, onSubmit, handleClick}){
    return (
        <>      
                <form onSubmit={onSubmit} className="flex items-center justify-center mt-9 flex-col">
                <div className="flex">
                <label htmlFor='search' className="flex items-center h-12 pl-5 pr-2 rounded-s-full bg-slate-200">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#6b6b6b" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </label>
                    <input className=" w-56 pl-0 rounded-e-full bg-slate-200 px-5 py-3 outline-none md:focus:w-96 ease-[cubic-bezier(.84,.71,.6,1.56) duration-300" placeholder="Search on Spotify" id="search" value={value} onChange={e => setValue(e.target.value)}/>
                </div>
                    <button type="submit" className="bg-[#4f46e5] text-white px-5 py-3 mt-5 rounded-full shadow-2xl hover:opacity-90 ">Search</button>
                </form>
        </>
    )
}

export default SearchBar;
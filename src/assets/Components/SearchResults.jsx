function SearchResults({results, handleClick}){
    return(
        <>
            <div className="border border-solid w-full h-full p-4 rounded-t-3xl md:rounded-tr-3xl overflow-scroll flex flex-col gap-4">
                {results.length == 0 ? 
                <div className="bg-white">
                  <div className="text-center">
                    <p className="mt-1 text-4xl font-bold tracking-tight text-gray-700 sm:text-5xl lg:text-6xl">
                      No search results
                    </p>
                  </div>
              </div> : ''}
                {results.map((res,index) => <div className="w-full h-fit shadow rounded-2xl min-h-20 flex justify-between p-4"><div><p className="mb-2">{res.name}</p><p className="text-gray-500">By {res.artists.map(artist => artist.name)}</p></div><button id={index} onClick={handleClick} className="ml-3"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>
</button></div>)}
            </div>
        </>
    )
}

export default SearchResults;
function Playlist({added, handleClick, value, setValue, handleSubmit}){
    return(
        <>
            <div className="border  border-solid w-full h-full p-4 rounded-t-3xl md:rounded-tl-3xl overflow-scroll grid grid-cols-1 gap-4">
                <form className="relative" onSubmit={handleSubmit}>
                    <input className="bg-slate-200 px-5 py-3 w-full rounded-full outline-none mb-7" placeholder="Name" type="text" value={value} onChange={e => setValue(e.target.value)} required/>
                {added.map((res,index) => <div className="w-full h-fit shadow rounded-2xl min-h-20 flex justify-between p-4"><div><p className="mb-2">{res.name}</p><p className="text-gray-500">By {res.artists.map(artist => artist.name)}</p></div><button type="button" id={index} onClick={handleClick} className="ml-3"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#e02424" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>

</button></div>)}
<div className="flex w-100% justify-center items-center sticky bottom-0"><button type="submit" className="bg-[#1ED760] text-white px-5 py-3 mt-0 md:mt-5 rounded-full shadow-2xl hover:opacity-90 sticky">Add playlist to Spotify</button></div>
</form>
            </div>
        </>
    )
}

export default Playlist;
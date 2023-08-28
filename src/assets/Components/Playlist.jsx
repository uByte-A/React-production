function Playlist({added, handleClick, value, setValue, handleSubmit, animate}){
    return(
        <>
            <div className="border  border-solid w-full h-full p-4 rounded-t-3xl md:rounded-tl-3xl overflow-scroll grid grid-cols-1 gap-4">
                <form className="relative" onSubmit={(e) => {handleSubmit(e);animate(e)}}>
                    <input className="bg-slate-200 px-5 py-3 w-full rounded-full outline-none mb-7" placeholder="Name" type="text" value={value} onChange={e => setValue(e.target.value)} required/>
                {added.map((res,index) => <div className="w-full h-fit shadow rounded-2xl min-h-20 flex justify-between p-4"><div><p className="mb-2">{res.name}</p><p className="text-gray-500">By {res.artists.map(artist => artist.name)}</p></div><button type="button" id={index} onClick={handleClick} className="ml-3"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#e02424" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>

</button></div>)}
<div className="flex w-100% justify-center items-center sticky bottom-0 gap-2"><button type="submit" className="bg-[#1ED760] text-white px-5 py-3 mt-0 md:mt-5 rounded-full shadow-2xl  sticky" >Add playlist to Spotify <div role="status" className="right-0 top-2 absolute w-8 hidden transition-all" id='loader'>
    <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin fill-[#1ed760]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div></button></div>
</form>
            </div>
        </>
    )
}

export default Playlist;
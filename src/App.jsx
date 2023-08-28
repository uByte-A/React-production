import { useState, useEffect } from 'react'
import NavBar from './assets/Components/NavBar'
import SearchBar from './assets/Components/searchBar'
import SearchResults from './assets/Components/SearchResults'
import Playlist from './assets/Components/Playlist'
import Toast from './assets/Components/Notification'
import FailedToast from './assets/Components/FailedNotification'

function App() {
  const [value, setValue] = useState('')
  const [results, setResults] = useState([])
  const [token, setToken] = useState(null)
  const [id, setId] = useState(null)
  const [added, setAdded] = useState([])
  const [name, setName] = useState('')
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState('Now you can view your playlist on Spotify!')
  const [failedShow, setFailedShow] = useState(false)

  useEffect(() => {

    async function isValid(testToken){
      const endpoint = 'https://api.spotify.com/v1/me'

      let req = fetch(endpoint, {
      headers:{
        'Authorization':'Bearer '+ testToken
      },
    })
      return req
    }

    let check = localStorage.getItem('access_token')

    isValid(check)
    .then(res => res.json())
    .then(res => setId(res.id))

    isValid(check).then(res => {
    if(check !== null && res.ok){
      setToken(check)
    } else {
      const urlParams = new URLSearchParams(window.location.search);
      let code = urlParams.get('code');

      if (code === null){
      function generateRandomString(length) {
        let text = '';
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
        for (let i = 0; i < length; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
      }
    
    
        async function generateCodeChallenge(codeVerifier) {
        function base64encode(string) {
          return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
        }
    
        const encoder = new TextEncoder();
        const data = encoder.encode(codeVerifier);
        const digest = await window.crypto.subtle.digest('SHA-256', data);
    
        return base64encode(digest);
      }
    
      const clientId = '864c1dd4d3e34244b51e708380a43fee';
      const redirectUri = 'http://127.0.0.1:5173/';
    
      let codeVerifier = generateRandomString(128);
    
      generateCodeChallenge(codeVerifier).then(codeChallenge => {
        let state = generateRandomString(16);
        let scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';
    
        localStorage.setItem('code_verifier', codeVerifier);
    
        let args = new URLSearchParams({
          response_type: 'code',
          client_id: clientId,
          scope: scope,
          redirect_uri: redirectUri,
          state: state,
          code_challenge_method: 'S256',
          code_challenge: codeChallenge
        });
    
        window.location = 'https://accounts.spotify.com/authorize?' + args;
      });
    
    }else{
        const clientId = '864c1dd4d3e34244b51e708380a43fee';
        const redirectUri = 'http://127.0.0.1:5173/';
        let codeVerifier = localStorage.getItem('code_verifier');
    
        let body = new URLSearchParams({
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: redirectUri,
          client_id: clientId,
          code_verifier: codeVerifier
        });
    
        const response = fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('HTTP status ' + response.status);
          }
          return response.json();
        })
        .then(data => {
          localStorage.setItem('access_token', data.access_token);
          window.location = redirectUri

        })
        .catch(error => {
          console.error('Error:', error);
        });
      }
    }
  }, [])}, [show])

  function Results(e){
    e.preventDefault()
    if(value.length !== 0 ){
      const accessToken = token
      const baseUrl= 'https://api.spotify.com/v1'
      const params = `/search?q=${value}&type=track`
      fetch(baseUrl + params, {
        headers:{
          Authorization:`Bearer ${accessToken}`
        },
      })
      .then((res) => res.json())
      .then((res) => setResults(res.tracks.items))
    }
  }
  console.log(token)
  console.log(id)

  function handleClick(e){
    let index1 = e.currentTarget.id
    let list = results.filter((e,index) => index != index1)
    let list2 = results.filter((e,index) => index == index1)
    console.log(list)
    setResults(list)
    setAdded(res =>[...res, list2[0]])
  }
  function handleClick2(e){
    let index1 = e.currentTarget.id
    let list = added.filter((e,index) => index != index1)
    let list2 = added.filter((e,index) => index == index1)
    console.log(list)
    console.log([...results, list2[0]])
    setResults(res =>[...res, list2[0]])
    setAdded(list)
  }

  function handleSubmit(e){
    e.preventDefault()
    e.currentTarget.disabled = true

    let data = {
      name:name,
      description:'',
      public:false,
    }

    fetch(`https://api.spotify.com/v1/users/${id}/playlists`, {
      method:'POST',
      headers:{
        'Authorization': 'Bearer '+token
      },
      body:JSON.stringify(data)
    })
    .then((res) => res.json())
    .then(res => {

      let Playlistdata = {
        uris:added.map(item => item.uri),
        position: 0
      }

      console.log(Playlistdata)

      fetch(`https://api.spotify.com/v1/playlists/${res.id}/tracks`, {
        method:'POST',
        headers:{
          'Authorization': 'Bearer '+token
        },

        body:JSON.stringify(Playlistdata)
      })
      .then(res => {
        if(res.ok){
          setFailedShow(false)
          setAdded([]);
          setName('');
          setShow(true)
          setMessage('Now you can view your playlist on Spotify!')
          document.getElementById('loader').classList.add('hidden')
        } else {
          setFailedShow(true)
          setMessage('Try refreshing this page or checking your internet connection')
          document.getElementById('loader').classList.add('hidden')
        }
      })
    }).catch(res => {
        setFailedShow(true)
        setMessage('Try refreshing this page or checking your internet connection')
        document.getElementById('loader').classList.add('hidden')
    })
  }

  function animate(e){
    const element = document.getElementById('loader')
    element.classList.remove('hidden')
    element.style.transform = 'translateX(40px)'
  }



  return (
    <>
    <div className='h-screen flex flex-col'>
        <NavBar />
        <Toast setShow={setShow} show={show} message={message}/>
        <FailedToast setShow={setFailedShow} show={failedShow} message={message}/>
        <SearchBar value={value} setValue={setValue} onSubmit={Results}/>
        <div className='w-full flex-col h-full overflow-scroll grid grid-cols-1 grid-rows-2 gap-4 mt-4 md:grid-cols-2  md:grid-rows-1'>
        <SearchResults results={results} handleClick={handleClick}/>
        <Playlist added={added} handleClick={handleClick2} value={name} setValue={setName} handleSubmit={handleSubmit} animate={animate}/>
        </div>
    </div>
    </>
  )
}

export default App

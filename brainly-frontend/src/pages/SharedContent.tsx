import { useEffect, useState } from 'react'

import { Card } from '../components/ui/Card'

import { Sidebar } from '../components/ui/Sidebar'
import axios from 'axios'
import { BACKEND_URL } from '../../config'
import { useParams } from 'react-router-dom'

export function SharedContent() {
    const {shareLink} = useParams();
    const [contents, setContents] = useState([]);
    const [username, setUsername] = useState("");
    

  useEffect(()=>{
    axios.get(`${BACKEND_URL}/api/v1/share/${shareLink}`,{
        headers:{
            Authorization:localStorage.getItem("token")
        }
    }).then((response)=>{
        setContents(response.data.content);
        setUsername(response.data.username);
    })
  },[shareLink])


  return (
    <div>
      <div>
        <Sidebar/>
      </div>
      <div className='p-4 ml-72 min-h-screen bg-gray-100'>
        <div className='flex justify-end gap-4 items-center mb-6'>
            <h2 className='text-3xl font-semibold text-gray-700 border-b-2 border-gray-300 pb-1 px-6 rounded-lg shadow-sm bg-white'><span className='text-blue-600 italic'>{username}</span>'s Brainly
            </h2> 
        </div>

        <div className='flex gap-4 flex-wrap'>
          {
            contents.map(({title, link, type, _id})=>
              <Card key={_id} title={title} type={type} link={link} contentId={_id}/>
            )
          }
        </div>
      </div>
    </div>
  )
}


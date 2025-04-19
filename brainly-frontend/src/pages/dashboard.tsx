import { useEffect, useState } from 'react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { CreateContentModal } from '../components/ui/CreateContentModal'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { Sidebar } from '../components/ui/Sidebar'
import { useContent } from '../hooks/useContent'
import axios from 'axios'
import { BACKEND_URL } from '../../config'

export function Dashboard() {
  const [filterType, setFilterType] = useState<string | null>(null);
  const [modalOpen,setModalopen] = useState(false);
  const {contents,refresh} = useContent();

  useEffect(()=>{
    refresh()
  },[modalOpen])
 
  
  const filteredContents = filterType ? contents.filter((content) => 
    //@ts-ignore
    content.type === filterType
  ) : contents;


  return (
    <div>
      <div>
        <Sidebar onFilterSelect={(type:string|null) => {
          setFilterType(type);
          refresh();
          }}/>
      </div>
      <div className='p-4 ml-72 min-h-screen bg-gray-100'>
       <CreateContentModal open={modalOpen} onClose={()=>{setModalopen(false)}}/>
      

        <div className='flex justify-end gap-4'>
          <Button variant="primary" text="Add Content" onClick={() => {setModalopen(true)}} startIcon={<PlusIcon size='md'/>}/>
          
          <Button variant="secondary" text="Share Brain" onClick={async () => { 
            const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`,{
              share:true
            },{
              headers:{
                Authorization:localStorage.getItem("token")
              }
            });
            const shareUrl = `http://localhost:5173/api/v1/share/${response.data.hash}`;
            alert(shareUrl)
          }} startIcon={<ShareIcon size='md'/>}/>
        </div>

        <div className='flex gap-4 flex-wrap'>
          {
            filteredContents.map(({title, link, type, _id})=>
              <Card key={_id} title={title} type={type} link={link} contentId={_id}/>
            )
          }
          
        </div>
      </div>
    </div>
  )
}


import { Button, TextField } from '@mui/material'
import React, {useState} from 'react'


export const PostcodeInput = ({campaign, setActionTarget}) => {

  const [postcode, setPostcode] = useState('')
  const [filteredTarget, setFilteredTarget] = useState('')

  //fetch wards/region from postcode
  const fetchPostcodeData = () => {
    console.log(postcode)
  }

  if (filteredTarget) {
    setActionTarget(filteredTarget)
  }

  return (
    <div>
      <TextField value={postcode} onChange={(e)=> setPostcode(e.target.value)}/>
      <br/>
      <Button onClick={() => fetchPostcodeData()}>Go</Button>
    </div>
  )
}

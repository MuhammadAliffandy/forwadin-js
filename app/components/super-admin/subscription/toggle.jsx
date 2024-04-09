import Toggle from 'react-toggle'
import { useEffect, useState } from "react";

const AppToggle = (props) => {

    const [ checked , setChecked ] = useState()

    const handleChecked = () => {
        setChecked(checked)
        props.onChange(checked)
    }

    useEffect(()=>{
        if(props.defaultChecked){
            setChecked(props.defaultChecked)
        }
    },[])

    return (
        <Toggle
            className='bg-primary'
            defaultChecked={checked}
            icons={false}
            onChange={handleChecked} />
    )
}

export default AppToggle;
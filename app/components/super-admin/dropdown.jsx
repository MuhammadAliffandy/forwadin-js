import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const DropDown = (props) => {
    return(
        <>
            <Select
                    sx= {
                        {
                            borderRadius: "6px",
                            backgroundColor: 'white',
                            width:"100%"
                        }
                    }
                    value={props.value}
                    displayEmpty
                    onChange={props.onChange}
                    inputProps={{ 
                        'aria-label': 'Without label'  ,
                    }}
                >
                    <MenuItem disabled value="">
                        {props.placeholder}
                    </MenuItem>
                    {
                        props.listItem.map((data ,index)=>{
                            return( <MenuItem key = {index} value={data.value}>{data.text}</MenuItem> )
                        })
                    }
            </Select>
        </>
    ) 
}

export default DropDown;
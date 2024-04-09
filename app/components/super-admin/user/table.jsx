import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import UserCheckbox from '../checkbox'

const UserTable = (props) =>  {
    return (
        <TableContainer >
            <Table sx={{ minWidth: '100%' , '&:last-child td, &:last-child th': { border: 0 } }}aria-label="simple table">
            <TableHead>
                <TableRow className='bg-[#F3F5F8]'>
                    <TableCell align="center" ><UserCheckbox onChange={value => {}} /></TableCell>
                    <TableCell align="center" className='p-0'><p className='font-bold text-TEXT-3'>ID</p></TableCell>
                    <TableCell align="center"><p className='font-bold text-TEXT-3'>First Name</p></TableCell>
                    <TableCell align="center"><p className='font-bold text-TEXT-3'>Last Name</p></TableCell>
                    <TableCell align="center"><p className='font-bold text-TEXT-3'>Phone</p></TableCell>
                    <TableCell align="center"><p className='font-bold text-TEXT-3'>Email</p></TableCell>
                    <TableCell align="center"><p className='font-bold text-TEXT-3'>Google ID</p></TableCell>
                    <TableCell align="center"><p className='font-bold text-TEXT-3'>Subscription</p></TableCell>
                    <TableCell align="center"><p className='font-bold text-TEXT-3'>Dibuat pada</p></TableCell>
                    <TableCell align="center"><p className='font-bold text-TEXT-3'>Edit</p></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.data.map((data , index) => (
                <TableRow
                    key={data.index}
                >
                    <TableCell align="center"><UserCheckbox onChange={value => {}}/></TableCell>
                    <TableCell align="center" className='p-0'><p className='text-[12px]'>{data.id}</p></TableCell>
                    <TableCell align="center"><p className='text-[12px]' >{data.firstName}</p></TableCell>
                    <TableCell align="center"><p className='text-[12px]' >{data.lastName}</p></TableCell>
                    <TableCell align="center"><p className='text-[12px]' >{data.phone}</p></TableCell>
                    <TableCell align="center"><p className='text-[12px]' >{data.email}</p></TableCell>
                    <TableCell align="center"><p className='text-[12px]' >{data.googleId}</p></TableCell>
                    <TableCell align="center"><p className={`text-[12px] text-center text-white w-auto px-[16px] py-[8px] ${data.subscription == 'Unlimited' ? 'bg-black ' : 'bg-primary'} rounded-[30px]`} >{data.subscription}</p></TableCell>
                    <TableCell align="center"><p className='text-[12px]' >{data.createdAt}</p></TableCell>
                    <TableCell align="center"><button onClick={()=>{
                        props.onEditButton(data)}} className='font-bold px-[12px] py-[4px] border-[1px] border-black rounded-[8px]'>Edit</button></TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
    );
}

export default UserTable;
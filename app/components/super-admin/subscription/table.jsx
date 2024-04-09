import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import UserCheckbox from '../checkbox'
import AppToggle from './toggle';

const SubscriptionTable = (props) =>  {
    return (
        <TableContainer >
            <Table sx={{ minWidth: '100%' , '&:last-child td, &:last-child th': { border: 0 } }}aria-label="simple table">
            <TableHead>
                <TableRow className='bg-[#F3F5F8]'>
                    <TableCell align="center" ><UserCheckbox onChange={value => {}} /></TableCell>
                    <TableCell align="center" className='p-0'><p className='font-bold text-TEXT-3'>ID</p></TableCell>
                    <TableCell align="center"><p className='font-bold text-TEXT-3'>Name</p></TableCell>
                    <TableCell align="center"><p className='font-bold text-TEXT-3'>Monthly Price</p></TableCell>
                    <TableCell align="center"><p className='font-bold text-TEXT-3'>Yearly Discount</p></TableCell>
                    <TableCell align="center"><p className='font-bold text-TEXT-3'>Yearly Price</p></TableCell>
                    <TableCell align="center"><p className='font-bold text-TEXT-3'>Available</p></TableCell>
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
                    <TableCell align="center"><p className='text-[12px]' >{data.name}</p></TableCell>
                    <TableCell align="center"><p className='text-[12px]' >{data.monthlyPrice}</p></TableCell>
                    <TableCell align="center"><p className='text-[12px]' >{data.yearlyDiscount}</p></TableCell>
                    <TableCell align="center"><p className='text-[12px]' >{data.yearlyPrice}</p></TableCell>
                    <TableCell align="center">
                        <div className='flex gap-[8px]'>
                            <AppToggle
                                defaultChecked={data.available}
                                onChange={(value)=>{
                                    
                                }}
                            />
                            <p className='text-[12px] text-primary' >{`${data.available ? 'available' : 'non-available'}`}</p>
                        </div>
                    </TableCell>
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

export default SubscriptionTable;
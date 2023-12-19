import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import IconButton from '@mui/material/IconButton';
import dayjs from 'dayjs';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';

export default function TransactionList({ data, fetchTransactions, setEditTransaction }) {
    
    const user = useSelector((state) => state.auth.user);

    function categoryName(id) {
        const category = user.categories.find((category => category._id === id));
        return category ? category.label : "NA";
    }
    // function categoryName(id) {
    //     const category = user?.categories?.find((category) => category._id === id);
    //     return category ? category.label : "NA";
    // }

    async function remove(_id) {
        const token = Cookies.get("token");
        if (!window.confirm("Are you sure?")) return;
        const res = await fetch(
            `${process.env.REACT_APP_API_URL}/transaction/${_id}`,
            
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            }
        );
        if (res.ok) {
            fetchTransactions();
            window.alert("Deleted Successfully");
        }
        // window.location.reload();
    }

    function formatDate(date){
        return dayjs(date).format("DD MMM, YYYY");
    }

    

    return (
        
        <Box>
            <Typography sx={{marginTop: 5}} variant="h6" align="center">List of Transaction</Typography>
            <TableContainer component={Paper} sx={{ marginBottom: 5 }}>
                <Table sx={{ minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Amount</TableCell>
                            <TableCell align="center">Description</TableCell>
                            <TableCell align="center">Category</TableCell>
                            <TableCell align="center">Date</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data.map((month) => (
                                month.transactions.map((row) => (
                                    <TableRow
                                        key={row._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="center" component="th" scope="row">
                                            Rp{row.amount.toLocaleString('id-ID')}
                                        </TableCell>
                                        <TableCell align="center">{row.description}</TableCell>
                                        <TableCell align="center">{categoryName(row.category_id)}</TableCell>
                                        <TableCell align="center">{formatDate(row.date)}</TableCell>
                                        <TableCell
                                        align="center"
                                       >
                                            <IconButton
                                                color="primary"
                                                component="label"
                                                onClick={() => { setEditTransaction(row) }}
                                            >
                                                <EditSharpIcon />
                                            </IconButton>
                                            <IconButton color="warning" component="label" onClick={() => remove(row._id)}>
                                                <DeleteSharpIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    
    );
}
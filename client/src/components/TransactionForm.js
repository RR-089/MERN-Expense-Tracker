import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Cookies from 'js-cookie';
import Autocomplete from "@mui/material/Autocomplete";
import { useSelector } from 'react-redux';

const InitialForm = {
    amount: 0,
    description: "",
    date: new Date(),
    category_id: ""
}

export default function TransactionForm({ fetchTransactions, editTransaction }) {
    // const { user } = useSelector((state) => state.auth);
    // const categories = user?.categories || [];
    const { categories } = useSelector((state) => state.auth.user);

    const [form, setForm] = useState(InitialForm);
    const token = Cookies.get("token");

    useEffect(() =>{
        if(editTransaction.amount !== undefined){
            setForm(editTransaction);
        }
    }, [editTransaction]);


    function handleChange(e){
        setForm({ ...form, [e.target.name]: e.target.value }); 
    }

    function handleDate(newValue){
        setForm({ ...form, date: newValue });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        editTransaction.amount === undefined ? create() : update();
    }

    function reload(res){
        if (res.ok) {
            setForm(InitialForm);
            fetchTransactions();
        }
    }

    async function create(){
        const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction`, {
            method: "POST",
            body: JSON.stringify(form),
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`
            },
        });
        reload(res);
    }

    async function update() {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction/${editTransaction._id}`, 
        {
            method: "PATCH",
            body: JSON.stringify(form),
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`
            },
        });
        reload(res);
        editTransaction.amount = undefined;
    }

    function getCategoryNameById(){
        return categories.find((category) => category._id === form.category_id) ?? "";
    }

    return (
        <Card sx={{ minWidth: 275 , marginTop: 10}}>
            <CardContent>
                {
                    editTransaction.amount !== undefined && (
                        <Typography variant="h6" align='center'>Update Transaction</Typography>
                    )
                }
                {
                    editTransaction.amount === undefined && (
                        <Typography variant="h6" align='center'>Add New Transaction</Typography>
                    )
                }
                <Box component="form" onSubmit={handleSubmit} sx={{display:"flex", marginTop: 3}}>
                    <TextField 
                    id="outlined-basic" 
                    sx={{ marginRight: 5 }}
                    size="small"
                    label="Amount" 
                    name="amount"
                    variant="outlined"
                    value={form.amount} 
                    onChange={handleChange}/>
                    
                    <TextField 
                    id="outlined-basic" 
                    sx={{ marginRight: 5 }}
                    size="small"
                    label="Description" 
                    name="description"
                    variant="outlined"
                    value={form.description}
                    onChange={handleChange} />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                            label="Transaction Date"
                            inputFormat="MM/DD/YYYY"
                            onChange={handleDate}
                            value={form.date}
                            renderInput={(params) => (
                            <TextField sx={{ marginRight: 5 }} size="small" {...params} />
                            )}
                        />
                    </LocalizationProvider>
                    <Autocomplete
                        value={getCategoryNameById()}
                        onChange={(event, newValue) => {
                            setForm({ ...form, category_id: newValue._id });
                        }}
                        id="controllable-states-demo"
                        options={categories}
                        sx={{ width: 200, marginRight: 5 }}
                        renderInput={(params) => (
                            <TextField {...params} size="small" label="Category" />
                        )}
                    />

                    {
                        editTransaction.amount !== undefined && (
                            <Button type="submit" variant="secondary">Update</Button>
                        )
                    }
                    {
                        editTransaction.amount === undefined && (
                            <Button type="submit" variant="contained">Submit</Button>
                        )
                    }

                </Box>
            </CardContent>
        </Card>
    );
}
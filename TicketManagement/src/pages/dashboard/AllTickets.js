import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../../layout/DashboardLayout'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteSlice, solveTickets } from '../../Redux/Slice/userSlice';
import EditNoteIcon from '@mui/icons-material/EditNote';

function AllTickets() {
    // const allUser = useSelector((state) => state.userrole.data)
    const allTicket = useSelector((state) => state?.userrole?.data?.find((data) => data?.userEmail == localStorage.getItem("email")))
    const TechnicalRole = useSelector((state) => state?.user?.data?.find((data) => data?.email == localStorage?.getItem("email") && data.role == "technical"))
    const allTicketTechnical = useSelector((state) => state.userrole?.data?.flatMap((user) => user?.userTickets))
    console.log("all tickets data allTicket", allTicket)
    console.log("allTicketTechnical new", allTicketTechnical)
    console.log("all tickets TechnicalRole", TechnicalRole)
    // console.log("allUser", allUser)
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [answer, setAnswer] = useState("")
    const [Id, setId] = useState(0)

    const handleClose = () => {
        setOpen(false)
        setId(0)
        setAnswer("")
    }

    const submitAnswer = () => {
        console.log("id===>", Id)
        dispatch(solveTickets({ answer: answer, id: Id }))
        setOpen(false)
        setAnswer("")
        setId(0)
    }

    // const [tickets, setTickets] = useState(TechnicalRole ? allTicketTechnical : allTicket?.userTickets);

    const deleteTicket = (id) => {
        dispatch(deleteSlice(id))
    }
    const editOpen = (id) => {
        setOpen(true); 
        setId(id)
    }

    return (
        <Layout>
            <Grid container spacing={2}>
                {(TechnicalRole?.role === "technical" || allTicket?.userRole !== "user") ?
                    (
                        allTicketTechnical?.map((data, index) => (
                            <SingleTicket data={data} deleteTicket={deleteTicket} editOpen={editOpen} TechnicalRole ={TechnicalRole }/>
                        ))
                    
                    )
                    :
                    (
                        allTicket?.userTickets?.map((data, index) => (
                            <SingleTicket data={data} deleteTicket={deleteTicket} editOpen={editOpen} TechnicalRole ={TechnicalRole } />
                        ))
                    
                    )
                }
            </Grid>
            <Dialog
                open={open}
                keepMounted
                onClose={handleClose}
            >
                <DialogTitle>{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                    <TextField style={{ width: "100%" }} label="answer" onChange={(e) => setAnswer(e.target.value)} value={answer} variant='outlined' />
                </DialogContent>
                <DialogActions style={{ display: "flex", justifyContent: "space-around" }}>
                    <Button variant="contained" onClick={submitAnswer}>Submit</Button>
                    <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>

        </Layout>
    )
}

function SingleTicket({ data, editOpen, deleteTicket,TechnicalRole  }) {
    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <div style={{ border: data?.status == "Resolved" ? "3px solid #8ff18f" : "1px solid black", padding: "10px" }}>
                <div className='text-xs'>{data.Ticket}</div>
                {data?.status == "Resolved" &&
                    <> <h4>Answer:</h4>
                        <p>{data?.answer}</p>
                    </>}
                <DeleteIcon onClick={() => {deleteTicket( data.id)}} />
                {TechnicalRole?.role !== "user" && <EditNoteIcon onClick={() => { editOpen(data.id) }} />}
                <p>Status : {data?.status} </p>
            </div>
        </Grid>
    )
}

export default AllTickets
import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
    name: "userrole",
    initialState: {
        data: []
    },
    reducers: {
        addEmail: (state, action) => {
            const { email, role } = action.payload;
            const existingUser = state.data.find(user => user.userEmail === email);
            if (existingUser) {
                existingUser.userEmail = email;
            } else {
                state.data.push({ userEmail: email, userTickets: [], userRole: role });
            }
        },
        addTicket: (state, action) => {
            const existingUser = state.data.find(user => user.userEmail === localStorage.getItem("email"));
            console.log("existingUser", existingUser)
            if (existingUser) {
                action.payload.id = Date.now();
                action.payload.status = "pending"
                existingUser.userTickets.push(action.payload);
            }

           
        },
        deleteSlice: (state, action) => {
            console.log("delete payload", action.payload)
            const existingUser = state.data.find(user => user.userEmail == localStorage.getItem("email"));
            console.log("existingUser in the delete api", existingUser)
            console.log("existingUser delter", existingUser)
            if (existingUser?.userRole == "technical" || existingUser?.role == "admin" || existingUser == undefined  ) {
                state.data.forEach((user) => {
                    user.userTickets = user.userTickets?.filter((ticketId) => ticketId.id !== action.payload)
                })
            } else {
                existingUser.userTickets = existingUser.userTickets.filter((existId) => existId.id !== action.payload)
            }
            // state.userDataEmail.userTickets = state.userDataEmail.userTickets.filter((text) => text.Ticket !== action.payload)
        },
        solveTickets: (state, action) => {
            console.log("resolee", action.payload)
            const { answer, id } = action.payload;
            state.data.forEach((user) => {
                user.userTickets = user.userTickets.map((ticket) => {
                    if (ticket.id === id) {
                        return {
                            ...ticket,
                            answer: answer,
                            status: "Resolved"
                        };
                    }
                    return ticket; 
                });
            });
        }
    },
})

export const { addTicket, deleteSlice, solveTickets, addEmail } = UserSlice.actions;
export default UserSlice.reducer;
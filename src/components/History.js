import React, {useEffect, useState} from 'react';
import Drawer from './Drawer';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider';
import { ThemeProvider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {useParams} from 'react-router-dom';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
const axios = require("axios");
function NameFind(arr,id){
    for(var i = 0;i<arr.length;i++)
    {   
       if(arr[i].uid == id)
       {
           var namefull = arr[i].fname + " " + arr[i].lname;
           
       }
    }
return namefull;
}

function History(){
    const [hospHist, setchangehospHist] = useState([]);
    const [bbHist, setchangebbHist] = useState([]);
    const [docHist, changedocHist] = useState([]);
    const [users,setUsers] = useState([]);

    const params = useParams();
       React.useEffect(() => {
        
        axios.get(`https://healthcare-backend-api.herokuapp.com/api/hospital/history/${localStorage.getItem("uid")}`)    
         
        
        
        .then(function(response){
         
       
        setchangehospHist(response.data.data);
        
        
        }).catch(function (error) {
            console.log("Invalid Request");
          });
          axios.get(`https://healthcare-backend-api.herokuapp.com/api/bloodbank/history/${localStorage.getItem("uid")}`)    
         
        
        
          .then(function(response){
       
          console.log(response.data.message);
          setchangebbHist(response.data.message);
         
          
          
          
          }).catch(function (error) {
              console.log("Invalid Request");
            });

            axios.get(`https://healthcare-backend-api.herokuapp.com/api/doctor/appointments/history/${localStorage.getItem("uid")}`,{
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token")
                  
                }
    
              })    
         
        
        
          .then(function(response){
       
          console.log(response.data.data);
          changedocHist(response.data.data); 
         
          
          
          
          }).catch(function (error) {
              console.log("Invalid Request");
            });
         
            axios.get("https://healthcare-backend-api.herokuapp.com/api/users",{
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token")
                  
                }
        
              })    
             
            
            
            .then(function(response){
            console.log(response.data.message);  
            setUsers(response.data.message);
                      
            }).catch(function (error) {
                console.log("Invalid Request");
              });
       
      },[]);    


    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'flex',
        },
        
        content: {
          flexGrow: 1,
          backgroundColor: theme.palette.background.default,
          padding: theme.spacing(3),
          paddingLeft:theme.spacing(20),
          backgroundColor:"whitesmoke"
          
        },
      }));
      const classes = useStyles();
    return(
        <div >
        <Drawer />
            <div className = {classes.content} style={{marginTop:"10vh", marginLeft:"5vw"}}>
                <p className = "titlepage" align = "center" style={{fontSize: "4.1vw", color: "#11223E" }}>YOUR HISTORY</p>
                <Divider />
                <br />
                <Paper elevation = {3}>
                <strong><p className = "tablehead" align = "center" style={{fontSize: "1.5vw", color: "white",backgroundColor:"#f177aa"}}>HOSPITAL</p></strong>
                
                
                <Grid container spacing={3}>
                    <Grid item xs={1}>
                    <Typography variant='h6'></Typography>
                    </Grid>
                    <Grid item xs={1}>
                    <Typography variant='h6'><u>Sr.</u></Typography>
                    </Grid>
                    <Grid item xs={2}>
                    <Typography variant='h6'><u>Hospital</u></Typography>
                    </Grid>
                    <Grid item xs={2}>
                    <Typography variant='h6'><u>Admit</u></Typography>
                    </Grid>
                    <Grid item xs={2}>
                    <Typography variant='h6'><u>Discharge</u></Typography>
                    </Grid>
                    <Grid item xs={2}>
                    <Typography variant='h6'><u>Reason</u></Typography>
                    </Grid>
                    <Grid item xs={2}>
                    <Typography variant='h6'><u>Remarks</u></Typography>
                    </Grid>
                    
                </Grid>
                
                <br />
                {
                    hospHist.map((hospCurr,i) => {
                        return(
                            <div>
                            <Grid container spacing={3}>
                    <Grid item xs={1}>
                    <Typography variant='h6'></Typography>
                    </Grid>
                    <Grid item xs={1}>
                    <Typography variant='h6'>{i+1}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                    <Typography variant='h6'>{hospCurr.name}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                    <Typography variant='h6'>{hospCurr.admitDate.substring(0,10)}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                    <Typography variant='h6'>{hospCurr.dischargeDate}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                    <Typography variant='h6'>{hospCurr.reason}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                    <Typography variant='h6'>{hospCurr.remarks}</Typography>
                    </Grid>
                    
                </Grid>

                            </div>
                            

                        )
                    })
                }
                </Paper>
                <br /><br />
                <Divider />
                <br />
                <Paper elevation = {3}>
                <strong><p className = "tablehead" align = "center" style={{fontSize: "1.5vw", color: "white",backgroundColor:"#f177aa"}}>BLOODBANK</p></strong>
                
              
                <Grid container spacing={3}>
                    <Grid item xs={1}>
                    <Typography variant='h6'></Typography>
                    </Grid>
                    <Grid item xs={1}>
                    <Typography variant='h6'><u>Sr.</u></Typography>
                    </Grid>
                    <Grid item xs={5}>
                    <Typography variant='h6'><u>Bloodbank</u></Typography>
                    </Grid>
                    <Grid item xs={4}>
                    <Typography variant='h6'><u>Total Units Donated</u></Typography>
                    </Grid>
                    <Grid item xs={1}>
                    <Typography variant='h6'></Typography>
                    </Grid>
                    
                    
                </Grid>
                
                {
                    bbHist.map((bbCurr,i) => {
                        return(
                            <div>
                            <Grid container spacing={3}>
                    <Grid item xs={1}>
                    <Typography variant='h6'></Typography>
                    </Grid>
                    <Grid item xs={1}>
                    <Typography variant='h6'>{i+1}</Typography>
                    </Grid>
                    <Grid item xs={5}>
                    <Typography variant='h6'>{bbCurr.name}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                    <Typography variant='h6'>{bbCurr.total}</Typography>
                    </Grid>
                    <Grid item xs={1}>
                    <Typography variant='h6'></Typography>
                    </Grid>
                    
                    
                </Grid>
                <br />

                            </div>

                        )
                    })
                }
                </Paper>
                <Divider />
                <br />
                <Paper elevation = {3}>
                <strong><p className = "tablehead" align = "center" style={{fontSize: "1.5vw", color: "white",backgroundColor:"#f177aa"}}>APPOINTMENTS</p></strong>
              
                <Grid container spacing={3}>
                    <Grid item xs={1}>
                    <Typography variant='h6'></Typography>
                    </Grid>
                    <Grid item xs={1}>
                    <Typography variant='h6'><u>Sr.</u></Typography>
                    </Grid>
                    <Grid item xs={1}>
                    <Typography variant='h6'><u>Doctor</u></Typography>
                    </Grid>
                    <Grid item xs={2}>
                    <Typography variant='h6'><u>Date</u></Typography>
                    </Grid>
                    <Grid item xs={2}>
                    <Typography variant='h6'><u>Timeslot</u></Typography>
                    </Grid>
                    <Grid item xs={2}>
                    <Typography variant='h6'><u>Reason</u></Typography>
                    </Grid>
                    <Grid item xs={2}>
                    <Typography variant='h6'><u>Remarks</u></Typography>
                    </Grid>
                    <Grid item xs={1}>
                    <Typography variant='h6'><u>isDone</u></Typography>
                    </Grid>
                   
                    
                </Grid>
               
                {
                    docHist.map((docCurr,i) => {
                        if(docCurr.d_uid != localStorage.getItem("uid"))
                        return(
                            
                            <div>
                             <Grid container spacing={3}>
                    <Grid item xs={1}>
                    <Typography variant='h6'></Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography variant='h6'>{i+1}</Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography variant='h6'>{NameFind(users,docCurr.d_uid)}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant='h6'>{docCurr.doa.substring(0,10)}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant='h6'>{docCurr.timeslot}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant='h6'>{docCurr.reason}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant='h6'>{docCurr.remarks}</Typography>
                    </Grid>
                    <Grid item xs={1}>
                        {docCurr.isDone == 1?<Checkbox
                    checked = {true}
                   
                  />:<Checkbox
                 checked = {false}
                 
                />}
                        
                    </Grid>
                   
                    
                </Grid>
                            </div>

                        )
                    })
                }
                </Paper>




            </div>
        </div>
    )
}

export default History
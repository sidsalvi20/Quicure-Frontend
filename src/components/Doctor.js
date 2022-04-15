import React ,{useState, useEffect} from 'react';
import Drawer from './Drawer'
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
const axios = require("axios");
const useStyles = makeStyles((theme) => ({
  container: {
    //display: "flex"
    marginTop:"10vh",
  },
}));

function PrivDoctor(){
    const classes = useStyles();
    //FETCH DATA USING USEEFFECT IN THE FORMAT GIVEN BELOW
    const [data,setData] = React.useState([]);
    React.useEffect(() => {
        
        axios.get("https://healthcare-backend-api.herokuapp.com/api/doctor/private",{
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
                
              }
  
        })    
         
        
        
        .then(function(response){
        console.log(response.data.message); 
        setData(response.data.message);
         

        
        
        
        }).catch(function (error) {
            console.log("Invalid Request");
          });
       
        
       
      },[]);



    return(
        <div className={classes.container}>
        <Drawer />
        <br />
            <p
            className = "titlepage" align = "center" style={{fontSize: "4.1vw", color: "#11223E", marginLeft: "15vw" }}
            > 
            PRIVATE DOCTORS
            </p>
            <Divider />
            <Paper>
            <div style = {{background:"#f177aa"}}>
            <br />
            <Grid container spacing={3}>
        <Grid item xs={1}>
        </Grid>

        <Grid item xs={1}>
          
        </Grid>
        <Grid item xs={3}>
         <Typography variant='h5' style = {{color:"white"}}><u>Name</u></Typography>
        </Grid>
        <Grid item xs={2}>
        <Typography variant='h5' style = {{color:"white"}}><u>City</u></Typography>
        </Grid>
        <Grid item xs={2}>
        <Typography variant='h5' style = {{color:"white"}}><u>State</u></Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant='h5' style = {{color:"white"}}><u>Specialization</u></Typography>
        </Grid>
        <Grid item xs={1}>
          
        </Grid>

        

      </Grid>
      <Divider />


      </div>
      {
          data.map((currDoc,i)=>{
            if(currDoc.uid != localStorage.getItem("uid"))
            
              return(
                  <div>
            <br />

                <Grid container spacing={3}>
                <Grid item xs={1}>
                </Grid>

                <Grid item xs={1}>
                <Typography>{i+1}</Typography>
                </Grid>
                <Grid item xs={3}>
              <Link href={`/doctor/${currDoc.uid}`}>  <Typography>{currDoc.fname} {currDoc.lname}</Typography> </Link>
                </Grid>
                <Grid item xs={2}>
                <Typography>{currDoc.work_city}</Typography>
                </Grid>
                <Grid item xs={2}>
                <Typography>{currDoc.work_state}</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography>{currDoc.specialization}</Typography>
                </Grid>
                <Grid item xs={1}>
                    
                </Grid>

                </Grid>
                <br />
                <Divider light/>
                </div>
              )
          })

      }</Paper>
      
        </div>
    )
}

export default PrivDoctor;
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {apis} from "../services";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from "@mui/material/Grid";
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/material/styles';
import moment from "moment";
const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});
const Exhibtion = () => {
    const navigate = useNavigate();
    const params=useParams()
    const [open, setOpen] = React.useState(false);
    const [data,setData]=useState({})
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };
    useEffect(()=>{
        getdata()
    },[])
    const getdata=()=>{
        handleToggle()
        apis.getexhibition(params?.id).then(response=>{

            if(response.data.data!=undefined){
                setData(response.data.data)

            }else{
                setData(null)

            }
         handleClose()
        })
    }
    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            {data==null? '':
                <>
                    <a href="/"
                    >Back</a>
                <Paper
                sx={{
                    p: 2,
                    margin: 'auto',
                    maxwidth:1000,
                    flexGrow: 1,
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
            >
                <Grid container spacing={2}>
                    <Grid item>
                        <Typography>
                            {data.title}

                        </Typography>
                        <Typography>
                            {moment(data.aic_start_at).format('YYYY-MM-DD')} - {moment(data.aic_end_at).format('YYYY-MM-DD')}
                        </Typography>
                        <Img alt="complex" src={data?.image_url} />

                    </Grid>
                    <Grid item xs={12} sm container>
                        <Typography>
                            {data.description}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
                    </>}

            </>
    );
};

export default Exhibtion;
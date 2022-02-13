import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Grid from '@mui/material/Grid';
import {useEffect, useState} from "react";
import  {apis} from "../services"
import moment from "moment"
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';

 const Exibitions= ()=> {
     const navigate = useNavigate();
     const [limit,setLimit]=useState(10)
     const [page,setPage]=useState(1)
     const [offset,setOffset]=useState(0)
     const [totalpages,setTotalpages]=useState(0)
    const [itemData,setitemData]=useState([])
     const [open, setOpen] = React.useState(false);
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
         apis.getexhibitions(`?limit=${limit}&page=${page}&offset=${offset}
         &fields[]=aic_start_at&fields[]=aic_end_at&fields[]=title&fields[]=id&fields[]=image_url`).then(response=>{
             console.log("rsposne is ",response.data)
             setitemData(List => [...List, ...response.data.data])
             setPage(response.data.pagination.current_page+1)
             setOffset(response.data.pagination.current_page*limit)
             setTotalpages(response.data.pagination.total_pages);
             handleClose()
         })
     }

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        <ImageList sx={{ width: '100%', height: 450 ,cursor: 'pointer'}} cols={3} >
            {itemData.map((item) => (
                <ImageListItem key={item.id} onClick={()=>{

                    navigate(`exhibition/${item?.id}`);
                }}>
                    <img
                        src={`${item.image_url}`}
                        srcSet={`${item.image_url}`}
                        alt={item.title}
                        loading="lazy"
                    />
                    <ImageListItemBar
                        title={item.title}
                        subtitle={<span>{moment(item.aic_start_at).format('YYYY-MM-DD')} - {moment(item.aic_end_at).format('YYYY-MM-DD')}</span>}
                        position="below"
                    />
                </ImageListItem>
            ))}

        </ImageList>
            {totalpages>page?
                <Button variant="contained" onClick={getdata}>click to load {limit} more images</Button>
            :''}
        </Grid>
    );
}



export default Exibitions;
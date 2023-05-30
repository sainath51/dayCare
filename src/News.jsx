import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Newsform from './Newsform';

export default function News() {
    const [news, setNews] = useState([]);
    const [toggle, setToggle] = useState(false);
    // Fetch news Info from API
    useEffect(() => {
        fetch('http://localhost:3001/news/')
            .then(response => response.json())
            .then(data => setNews(data))
    }, [])


    return (
        <div >
            {toggle && <><Newsform /></>}
            {!toggle && news && news.map((x,i) =>
                <Card className={''} key={i}>

                    <CardContent id={x.id}>
                        <Typography color="primary" variant="h6">
                            {x.title}
                        </Typography>
                        <Typography color="textSecondary" variant="subtitle2">
                            {x.author}
                        </Typography>
                        <Typography variant="body2" component="p">
                            <br />
                            {x.content}
                        </Typography>
                    </CardContent>
                </Card >
            )}
            <Box
                m={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                {!toggle && <Button variant="contained" onClick={() => { setToggle(true) }}>Create New Post</Button>}
            </Box>
        </div>
    )

}
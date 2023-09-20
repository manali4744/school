import * as React from 'react';
import { useState, useEffect } from "react";
import axios from 'axios';
import './blog.css'

function Blog() {

    const [blogdata, setBlogdata] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/getblog/');
                setBlogdata(response.data.blog);
            } catch (error) {
                console.log("Error:", error);
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            {blogdata.map((blogEntry, index) => (
                <div className='container' key={index}>
                        <div className="column">
                            <div className="">
                                <img src={`http://127.0.0.1:8000${blogEntry.blog_img}`} style={{height: "450px", marginTop: "50px", maxWidth: "1000px"}}/>
                            </div>
                            <div className="">
                                <h2 className='subject-title'>{blogEntry.title}</h2>
                                <p className='subject-description'>{blogEntry.description}</p>
                            </div>
                        </div>
                </div>
            ))}
        </div>
    
    )
};

export default Blog;

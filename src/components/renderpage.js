import React, {useState, useEffect} from 'react';

const RenderPage = (props) => {
    
    return (
        <ol>
            
            {
                props.postList.map((post, index) => {
                    return <li key={index}>{post.author.username}</li>
                })
            }
        </ol>
    )
}

export default RenderPage;
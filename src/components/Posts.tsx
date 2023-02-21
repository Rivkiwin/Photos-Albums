import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Link,
    useRouteMatch
} from "react-router-dom";

function Posts() {

    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [flag, setFlag] = useState<any[]>([]);
    let { url, path } = useRouteMatch();

    useEffect(() => {
        getPosts();
    }, [])

    const getPosts = async () => {
        const id = JSON.parse(localStorage.getItem("currentUser") as any).id;
        const allPosts = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
        const allPost = await allPosts.json();
        setPosts(allPost);
    }

    const getComments = async (id: any) => {
        const allcom = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
        const comment = await allcom.json()
        setComments(comment);
        const prev = flag[id];
        let temp:any[] = [];
        for (let i = 0; i < comments.length; ++i) {
            temp[i] = 0;
        }
        prev ? temp[id] = 0 : temp[id] = 1;
        setFlag(temp);
    }

    return (
        <div className="center row">
            <div className="col-12">
                <ul>
                    {posts.map((post:any) => <li className="list-group-item list-group-item-action" id="list-home-list" data-bs-toggle="list" role="tab" aria-controls="list-home">


                        <Link className="link" to={{
                            pathname: `${url}/body`,
                            state: post
                        }}>{post.title}<hr></hr></Link>

                        <button className="btn btn-danger margin" onClick={() => getComments(post.id)}>comments</button>


                        {flag[post.id] ? comments.map((com:any, index) => <div key={index}>
                            <p > {com.name}</p>
                            <p > {com.email}</p>
                            <p > {com.body}</p>
                            <br></br>
                        </div>) : null}
                    </li>)}
                </ul>
            </div>
        </div >

    )
}

export default Posts;
const root = document.getElementById('root');

$(document).ready(function() {
    $('form').submit(function(e) {
        e.preventDefault();
        const title = document.getElementById('title');
        const content = document.getElementById('content');
        const author = document.getElementById('author');
        createPost(title.value, content.value, author.value);
        title.value="";
        content.value="";
        author.value="";
    });
});
//acquire cookie
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
//acquire csrftoken
const csrftoken = getCookie('csrftoken');

function createPost(title, content, author) {
    const data = {
        method: "POST",
        mode:'same-origin',
        headers: {
            'Content-Type': "application/json",
            'X-CSRFToken':csrftoken
        },
        body: JSON.stringify({
            title, content, author
        })
    }
    fetch('/api/posts/create/', data)
    .then(() => {
        getPostList();
    })
    .catch(err => {
        console.error(err);
    })
}

//clear the page
function clearChildren(node){
    while(node.firstChild){
        node.removeChild(node.firstChild)
    }
}

// fetch data and render
// create a DOM node
const createNode=(element)=>{
    return document.createElement(element);
}

//append a child node to it's parent node
const append=(parent,child)=>{
    return parent.appendChild(child);
}

//fetch api data
const getPostList=()=>{
    fetch('/api/posts')
    .then(res => res.json())
    .then(data=>{
        //clear all nodes of root
        clearChildren(root);
        //render the data we get
        renderPosts(data);
    })
    .catch(err=>{
        console.error(err)
    })
}

const renderPosts=(data)=>{
    // for every value in the data, render it
    return data.map(post=>{
        renderPost(post);
    })
}

const renderPost=(post)=>{
    //make every instance a node
    const div =createNode('div');
    div.className='post-item';
    const title = createNode('h2');
    const publishDate = createNode('span')
    const lastUpdated = createNode('span')
    const content = createNode('p');
    const author = createNode('small');
    const link = createNode('a');
    link.href = `/posts/${post.id}/`;
    //add inner text to the node
    author.innerText=`  written by ${post.author}`;
    title.innerText=post.title;
    content.innerText=post.content;
    publishDate.innerText=`Published : ${new Date(post.publish_date).toDateString()}\n`;
    lastUpdated.innerText=`Last Updated : ${new Date(post.updated).toDateString()}`;
    //append the nodes
    append(link,title);
    append(title,author)
    append(div,link);
    append(div,content);   
    append(div,publishDate);   
    append(div,lastUpdated);   
    append(root,div);
}

getPostList()
const root = document.getElementById('root');
const title = document.getElementById('title');
const content = document.getElementById('content');
const author = document.getElementById('author');

//get pk
const pathname=window.location.pathname;
const pathnamePart = pathname.split('/');
const postID = pathnamePart[pathnamePart.length-2];

$(document).ready(function() {
    $('form').submit(function(e) {
        console.log('heelo');
        e.preventDefault();
        // prepopulateForm(e);
        console.log(title.value, content.value, author.value);
        updatePost(title.value, content.value, author.value);
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


const prepopulateForm=(data)=>{
    title.value=data.title;
    content.value=data.content;
    // author.value=data.author;
}

const updatePost=(title,content,author)=>{
    const data = {
        method: "PUT",
        mode:'same-origin',
        headers: {
            'Content-Type': "application/json",
            'X-CSRFToken':csrftoken
        },
        body: JSON.stringify({
            title, content, author
        })
    }
    fetch(`/api/posts/${postID}/update/`, data)
    .then(() => {
        getPost(postID);
    })
    .catch(err => {
        console.error(err);
    })
}

const deletePost=(postID)=>{
    const data = {
        method: "DELETE",
        mode:'same-origin',
        headers: {
            'Content-Type': "application/json",
            'X-CSRFToken':csrftoken
        }
    }
    fetch(`/api/posts/${postID}/delete/`, data)
    .then(() => {
        window.location='/';
    })
    .catch(err => {
        console.error(err);
    })   
}

//fetch author data
const getAuthor=(authorID)=>{
    fetch(`/api/posts/author/${authorID}/`)
    .then(res => res.json())
    .then(data=>{
        appendAuthor(data);
    })
    .catch(err=>{
        console.error(err)
    })
}
//fetch api data
const getPost=(postID)=>{
    fetch(`/api/posts/${postID}/`)
    .then(res => res.json())
    .then(data=>{
        prepopulateForm(data);
        clearChildren(root);
        renderPost(data);
        getAuthor(data.author);
    })
    .catch(err=>{
        console.error(err)
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

const renderPost=(post)=>{
    //make every instance a node
    const div =createNode('div');
    div.className='post-item';
    const title = createNode('h2');
    title.className = 'post-title';
    const publishDate = createNode('span')
    const lastUpdated = createNode('span')
    const content = createNode('p');
    //add inner text to the node
    title.innerText=post.title;
    content.innerText=post.content;
    publishDate.innerText=`Published : ${new Date(post.publish_date).toDateString()}\n`;
    lastUpdated.innerText=`Last Updated : ${new Date(post.updated).toDateString()}`;
    //append the nodes

    append(div,title);
    append(div,content);   
    append(div,publishDate);   
    append(div,lastUpdated);   
    append(root,div)
    appendDeleteBtn(post);
}


function appendAuthor(data) {
    const title = document.querySelector('.post-title');
    const author = createNode('small');
    author.innerText = ` written by ${data.username}`;
    append(title, author);
}

function appendDeleteBtn(post){
    const postDiv = document.querySelector('.post-item');
    const deleteBtn = createNode('button');
    deleteBtn.className='post-delete-btn';
    deleteBtn.innerText='Delete';
    deleteBtn.addEventListener('click',e=>{
        deletePost(post.id);
    })
    append(postDiv,deleteBtn);
}

getPost(postID);
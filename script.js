
const respId = document.getElementById("respId");
const respId2 = document.getElementById("respId2");
const respBody = document.getElementById("respBody");
const respTitle = document.getElementById("respTitle")
const fetchBtn = document.getElementById("fetchBtn")
const submitBtn = document.getElementById("submitBtn")
const pageform = document.getElementById("formInp")
const editPost = document.getElementById("update")
const xhrBtn = document.getElementById("xhrBtn")
const cancelBtn= document.getElementById("cancelBtn")


cancelBtn.addEventListener('click',function(){
    cancelBtn.classList.add("d-none");
    hideAndResetSupportedContent() ;clearedit()

})
function clearedit() {

    respId2.innerText = ""
}
function hideAndResetSupportedContent() {
    cancelBtn.classList.add('d-none')
    
    document.getElementById("editMode").classList.add("d-none");
    pageform.classList.remove("b-shadow");
    submitBtn.innerText = "Submit"
}


function showSupportedContent() {
    editPost.classList.remove("d-none");
    document.getElementById("editMode").classList.remove("d-none");
    pageform.classList.add("b-shadow");
    respId2.innerText = respId.innerText
    submitBtn.innerText = "Update"

}
editPost.addEventListener('click', function () {
    cancelBtn.classList.remove("d-none");
     document.getElementById("inpTitle").value =respTitle.innerText;
    document.getElementById("inpBody").value = respBody.innerText;;


    showSupportedContent()
})

function displayData(data) {
    if(pageform.classList.contains("b-shadow")){
        respId2.innerText = data.id;
        document.getElementById("inpTitle").value =data.title;
        document.getElementById("inpBody").value =data.body;
        cancelBtn.classList.remove('d-none')
        
        
    } 
    else{
        cancelBtn.classList.add('d-none')
    }
   
    editPost.classList.remove("d-none");
    
    respId.innerText = data.id;

    respBody.innerText = data.body;

    respTitle.innerText = data.title;

}
fetchBtn.addEventListener('click', function () {

    fetch('https://jsonplaceholder.typicode.com/posts/1') // api for the get request
        .then(response => {
            if (!response.ok) {
                respBody.innerText = "Error: Network issue";
                throw new Error('Network issue');

            }
            return response.json();
        })
        .then(data => {
            displayData(data)
        }).catch(error => {

            console.error('Fetch error:', error);
        });;

})

xhrBtn.addEventListener("click", function () {

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/2', true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) { // 4 means the request is complete
            if (xhr.status === 200) { // 200 means the request was successful
                const data = JSON.parse(xhr.responseText);
                console.log(data);
                displayData(data);
            } else {
                console.error('Error fetching data:', xhr.statusText);
            }
        }
    };

    xhr.send();
})

function fetchPostFunction(event) {
    let inputTitle = document.getElementById("inpTitle").value;
    let inputBody = document.getElementById("inpBody").value;
    event.preventDefault();
    actUrl='https://jsonplaceholder.typicode.com/posts'
    postOptions = {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Set content type to JSON
        },
        body: JSON.stringify({ body: inputBody, title: inputTitle })
    }
    if (respId2.innerText !== '') {
        actUrl=`${actUrl}/${respId2.innerText}`;
        postOptions = {

            method: 'PUT',
            headers: {
                'Content-Type': 'application/json' // Set content type to JSON
            },
            body: JSON.stringify({ id:respId2.innerText, body: inputBody, title: inputTitle })
        }
    }

    fetch(actUrl, postOptions) // api for the get request
        .then(response => {
            if (!response.ok) {
                respBody.innerText = "Error: Network issue";
                throw new Error('Network issue');

            }
            return response.json();
        })
        .then(data => {
            displayData(data)
            hideAndResetSupportedContent()
            clearedit()
        }).catch(error => {
            hideAndResetSupportedContent()
            clearedit()
            console.error('Fetch error:', error);
        });

}
submitBtn.addEventListener('click', fetchPostFunction)
pageform.addEventListener('submit', fetchPostFunction)


import Swal from "sweetalert2"

const IP = '0.0.0.0.0.0' // Replace with your server IP

document.getElementById('submit').addEventListener('submit', function (event) {
    event.preventDefault()

    document.getElementById('submit-button').value = 'Uploading...'
    document.getElementById('submit-button').disabled = true

    const formData = new FormData(this);

    fetch(`http://${IP}:3000/upload`, {
        method: 'POST',
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            window.location.href = '/'
        })
        .catch(error => {
            document.querySelector('dialog').close()
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Was an error uploading the files, try again later."
            })
            document.getElementById('submit-button').value = 'Upload'
            document.getElementById('submit-button').disabled = false
        })
})
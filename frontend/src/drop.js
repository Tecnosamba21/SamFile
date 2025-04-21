const dropArea = document.querySelector('.droparea')

const active = () => dropArea.classList.add('dropping')
const inactive = () => dropArea.classList.remove('dropping')
const prevents = e => e.preventDefault()

Array.from(['dragenter', 'dragover', 'dragleave', 'drop']).forEach(evtName => {
    dropArea.addEventListener(evtName, prevents)
})

Array.from(['dragenter', 'dragover']).forEach(evtName => {
    dropArea.addEventListener(evtName, active)
})

Array.from(['dragleave', 'drop']).forEach(evtName => {
    dropArea.addEventListener(evtName, inactive)
})

dropArea.addEventListener('drop', e => {
    const dt = e.dataTransfer
    const files = dt.files
    const fileInput = document.getElementById('files')
    fileInput.files = files
})
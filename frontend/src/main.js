import './style.css'

const IP = '0.0.0.0.0' // Replace with your server IP

const img_extensions = ['jpg', 'jpeg', 'png', 'webp', 'bmp', 'tiff', 'svg', 'ico', 'avif', 'heic']
const video_extensions = ['mp4', 'mkv', 'webm', 'avi', 'mov', 'flv', 'wmv', 'mpeg', 'mpg', '3gp', 'ogg']


fetch(`http://${IP}:3000/files`)
  .then(res => res.json())
  .then(response => {
    Array.from(response.files).reverse().forEach(file => {
      createFileCard(file)
    })
  })

const width = 900
const height = 600

const left = (window.screen.width / 2) - (width / 2)
const top = (window.screen.height / 2) - (height / 2)

function createFileCard(name) {
  const container = document.querySelector('main')
  const card = document.createElement('div')
  const text = document.createElement('h3')
  const buttons = document.createElement('div')
  const download = document.createElement('button')
  const download_img = document.createElement('img')
  const remove = document.createElement('button')
  const remove_img = document.createElement('img')
  const text_container = document.createElement('div')
  const file_img = document.createElement('img')

  const isVideo = video_extensions.includes(name.split('.')[name.split('.').length -1])

  if (img_extensions.includes(name.split('.')[name.split('.').length -1])) {
    file_img.src = '/image_file.svg'
  } else if (isVideo) {
    file_img.src = '/video_file.svg'
  } else if (name.split('.')[name.split('.').length -1] === 'pdf') {
    file_img.src = '/pdf_file.svg'
  } else {
    file_img.src = '/document_file.svg'
  }

  text.textContent = name
  text_container.classList.add('text-container')
  text.onclick = () => {
    if (isVideo) {
      window.open(`http://${IP}:3000/video/` + name, '_blank', `width=900,height=600,toolbar=no,scrollbars=no,resizable=yes,left=${left},top=${top}`)
    } else {
      window.open(`http://${IP}:3000/file/` + name, '_blank', `width=900,height=600,toolbar=no,scrollbars=no,resizable=yes,left=${left},top=${top}`)
    }
  }
  card.classList.add('card')
  text_container.appendChild(file_img)
  buttons.classList.add('buttons')
  download.classList.add('download')
  remove.classList.add('download')
  remove_img.src = './delete.svg'
  download_img.src = './download.svg'
  remove.onclick = async () => {
    fetch(`http://${IP}:3000/delete/` + name, {
      method: 'DELETE'
    })
      .then(() => {
        window.location.href = '/'
      })
      .catch(() => {
        
      })
  }
  download.onclick = async () => {
    const response = await fetch(`http://${IP}:3000/file/` + name)
    const file = await response.blob()
    const link = document.createElement('a')
    link.href = URL.createObjectURL(file)
    link.download = name
    link.click()
    link.remove()
  }

  download.appendChild(download_img)
  remove.appendChild(remove_img)
  buttons.appendChild(download)
  buttons.appendChild(remove)
  text_container.appendChild(text)
  card.appendChild(text_container)
  card.appendChild(buttons)
  container.appendChild(card)
}
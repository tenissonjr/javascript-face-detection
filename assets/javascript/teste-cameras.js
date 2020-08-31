const videoVisitante                    = document.querySelector('#camera-visitante');
const listaCamerasVisitante             = document.querySelector('#listaCamerasVisitante');
const btnSelecionarCameraVisitante      = document.querySelector('#btnSelecionarCameraVisitante');
const btnAtualizarListaCamerasVisitante = document.querySelector('#btnAtualizarListaCamerasVisitante');

let currentStreamCameraVisitante;


const videoDocumento                    = document.querySelector('#camera-documento');
const listaCamerasDocumento             = document.querySelector('#listaCamerasDocumento');
const btnSelecionarCameraDocumento      = document.querySelector('#btnSelecionarCameraDocumento');
const btnAtualizarListaCamerasDocumento = document.querySelector('#btnAtualizarListaCamerasDocumento');

let currentStreamCameraDocumento;


function stopMediaTracks(stream) {
  stream.getTracks().forEach(track => {
    track.stop();
  });
}

function atualizarListaCamerasDisponiveisVisitante(){

  navigator.mediaDevices.enumerateDevices().then((mediaDevices)=>{
        listaCamerasVisitante.innerHTML = '';
        listaCamerasVisitante.appendChild(document.createElement('option'));
        let count = 1;
        mediaDevices.forEach(mediaDevice => {
          if (mediaDevice.kind === 'videoinput') {
            const option = document.createElement('option');
            option.value = mediaDevice.deviceId;
            const label = mediaDevice.label || `Camera ${count++}`;
            const textNode = document.createTextNode(label);
            option.appendChild(textNode);
            listaCamerasVisitante.appendChild(option);
          }
        });
  });
}

function atualizarListaCamerasDisponiveisDocumento(){

  navigator.mediaDevices.enumerateDevices().then((mediaDevices)=>{

      listaCamerasDocumento.innerHTML = '';
      listaCamerasDocumento.appendChild(document.createElement('option'));
      let count = 1;
      mediaDevices.forEach(mediaDevice => {
        if (mediaDevice.kind === 'videoinput') {
          const option = document.createElement('option');
          option.value = mediaDevice.deviceId;
          const label = mediaDevice.label || `Camera ${count++}`;
          const textNode = document.createTextNode(label);
          option.appendChild(textNode);
          listaCamerasDocumento.appendChild(option);
        }
      });

  });  
}

function selecionarCameraVisitante(){
    if (typeof currentStreamCameraVisitante !== 'undefined') {
      stopMediaTracks(currentStreamCameraVisitante);
    }
    const videoConstraints = {};
    if (listaCamerasVisitante.value === '') {
      videoConstraints.facingMode = 'environment';
    } else {
      videoConstraints.deviceId = { exact: listaCamerasVisitante.value };
    }
    const constraints = {
      video: videoConstraints,
      audio: false
    };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(stream => {
          currentStreamCameraVisitante = stream;
          videoVisitante.srcObject = stream;
        return navigator.mediaDevices.enumerateDevices();
      })
      .catch(error => {
        alert(error)          
        console.error(error);
      });

}



function selecionarCameraDocumento(){

    if (typeof currentStreamCameraDocumento !== 'undefined') {
      stopMediaTracks(currentStreamCameraDocumento);
    }
    const videoConstraints = {};
    if (listaCamerasDocumento.value === '') {
      videoConstraints.facingMode = 'environment';
    } else {
      videoConstraints.deviceId = { exact: listaCamerasDocumento.value };
    }
    const constraints = {
      video: videoConstraints,
      audio: false
    };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(stream => {
          currentStreamCameraDocumento = stream;
      videoDocumento.srcObject = stream;
        return navigator.mediaDevices.enumerateDevices();
      })
      .catch(error => {
          alert(error)
        console.error(error);
      });

}

    btnSelecionarCameraVisitante.addEventListener('click', selecionarCameraVisitante);
    btnAtualizarListaCamerasVisitante.addEventListener('click', atualizarListaCamerasDisponiveisVisitante);
    
    btnSelecionarCameraDocumento.addEventListener('click', selecionarCameraDocumento);
    btnAtualizarListaCamerasDocumento.addEventListener('click', atualizarListaCamerasDisponiveisDocumento);

    atualizarListaCamerasDisponiveisVisitante();
    atualizarListaCamerasDisponiveisDocumento();


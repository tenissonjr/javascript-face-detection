class Camera{
  constructor(camera,isPortrait,listaCamerasDisponiveis) {
    this.currentStream;
    this.camera        = camera;
    this.isPortrait   = isPortrait;
    this.listaCamerasDisponiveis=listaCamerasDisponiveis;   
    this.atualizarListaCamerasDisponiveis();
  }

  atualizarListaCamerasDisponiveis(){
    if(this.listaCamerasDisponiveis.tagName !== 'SELECT'){
        console.log(this.listaCamerasDisponiveis.id + ' não é uma tag SELECT')
        return ;
    }
    navigator.mediaDevices.enumerateDevices().then((mediaDevices)=>{
      this.listaCamerasDisponiveis.innerHTML = '';
      this.listaCamerasDisponiveis.appendChild(document.createElement('option'));
      let count = 1;
      mediaDevices.forEach(mediaDevice => {
        if (mediaDevice.kind === 'videoinput' && mediaDevice.label!='Logi Capture') {
          let option = document.createElement('option');
          option.value = mediaDevice.deviceId;
          let label = mediaDevice.label || `Câmera ${count++}`;
          let textNode = document.createTextNode(label);
          option.appendChild(textNode);
          this.listaCamerasDisponiveis.appendChild(option);
        }
      });
  });
  }



  stopMediaTracks() {
    this.currentStream.getTracks().forEach(track => {
      track.stop();
    });
  }

  selecionarCamera(idCamaraSelecionada){

    if (typeof this.currentStream !== 'undefined') {
      this.stopMediaTracks();
    }
    const videoConstraints = {};
    if (idCamaraSelecionada === '') {
      videoConstraints.facingMode = 'environment';
    } else {
  
      videoConstraints.deviceId = { exact: idCamaraSelecionada };
      if (this.isPortrait){
        videoConstraints.width    = { min: 225, max: 225};
        videoConstraints.height   = { min: 300, max: 300};
      }
    }
    const constraints = {
      video: videoConstraints,
      audio: false
    };
  
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(stream => {
          this.currentStream = stream;
          this.camera.srcObject = stream;

        return navigator.mediaDevices.enumerateDevices();
      })
      .catch(error => {
    
        alert(error)          
        console.error(error);
      });
  

  }
  
}

const cameraVisitante = new Camera(document.querySelector('#camera-visitante')
                                    ,true
                                    ,document.querySelector('#listaCamerasVisitante')
                                    )
document.querySelector('#btnSelecionarCameraVisitante').addEventListener     ('click', ()=> cameraVisitante.selecionarCamera(listaCamerasVisitante.value));
document.querySelector('#btnAtualizarListaCamerasVisitante').addEventListener('click', ()=> cameraVisitante.atualizarListaCamerasDisponiveis());


const cameraDocumento = new Camera(document.querySelector('#camera-documento')
                                    ,false
                                    ,document.querySelector('#listaCamerasDocumento')
                                    )
document.querySelector('#btnSelecionarCameraDocumento').addEventListener     ('click', ()=> cameraDocumento.selecionarCamera(listaCamerasDocumento.value));
document.querySelector('#btnAtualizarListaCamerasDocumento').addEventListener('click', ()=> cameraDocumento.atualizarListaCamerasDisponiveis());

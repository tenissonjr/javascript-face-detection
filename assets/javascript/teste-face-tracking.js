
      const video         = document.getElementById('video');
      const canvas        = document.getElementById('canvas');
      var context         = canvas.getContext('2d');

      const percentualFace  = document.querySelector('#percentualFace');
      const percentualMeter = document.querySelector('#percentualMeter');

      const meter = document.querySelector('#meter');
      const btnFotografar       = document.querySelector('#btnFotografarFace')	
      const mensagemCapturaFoto = document.querySelector('#mensagemCapturaFoto')	


      const percentualMinimo = document.getElementById("percentualMinimo");
      const  corte = document.getElementById("corte");

      corte.innerHTML = percentualMinimo.value; 
      percentualMinimo.oninput = function() {
        corte.innerHTML = this.value;
      }

    function round(value, decimals) {
      return  Number(Math.round(value+'e'+decimals)+'e-'+decimals);
    }



    
    
    
    function IdentificarRosto() {

      var tracker = new tracking.ObjectTracker('face');
      tracker.setInitialScale(4);
      tracker.setStepSize(2);
      tracker.setEdgesDensity(0.1);

      tracking.track('#video', tracker, { camera: true });

      tracker.on('track', function(event) {
      context.clearRect(0, 0, canvas.width, canvas.height);


      if (parseFloat( percentualMinimo.value )==0){
        return ;
      }

      event.data.forEach( rect => destacarRostoIdentificado(rect));      

        if (event.data.length == 0){        
          mensagemCapturaFoto.innerHTML='Falha de captura. Nenhum rosto identificado.'
          btnFotografar.disabled = true;
        } else if (event.data.length > 1){
          mensagemCapturaFoto.innerHTML='Falha de captura. Mais de um rosto identificado.'
          btnFotografar.disabled = true;
        }
      });


    }

   function destacarRostoIdentificado(rect) {

        let  percentualFaceIdentificado =  round( (rect.width * rect.height) / (canvas.width*canvas.height) ,2)  *100 ;
        percentualFace.innerHTML=  percentualFaceIdentificado.toLocaleString("pt-BR", { maximumFractionDigits: 2, minimumFractionDigits: 2 })  +  ' %'

        let valPercentualMinimo  =   parseFloat( percentualMinimo.value );

          console.log("*percentualMinimo",valPercentualMinimo)
          console.log("percentualFaceIdentificado",percentualFaceIdentificado)

        let percentualMeterCalculado = Math.min(100.00 ,  percentualFaceIdentificado / valPercentualMinimo*100 );  

        
        console.log("percentualMeterCalculado",percentualMeterCalculado)

        percentualMeter.innerHTML=  percentualMeterCalculado.toLocaleString("pt-BR", { maximumFractionDigits: 2, minimumFractionDigits: 2 })  +  ' %'

        meter.value = percentualMeterCalculado ;


       if (percentualMeterCalculado < 100 ){
          context.strokeStyle = 'red';
          context.lineWidth = 2;
          mensagemCapturaFoto.innerHTML='Centralize e aproxime '
          btnFotografar.disabled = true;
       }  else{
          context.strokeStyle = 'green';
          context.lineWidth = 2;
          mensagemCapturaFoto.innerHTML=''
          btnFotografar.disabled = false;
       } 

       
          context.strokeRect(rect.x, rect.y, rect.width, rect.height);
          context.font = '11px Helvetica';
          context.fillStyle = "#fff";
          context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
          context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);

   }


  document.querySelector('#btnFotografarFace')	
		.addEventListener('click',()=>takepicture());

	document.querySelector('#btnReiniciarFotografarFace')	
	.addEventListener('click',()=>resetpicture());

  function takepicture(){

      let video = document.querySelector('#video');
      let canvas = document.querySelector('#canvas');
      let foto = document.querySelector('#foto');      

      video.style.visibility="hidden";

      var context = foto.getContext('2d');
    
      if (canvas.width && canvas.height) {
        foto.width = canvas.width;
        foto.height = canvas.height;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        //this.data = this.canvas.toDataURL("image/jpg");
        //this.photo.setAttribute("src", this.data);

        foto.style.visibility="";
      }




  }

  function resetpicture(){
    let video = document.querySelector('#video');
      let canvas = document.querySelector('#canvas');
      let foto = document.querySelector('#foto');      

      foto.style.visibility="hidden";
      video.style.visibility="";


}

 IdentificarRosto() ;      

/**
 * User: Alberto Perez
 * Date: 13/02/13
 * Time: 10:12
 */


window.onload = function(){
	
	acceptedTypes = {
      'image/png': true,
      'image/jpeg': true,
      'image/gif': true
    };


    //Bytes to KiloBytes conversion
	function convertToKBytes(number) {
		return (number / 1024).toFixed(1);
	}

	function fileSelect(evt) {
	    evt.stopPropagation();
	    evt.preventDefault();
	    if (window.File && window.FileReader && window.FileList && window.Blob) {
	        var files = evt.dataTransfer.files;
	 
	        var result = '';
	        var file;
	        for (var i = 0; file = files[i]; i++) {
	            result += '<li>' + file.name + ' ' + convertToKBytes(file.size) + ' KB</li>';

		        if (acceptedTypes[file.type] === true) {
		            var reader = new FileReader();
		            reader.onload = function (event){
		            	var image = new Image();
		            	image.src = event.target.result;
	     				//image.width = 250;
	     				console.log ("Fichero leído");

	     				divImage = document.getElementById('imageManipulation');
	     				//divImage.appendChild(image);

	     				//divImage.imgAreaSelect({ x1: 120, y1: 90, x2: 280, y2: 210 });
	     				setTimeout(function(){drawImage(image)},500)
	     				//;
		            }
		            reader.readAsDataURL(file);
	        	}else{
	        		alert('The File Type es not supported. Upload png, jpeg o gif type');
	        	}
	        }
	        document.getElementById('filesInfo').innerHTML = '<ul>' + result + '</ul>';



	    } else {
	        alert('The File APIs are not fully supported in this browser.');
	    }
	}



	 
	function dragOver(evt) {
	    evt.stopPropagation();
	    evt.preventDefault();
	    //dropTarget.addClass('hover');
	    evt.dataTransfer.dropEffect = 'copy';
	}
	 

	function drawImage(imageObj) {
		console.log ("Pintamos la imagen");

        var canvas = document.getElementById('myCanvas');
        var context = canvas.getContext('2d');
        var imageX = canvas.width /2 - imageObj.width/2;
        var imageY = canvas.height / 2 - imageObj.height/2;
        var imageWidth = imageObj.width;
        var imageHeight = imageObj.height;

        context.drawImage(imageObj, imageX, imageY);

        
    }
    

	var dropTarget = document.getElementById('dropTarget');
	dropTarget.addEventListener('dragover', dragOver, false);
	dropTarget.addEventListener('dragleave', function() {
		//dropTarget.removeClass('hover');
		return false;
	});
	dropTarget.addEventListener('drop', fileSelect, false);
    
}
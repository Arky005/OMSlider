class OMSlider {
	
	constructor(width, height){
		if(width<$(window).width())
			this.width=width;
		else
			this.width=$(window).width();
		
		this.height=height;
		this.initialWidth=width;
		this.initialHeight=height;
		this.initialTime=0;
		
		this.imgs=[];
		this.links=[];
		this.currentPos=0;
		this.currentPosValue=0;
		this.slideStyle=0;
		
		this.salt=parseInt(Math.random()*10000);
		this.name_motherContainer='mother_container'+this.salt;
		this.name_slide='slide'+this.salt;
		this.name_imgsContainer='imgs_container'+this.salt;
		this.name_classImgs='imgs_slide'+this.salt;
		this.name_botaoAnterior='botao_anterior'+this.salt;
		this.name_botaoProximo='botao_proximo'+this.salt;
		
		this.stopWhenClicked=true;
		this.showButtons=true;
		this.spaceBetweenImages=0;
		this.openLinksInNewTab=true;
		
		
		this.buttonsBackgroundColor='rgba(0,0,0,0.4);';
		this.buttonsTextColor='rgba(255,255,255,0.8);';
		this.buttonsFontSize=32;
		this.buttonsBorderRadius=15;
		this.buttonsHeight=30;
		this.buttonsWidth=30;
		
		this.borderRadius=0;
		
		
		
	}
	
	setSpaceBetweenImages(valor){
		this.spaceBetweenImages=valor;
	}
	
	setWidth(valor){
		this.width=valor;
	}
	
	setHeight(valor){
		this.height=valor;
	}
	
	addImg(img){
		this.imgs.push(img);
	}
	
	addImg(img, link){
		this.imgs.push(img);
		this.links.push(link);
	}
	
	removeImg(pos){
		this.imgs.splice(pos);
	}
	
	setImgs(imgs){
		this.imgs=imgs;
	}
	
	getSize(){
		return this.imgs.length;
	}
	
	startTimer(time){
		var obj=this;
		if(time!=0){
			this.initialTime=time;
			clearInterval(this.timer);
			this.timer = setInterval(function(){
				obj.nextImg();
			}, time);
		}
	}
	
	stopTimer(){
		clearInterval(this.timer);
	}

	nextImg(){
		if(this.currentPos<this.getSize()-1){
			$('#'+this.name_slide).animate({scrollLeft:((this.currentPos+1)*this.width)+
				(this.spaceBetweenImages*(this.currentPos+1))}, 1000);
			this.currentPos++;
		} else {
			$('#'+this.name_slide).animate({scrollLeft:0}, 1000);
			this.currentPos=0;
		}
	}
	
	lastImg(){
		if(this.currentPos>0){
			$('#'+this.name_slide).animate({scrollLeft:((this.currentPos-1)*this.width)+(
				this.spaceBetweenImages*(this.currentPos-1))}, 1000);
			this.currentPos--;
			
		} else {
			$('#'+this.name_slide).animate({scrollLeft:((this.getSize()-1)*this.width)+(
				this.spaceBetweenImages*(this.getSize()-1))}, 1000);
			this.currentPos=this.getSize()-1;
		}
	}
	
	setOpenLinksInNewTab(valor){
		this.openLinksInNewTab=valor;
	}
	
	setStopWhenClicked(stop){
		this.stopWhenClicked=stop;
	}
	
	setButtonsBackgroundColor(color){
		this.buttonsBackgroundColor=color;
	}
	
	setButtonsTextColor(color){
		this.buttonsTextColor=color;
	}
	
	setButtonsFontSize(size){
		this.buttonsFontSize=size;
	}
	
	setButtonsWidth(width){
		this.buttonsWidth=width;
	}
	
	setButtonsHeight(height){
		this.buttonsHeight=height;
	}
	
	setButtonsBorderRadius(value){
		this.buttonsBorderRadius=value;
	}
	
	setBorderRadius(value){
		this.borderRadius=value;
	}
	
	update(){

		this.slideStyle.innerHTML = 
			"#"+ this.name_motherContainer+"{"+
				"display:flex;"+
				"height:"+this.height+"px;"+
				"overflow:hidden;"
			+"} "+
			
			"#"+ this.name_slide+"{"+
				"display:flex;"+
				"height:"+(this.height+20)+"px;"+
				"width:"+(this.width)+"px;"+
				"align-items:center;"+
				"overflow-x:scroll;"+
				"overflow-y:hidden;"
			+"} "+
			
			"#"+ this.name_botaoAnterior+"{"+
				(this.showButtons ? "display:flex;" : "display:none;")+
				"justify-content:center;"+
				"align-items:center;"+
				"z-index:999;"+
				"position:absolute;"+
				"font-size:"+this.buttonsFontSize+"pt;"+
				"height:"+this.buttonsHeight+"px;"+
				"width:"+this.buttonsWidth+"px;"+
				"margin-left:10px;"+
				"padding:10px;"+
				"text-decoration:none;"+
				"background-color:"+this.buttonsBackgroundColor+";"+
				"color:"+this.buttonsTextColor+";"+
				"border-radius:"+this.buttonsBorderRadius+"px;"
			+"} "+
			
			"#"+ this.name_botaoProximo+"{"+
				(this.showButtons ? "display:flex;" : "display:none;")+
				"justify-content:center;"+
				"align-items:center;"+
				"z-index:999;"+
				"position:absolute;"+
				"font-size:"+this.buttonsFontSize+"pt;"+
				"height:"+this.buttonsHeight+"px;"+
				"width:"+this.buttonsWidth+"px;"+
				"margin-left:"+(this.width-(this.buttonsWidth+30))+"px;"+
				"padding:10px;"+
				"text-decoration:none;"+
				"background-color:"+this.buttonsBackgroundColor+";"+
				"color:"+this.buttonsTextColor+";"+
				"border-radius:"+this.buttonsBorderRadius+"px;"
			+"} "+
			
			"#"+ this.name_imgsContainer+"{"+
				"display:flex;"+
				"flex-shrink:0;"+
				"height:100%;"+
				"transition:all 1s;"
			+"} "+
			
			"."+ this.name_classImgs+"{"+
				"height:"+this.height+"px;"+
				"width:"+this.width+"px;"+
				"border-radius:"+this.borderRadius+"px;"+
				"margin-right:"+this.spaceBetweenImages+"px;"
			+"} ";
		
		
		document.getElementsByTagName('head')[0].appendChild(this.slideStyle);
	
	}
	
	create(itemId){
		
		$(itemId).append("<div id='"+ this.name_motherContainer +"'></div>");
		$('#'+this.name_motherContainer).append("<div id='"+ this.name_slide + "'>" +
				"<a href='#' id='"+this.name_botaoAnterior+"'><</a>"+
				"<a href='#' id='"+this.name_botaoProximo+"'>></a></div>");
		$('#'+this.name_slide).append("<div id='"+ this.name_imgsContainer+"'></div>");
		var i=0;
		for(i=0; i<this.getSize(); i++){
			if(typeof this.links[i] != 'undefined')
				$('#'+this.name_imgsContainer).append(
				"<a href='"+this.links[i]+( this.openLinksInNewTab ? "' target='_blank'" : "" )+"'><img src='"+this.imgs[i]+"' class='"+ this.name_classImgs +"'></a>");
			else
				$('#'+this.name_imgsContainer).append(
				"<img src='"+this.imgs[i]+"' class='"+ this.name_classImgs +"'>");
		}
		
		this.slideStyle = document.createElement('style');
		this.slideStyle.type = 'text/css';
		this.update();
		
		var obj=this;
		$('#'+this.name_botaoAnterior).click(function(){
			obj.lastImg();
			
			if(!obj.stopWhenClicked)
				obj.startTimer(obj.initialTime);
			else
				obj.stopTimer();
		});
		
		$('#'+this.name_botaoProximo).click(function(){
			obj.nextImg();
			
			if(!obj.stopWhenClicked)
				obj.startTimer(obj.initialTime);
			else 
				obj.stopTimer();
		});
		
		$( window ).resize(function() {
			if(obj.width>=$(window).width())
				obj.width=$(window).width();
			else if(obj.initialWidth>=$(window).width())
					obj.width=$(window).width();
			obj.currentPos=0;
			$('#'+obj.name_slide).scrollLeft(0);
			obj.update();
		});
		
		$('#'+this.name_slide).scroll(function(){
			clearTimeout($.data(this, 'scrollTimer'));
			$.data(this, 'scrollTimer', setTimeout(function() {
				obj.currentPosValue=(obj.currentPos*obj.width);
				if((obj.currentPosValue+30)+this.spaceBetweenImages < $('#'+obj.name_slide).scrollLeft()){
					obj.nextImg();
					obj.stopTimer();
				}else if((obj.currentPosValue-30)+this.spaceBetweenImages > $('#'+obj.name_slide).scrollLeft()){
					obj.lastImg();
					obj.stopTimer();
				}
			}, 150));
		});
		
	}
	
}

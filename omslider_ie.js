/*Thanks to Babel for this*/
"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var OMSlide =
/*#__PURE__*/
function () {
  function OMSlide(width, height) {
    _classCallCheck(this, OMSlide);

    if (width < $(window).width() - 20) this.width = width;else this.width = $(window).width() - 20;
    this.height = height;
    this.initialWidth = width;
    this.initialHeight = height;
    this.initialTime = 0;
    this.imgs = [];
    this.currentPos = 0;
    this.currentPosValue = 0;
    this.slideStyle = 0;
    this.salt = parseInt(Math.random() * 10000);
    this.name_motherContainer = 'mother_container' + this.salt;
    this.name_slide = 'slide' + this.salt;
    this.name_imgsContainer = 'imgs_container' + this.salt;
    this.name_classImgs = 'imgs_slide' + this.salt;
    this.name_botaoAnterior = 'botao_anterior' + this.salt;
    this.name_botaoProximo = 'botao_proximo' + this.salt;
    this.stopWhenClicked = true;
  }

  _createClass(OMSlide, [{
    key: "setWidth",
    value: function setWidth(valor) {
      this.width = valor;
    }
  }, {
    key: "setHeight",
    value: function setHeight(valor) {
      this.height = valor;
    }
  }, {
    key: "addImg",
    value: function addImg(img) {
      this.imgs.push(img);
    }
  }, {
    key: "removeImg",
    value: function removeImg(pos) {
      this.imgs.splice(pos);
    }
  }, {
    key: "setImgs",
    value: function setImgs(imgs) {
      this.imgs = imgs;
    }
  }, {
    key: "getSize",
    value: function getSize() {
      return this.imgs.length;
    }
  }, {
    key: "startTimer",
    value: function startTimer(time) {
      var obj = this;

      if (time != 0) {
        this.initialTime = time;
        clearInterval(this.timer);
        this.timer = setInterval(function () {
          obj.nextImg();
        }, time);
      }
    }
  }, {
    key: "stopTimer",
    value: function stopTimer() {
      clearInterval(this.timer);
    }
  }, {
    key: "nextImg",
    value: function nextImg() {
      if (this.currentPos < this.getSize() - 1) {
        $('#' + this.name_slide).animate({
          scrollLeft: (this.currentPos + 1) * this.width
        }, 1000);
        this.currentPos++;
      } else {
        $('#' + this.name_slide).animate({
          scrollLeft: 0
        }, 1000);
        this.currentPos = 0;
      }
    }
  }, {
    key: "lastImg",
    value: function lastImg() {
      if (this.currentPos > 0) {
        $('#' + this.name_slide).animate({
          scrollLeft: (this.currentPos - 1) * this.width
        }, 1000);
        this.currentPos--;
      } else {
        $('#' + this.name_slide).animate({
          scrollLeft: (this.getSize() - 1) * this.width
        }, 1000);
        this.currentPos = this.getSize() - 1;
      }
    }
  }, {
    key: "update",
    value: function update() {
      this.slideStyle.innerHTML = "#" + this.name_motherContainer + "{" + "display:flex;" + "height:" + this.height + "px;" + "overflow:hidden;" + "} " + "#" + this.name_slide + "{" + "display:flex;" + "height:" + (this.height + 20) + "px;" + "width:" + this.width + "px;" + "align-items:center;" + "overflow-x:scroll;" + "overflow-y:hidden;" + "} " + "#" + this.name_botaoAnterior + "{" + "z-index:999;" + "position:absolute;" + "font-size:40pt;" + "margin-left:10px;" + "padding:10px;" + "text-decoration:none;" + "background-color:white;" + "color:black;" + "border-radius:50px;" + "} " + "#" + this.name_botaoProximo + "{" + "z-index:999;" + "position:absolute;" + "font-size:40pt;" + "margin-left:" + (this.width - 60) + "px;" + "padding:10px;" + "text-decoration:none;" + "background-color:white;" + "color:black;" + "border-radius:50px;" + "} " + "#" + this.name_imgsContainer + "{" + "display:flex;" + "flex-shrink:0;" + "height:100%;" + "transition:all 1s;" + "} " + "." + this.name_classImgs + "{" + "height:" + this.height + "px;" + "width:" + this.width + "px;" + "border-radius:0px;" + "} ";
      document.getElementsByTagName('head')[0].appendChild(this.slideStyle);
    }
  }, {
    key: "create",
    value: function create(itemId) {
      $(itemId).append("<div id='" + this.name_motherContainer + "'></div>");
      $('#' + this.name_motherContainer).append("<div id='" + this.name_slide + "'>" + "<a href='#' id='" + this.name_botaoAnterior + "'><</a>" + "<a href='#' id='" + this.name_botaoProximo + "'>></a></div>");
      $('#' + this.name_slide).append("<div id='" + this.name_imgsContainer + "'></div>");
      var i = 0;

      for (i = 0; i < this.getSize(); i++) {
        $('#' + this.name_imgsContainer).append("<img src='" + this.imgs[i] + "' class='" + this.name_classImgs + "'>");
      }

      this.slideStyle = document.createElement('style');
      this.slideStyle.type = 'text/css';
      this.update();
      var obj = this;
      $('#' + this.name_botaoAnterior).click(function () {
        obj.lastImg();
        if (!obj.stopWhenClicked) obj.startTimer(obj.initialTime);else obj.stopTimer();
      });
      $('#' + this.name_botaoProximo).click(function () {
        obj.nextImg();
        if (!obj.stopWhenClicked) obj.startTimer(obj.initialTime);else obj.stopTimer();
      });
      $(window).resize(function () {
        if (obj.width > $(window).width() - 20) obj.width = $(window).width() - 20;else obj.width = obj.initialWidth;
        obj.currentPos = 0;
        $('#' + obj.name_slide).scrollLeft(0);
        obj.update();
      });
      $('#' + this.name_slide).scroll(function () {
        clearTimeout($.data(this, 'scrollTimer'));
        $.data(this, 'scrollTimer', setTimeout(function () {
          obj.currentPosValue = obj.currentPos * obj.width;

          if (obj.currentPosValue < $('#' + obj.name_slide).scrollLeft()) {
            obj.nextImg();
            obj.stopTimer();
          } else if (obj.currentPosValue > $('#' + obj.name_slide).scrollLeft()) {
            obj.lastImg();
            obj.stopTimer();
          }
        }, 150));
      });
    }
  }]);

  return OMSlide;
}();
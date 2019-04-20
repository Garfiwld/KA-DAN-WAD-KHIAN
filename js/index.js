(function ($) {
  var color1 = "#fe4884";
  var color2 = "#4913a6";
  var color3 = "#092f66";
  var color4 = "#02aee1";
  var color5 = "#17412d";
  var color6 = "#59ab06";
  var color7 = "#fee70d";
  var color8 = "#ffc86c";
  var color9 = "#f94f0a";
  var color10 = "#f81208";
  var color11 = "#642921";
  var color12 = "#2b1d18";
  var curColor = color1;
  var canvas = $('paint');
  var ctx = canvas.getContext('2d');

  var history = {
    redo_list: [],
    undo_list: [],
    saveState: function (canvas, list, keep_redo) {
      keep_redo = keep_redo || false;
      if (!keep_redo) {
        this.redo_list = [];
      }

      (list || this.undo_list).push(canvas.toDataURL());
    },
    undo: function (canvas, ctx) {
      this.restoreState(canvas, ctx, this.undo_list, this.redo_list);
    },
    redo: function (canvas, ctx) {
      this.restoreState(canvas, ctx, this.redo_list, this.undo_list);
    },
    restoreState: function (canvas, ctx, pop, push) {
      if (pop.length) {
        this.saveState(canvas, push, true);
        var restore_state = pop.pop();
        var img = new Element('img', { 'src': restore_state });
        img.onload = function () {
          ctx.clearRect(0, 0, 600, 400);
          ctx.drawImage(img, 0, 0, 600, 400, 0, 0, 600, 400);
        }
      }
    }
  }

  var pencil = {
    init: function (canvas, ctx) {
      this.canvas = canvas;
      this.canvas_coords = this.canvas.getCoordinates();
      this.ctx = ctx;
      this.ctx.strokeStyle = curColor;
      this.drawing = false;
      this.addCanvasEvents();
    },
    addCanvasEvents: function () {
      this.canvas.addEvent('mousedown', this.start.bind(this));
      this.canvas.addEvent('mousemove', this.stroke.bind(this));
      this.canvas.addEvent('mouseup', this.stop.bind(this));
      this.canvas.addEvent('mouseout', this.stop.bind(this));
    },
    start: function (evt) {
      var x = evt.page.x - this.canvas_coords.left;
      var y = evt.page.y - this.canvas_coords.top;
      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
      this.canvas.addEventListener("mouseover", history.saveState(this.canvas));
      // history.saveState(this.canvas);
      this.drawing = true;
    },
    stroke: function (evt) {
      if (this.drawing) {
        var x = evt.page.x - this.canvas_coords.left;
        var y = evt.page.y - this.canvas_coords.top;
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
      }
    },
    stop: function (evt) {
      if (this.drawing) this.drawing = false;
    }
  };

  $('pencil1').addEvent('click', function () {
    curColor = color1;
    pencil.init(canvas, ctx);
    document.getElementById("textShow").innerHTML = "ดินสอสีชมพู";
  });
  $('pencil2').addEvent('click', function () {
    curColor = color2;
    pencil.init(canvas, ctx);
    document.getElementById("textShow").innerHTML = "ดินสอสีม่วง";
  });
  $('pencil3').addEvent('click', function () {
    curColor = color3;
    pencil.init(canvas, ctx);
    document.getElementById("textShow").innerHTML = "ดินสอน้ำเงิน";
  });
  $('pencil4').addEvent('click', function () {
    curColor = color4;
    pencil.init(canvas, ctx);
    document.getElementById("textShow").innerHTML = "ดินสอสีฟ้า";
  });
  $('pencil5').addEvent('click', function () {
    curColor = color5;
    pencil.init(canvas, ctx);
    document.getElementById("textShow").innerHTML = "ดินสอสีเขียว";
  });
  $('pencil6').addEvent('click', function () {
    curColor = color6;
    pencil.init(canvas, ctx);
    document.getElementById("textShow").innerHTML = "ดินสอสีเขียวอ่อน";
  });
  $('pencil7').addEvent('click', function () {
    curColor = color7;
    pencil.init(canvas, ctx);
    document.getElementById("textShow").innerHTML = "ดินสอสีเหลือง";
  });
  $('pencil8').addEvent('click', function () {
    curColor = color8;
    pencil.init(canvas, ctx);
    document.getElementById("textShow").innerHTML = "ดินสอสีเปลือกไข่";
  });
  $('pencil9').addEvent('click', function () {
    curColor = color9;
    pencil.init(canvas, ctx);
    document.getElementById("textShow").innerHTML = "ดินสอสีส้ม";
  });
  $('pencil10').addEvent('click', function () {
    curColor = color10;
    pencil.init(canvas, ctx);
    document.getElementById("textShow").innerHTML = "ดินสอสีแดง";
  });
  $('pencil11').addEvent('click', function () {
    curColor = color11;
    pencil.init(canvas, ctx);
    document.getElementById("textShow").innerHTML = "ดินสอสีน้ำตาล";
  });
  $('pencil12').addEvent('click', function () {
    curColor = color12;
    pencil.init(canvas, ctx);
    document.getElementById("textShow").innerHTML = "ดินสอสีดำ";
  });

  $('undo').addEvent('click', function () {
    document.getElementById("textShow").innerHTML = "ย้อนกลับ";
    history.undo(canvas, ctx);
  });

  $('redo').addEvent('click', function () {
    document.getElementById("textShow").innerHTML = "ก่อนหน้า";
    history.redo(canvas, ctx);
  });

})(document.id)
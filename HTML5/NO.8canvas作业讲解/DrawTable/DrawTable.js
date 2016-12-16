/**
 * Created by liuyujing on 2016/12/16.
 */
(function () {

    //{row:10,data:[1,44,56.87]}
    function DrawTable(canvas,listInfo) {
        this.canvas = canvas;
        this.canvasContext = canvas.getContext("2d");
        this.lineWidth = 2;
        this.width = this.canvas.width-this.lineWidth;
        this.height = this.canvas.height-this.lineWidth;

        this.row = listInfo.row;

        this.itemHeights = listInfo.data;
        this.column = this.itemHeights.length;
        this.itemWidth = 20;
        this.itemSpace = (this.width-this.itemWidth*this.column)/this.column;
        this.lineHeight = this.height/this.row;

        this.drawTable();
    }

    DrawTable.prototype.addLine = function (begin,end) {
        this.canvasContext.beginPath();
        this.canvasContext.lineWidth = this.lineWidth;
        this.canvasContext.moveTo(begin.x+1,begin.y+1);
        this.canvasContext.lineTo(end.x+1,end.y+1);
        this.canvasContext.stroke();
    };

    DrawTable.prototype.addRect = function (x,height) {
        this.canvasContext.beginPath();

        var color = this.canvasContext.createLinearGradient(0,0,0,this.height);
        color.addColorStop(0,"red");
        color.addColorStop(0.5,"#FFB100");
        color.addColorStop(1,"#28FF84");
        this.canvasContext.fillStyle = color;

        this.canvasContext.fillRect(x,this.height-height,this.itemWidth,height);
    };

    DrawTable.prototype.drawTable = function () {
        this.addLine({x:0,y:0},{x:0,y:this.height});
        this.addLine({x:this.width,y:0},{x:this.width,y:this.height});

        for (var i=0;i<=this.row;i++){
            var begin = {x:0,y:this.lineHeight*i};
            var end = {x:this.width,y:this.lineHeight*i};

            this.addLine(begin,end);
        }

        for (var j=0;j<this.column;j++){
            // var height = this.itemHeights[j]/(this.row*(this.height/this.row));
            this.addRect(this.itemSpace/2+(this.itemWidth+this.itemSpace)*j,this.itemHeights[j]);
        }
    };

    window.DrawTable = DrawTable;

})();

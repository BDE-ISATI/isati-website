export type configuration = {
    backgroundURL: string,
    height:number,
    width:number,
    canvas:HTMLCanvasElement
}

export type FormattingFunction = (input: string) => {
    fontSize: number;
    fontWeight: number;
    color: string;
    specialColor: string;
    fontFamily: string;
    textAlign: string;
    letterSpacing: number;
    output: string;
}

export class Template {
    private configuration : configuration
    private background : Promise<HTMLImageElement>
    private ctx:CanvasRenderingContext2D

    constructor( configuration : configuration) {
        this.configuration = configuration

        this.ctx = this.configuration.canvas.getContext('2d')!;
        this.configuration.canvas.height = this.configuration.height
        this.configuration.canvas.width = this.configuration.width

        this.background = this.loadImageUrl( configuration.backgroundURL )
    }

    public rotatedAction(angle:number, callback: Function) {
        this.ctx.rotate((angle * Math.PI) / 180);
        callback()
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    public async filteredAction(filter:string, callback: Function) {
        this.ctx.filter = filter;
        await callback()
        this.ctx.filter = "none";
    }

    public loadImageUrl(url:string) : Promise<HTMLImageElement>{
        let background = new Image()
        background.width = this.configuration.width
        background.height = this.configuration.height
        background.src = url;

        return new Promise((resolve,reject) =>{
            background.onload = () => {
                resolve(background)
            }
        })
    }

    public loadImageFile(file:File) : Promise<HTMLImageElement>{
        var fr = new FileReader();
        let image = new Image()

        fr.onload = function () {
            image.src = fr.result as string
        }

        fr.readAsDataURL(file);
        return new Promise((resolve,reject) =>{
            image.onload = function (){
                resolve(image)
            }
        })
    }

    public drawResizeCropImage(image:HTMLImageElement,x:number,y:number,width:number,height:number){

        let canvas = document.createElement("canvas")
        let ctx = canvas.getContext("2d")

        canvas.width = width
        canvas.height = height

        let r1 = image.width/image.height
        let r2 = width/height

        let nw  = r1 < r2 ? width  : r1 * height
        let nh = r1 < r2 ? width / r1 : height

        let offx = Math.abs(nw - width)/2
        let offy = Math.abs(nh - height)/2

        ctx?.drawImage(image,-offx, -offy, nw, nh)

        this.ctx.drawImage(canvas,x,y,width,height)
    }

    public clear(){
        this.ctx.clearRect(0,0,this.configuration.width, this.configuration.height)
    }

    public drawTexte(texte:string,x:number,y:number,fontFamily:string,fontSize:number,fontWeight:string,color:string,letterSpacing:number,textAlign:string="left"){
        this.ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`
        this.ctx.textAlign = textAlign as CanvasTextAlign;
        this.ctx.fillStyle = color
        this.ctx.letterSpacing = `${letterSpacing}px`

        this.ctx.fillText(texte, x, y);
    }

    public wordSize(word:string,letterSpacing:number){
        let s = 0
        for (let l of word){
            if (l=="$") continue
            s += this.ctx.measureText(l).width
        }
        return s+letterSpacing*(word.length-1)
    }

    public drawFormattedTexte(texte:string,xmin:number,xmax:number,y:number,formatting:FormattingFunction) {

        let xOffset = 0
        let yOffset = 0

        let specialColored = false
        let fmt = formatting(texte)

        for (let word of texte.split(" ")){

            
            let spaceSize = this.wordSize(" ",0)

            this.ctx.font = `${fmt.fontWeight} ${fmt.fontSize}px ${fmt.fontFamily}`
            this.ctx.textAlign = fmt.textAlign as CanvasTextAlign;
            
            let nl = xOffset + fmt.letterSpacing + spaceSize + fmt.letterSpacing
            let wordSize = this.wordSize(word,fmt.letterSpacing)
            
            if (xOffset == 0) {
                xOffset = 0
            }
            else if ( nl + wordSize > xmax-xmin){
                yOffset += fmt.fontSize
                xOffset = 0
            }
            else {
                xOffset += spaceSize + fmt.letterSpacing
            }
            
            for (let i = 0; i < word.length; i++) {                
                if ( word[i] == "$" ) {
                    specialColored = !specialColored
                    continue
                }
                
                this.ctx.fillStyle = specialColored ? fmt.specialColor : fmt.color

                if (word[i] == "\n") {
                    xOffset = 0
                    yOffset += fmt.fontSize
                }
                else {
                    this.ctx.fillText(word[i], xmin+xOffset, y+yOffset)
                    xOffset+=this.wordSize(word[i],fmt.letterSpacing)+fmt.letterSpacing
                }
            }
        }
        return y + yOffset + fmt.fontSize
    }

    public drawImage(image:HTMLImageElement,x:number,y:number,width:number,height:number){
        this.ctx.drawImage(image, x, y, width, height);
    }

    public async drawBackground(){
        let bg = await this.background
        this.ctx.drawImage(bg, 0, 0, this.configuration.width, this.configuration.height);
    }

    public download(){
        var link = document.createElement('a');
        link.download = 'mail.png';
        link.href = this.configuration.canvas.toDataURL()
        link.click();
        
    }
}
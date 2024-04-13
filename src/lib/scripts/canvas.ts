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
    fontFamily: string;
    textAlign: string;
    output: string;
}

export class Template2 {
    private configuration : configuration
    private background : Promise<HTMLImageElement>
    private ctx:CanvasRenderingContext2D

    constructor( configuration : configuration) {
        this.configuration = configuration

        this.ctx = this.configuration.canvas.getContext('2d')!;
        this.configuration.canvas.height = this.configuration.height
        this.configuration.canvas.width = this.configuration.width

        let background = new Image()
        background.width = this.configuration.width
        background.height = this.configuration.height
        background.src = configuration.backgroundURL;

        this.background = new Promise((resolve,reject) =>{
            background.onload = () => {
                resolve(background)
            }
        })
    }

    public clear(){
        this.ctx.clearRect(0,0,this.configuration.width, this.configuration.height)
    }

    public drawTexte(texte:string,x:number,y:number,fontFamily:string,fontSize:number,fontWeight:string,color:string,textAlign:string="left"){
        this.ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`
        this.ctx.textAlign = textAlign as CanvasTextAlign;
        this.ctx.fillStyle = color

        this.ctx.fillText(texte, x, y);
    }

    public drawFormattedTexte(texte:string,xmin:number,xmax:number,y:number,formatting:FormattingFunction) {
        for (let line of texte.split("\n")){

            let fmt = formatting(line)

            this.ctx.font = `${fmt.fontWeight} ${fmt.fontSize}px ${fmt.fontFamily}`
            this.ctx.textAlign = fmt.textAlign as CanvasTextAlign;
            this.ctx.fillStyle = fmt.color

            let l_liste = fmt.output.split(" ")
            let text = l_liste[0]
            let i = 1


            while (text != undefined) {
                if (i == l_liste.length){
                    this.ctx.fillText(text, xmin, y);
                    y += fmt.fontSize
                    break
                }

                let w = l_liste[i]
                if (this.ctx.measureText(text + " " + w).width > xmax-xmin){
                    this.ctx.fillText(text, xmin, y);
                    y += fmt.fontSize
                    text = w
                }
                else {
                    text += " " + w
                }
                i++
            }
        }
        return y
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

//add onto this as you need
//Use function(){} for constructors
//Use ()=>({...}) to have a propety that is a function that returns an object


const phaserMock = {
    GameObjects: {
        Image: function(){
            this.setScale=()=>{};
            //this.setOrigin=()=>{};
            this.setX=()=>{};
            this.setY=()=>{};
            //this.setDataEnabled=()=>{}
            this.setInteractive=()=>{}
        },
        GameObject: function(){
            this.setDataEnabled=()=>{}
            this.setInteractive=()=>{}
        }
    
    },

    


    Scene: function(){
        this.sys = {
            displayList:{add:()=>{}}
        };

        
    }
}

export default phaserMock;
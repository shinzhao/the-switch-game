
//add onto this as you need
//Use function(){} for constructors
//Use ()=>({...}) to have a propety that is a function that returns an object


const phaserMock = {
    GameObjects: {
        Image: function(){
            
            this.setTexture = () => ({
                setScale: () => ({
                    setSize: jest.fn()
                })
            });
        
            this.setActive = () =>{};
            this.setInteractive=()=>{};
            this.setX=()=>{};
            this.setY=()=>{};
            this.setDataEnabled=()=>{}
        

        }
    },



    Scene: function(){
        this.sys = {
            displayList:{add:()=>{}}
        };

        
    }
}

export default phaserMock;
class Load {
    static imagesToLoad(number) {
        if(!Load.numberOfImages) {
            Load.numberOfImages = 0;
        }
        Load.numberOfImages += number;
        if(Load.isLoaded()){
            //Load.hide();
        }
    }
        
    static imageLoaded() {
        if(!Load.numberOfImages) {
            Load.numberOfImages = 0;
        }
        Load.numberOfImages--;
        if(Load.isLoaded()){
            //Load.hide();
        }
    }

    static isLoaded() {
        return Load.numberOfImages === 0;
    }

    static hide() {

    }
    
    static show() {

    }
}

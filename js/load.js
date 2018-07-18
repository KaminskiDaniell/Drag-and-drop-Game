class Load {
    static imagesToLoad(number) {
        Load.numberOfImages += number;
    }
        
    static imageLoaded() {
        if(!Load.numberOfImages) {
            Load.numberOfImages = 0;
        }
        Load.numberOfImages--;
    }

    static isLoaded() {

    }
}

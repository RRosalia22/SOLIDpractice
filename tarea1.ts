class Book{
    constructor(public title: string, public author: string, public isLoaded: boolean = false, public isAvailable: string) {}
}
class User{
    constructor(public userID: string, public name: string) {}
}
interface ILoadManager{
    loadBook(book:Book, user: User);
    returnBook(book:Book, user: User):void;
}

interface Ilogger{
    log(message:string):void;
}

//
interface Infologger{
    log(message:string):void;
}
interface Warninglogger{
    log(message:string):void;
}
interface Errorlogger{
    log(message:string):void;
}


class ConsoleLogger implements Ilogger, Infologger, Warninglogger,Errorlogger {
    log(message:string):void{
        console.log(message);
    }
}

// un loger escribe 
//inyectando una dependendcia a nuestra clase 
// crear interfaces para logs de error warning e info
// crear un metodo con una logica si un libro tiene un titulo correcto
//si no lo tiene mostrar menseja ed eerror
// si no lo tiene mostrar un mensaje de error en log y si tiene el mismo nombre 
// mostrar un mensaje de info
// modificar el metodo find para que retorne un warning cuando no encuentres el libro

class Library implements ILoadManager, Infologger,Warninglogger,Errorlogger{
    
    private books: Book[]=[];
    private loadBooks: Map<string,User>=new Map();
    constructor(private logger: Ilogger, private loggerE: Errorlogger, private loggerI: Infologger, private loggerW: Warninglogger) {}
    log(message: string): void {
        throw new Error("Method not implemented.");
    }
    
    loadBook(book: Book, user: User) {
        if(book.isLoaded){
            this.logger.log('Book is loaded');
            return
        }
        this.loadBooks.set(book.isAvailable,user);
        book.isLoaded=true;
        this.loggerI.log(`${user.name} (id: ${user.userID} ) has borrowed ${book.title}.`);
        
    }
    returnBook(book: Book, user: User):void {
        if(!book.isLoaded){
            this.logger.log('Book is not loaded');
            return
        }
        this.loadBooks.delete(book.isAvailable);
        book.isLoaded=false;
        this.loggerI.log(`${book.title} has been returned for ${user.name} (id: ${user.userID} )`);
    }
    // mostrar en un log de inf0 toda la informacion dek usuario que se esata prestando un libro
    // mostrar en un log info toda la info del usuario que esta devolviendo el libro
    // debe mostrar el objeto completp 

    addBook(book:Book){
        this.logger.log('inicio de operación');
        this.books.push(book);
        this.logger.log('fin de operación');
    }

    findBookByTitle(title: string) : Book | undefined{
        const foundBook = this.books.find(book => book.title === title);
        if(!foundBook){
            this.loggerW.log("Warning: Book not found")
        }
        return foundBook;
    }

    CheckTitle(title: string) : Book | undefined {
        const foundBook = this.books.find(book => book.title === title);
        if(!foundBook){
            this.loggerE.log('Error: El titulo del libro no es igual a la entrada')
        }
        else{
            this.loggerI.log('Libro tiene el mismo titulo')
        }
        return foundBook;
    }
}
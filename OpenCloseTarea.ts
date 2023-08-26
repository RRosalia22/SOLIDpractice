class Libro3 {
    titulo:string;
    autor: string;
    contenido: string;
    tipo: string;

    constructor(titulo: string, autor: string,contenido:string,tipo:string) {
        this.titulo = titulo;
        this.autor=autor;
        this.contenido=contenido;
        this.tipo=tipo;

    }

    mostrarDescripcion(){
        if(this.tipo === 'texto'){ 
            return `Libro de texto titulado "${this.titulo}" escrito por ${this.autor}`;
        }
    }
}

//solucion
class Libro {
    titulo: string;
    autor: string;

    constructor(titulo: string, autor: string) {
        this.titulo = titulo;
        this.autor = autor;
    }

    mostrarDescripcion(): string {
        return `Libro titulado "${this.titulo}" escrito por ${this.autor}`;
    }
}

class LibroTexto extends Libro {
    // Constructor y propiedades específicas para libros de texto

    mostrarDescripcion(): string {
        return `Libro de texto titulado "${this.titulo}" escrito por ${this.autor}`;
    }
}

class LibroNovela extends Libro {
    // Constructor y propiedades específicas para novelas

    mostrarDescripcion(): string {
        return `Novela titulada "${this.titulo}" escrita por ${this.autor}`;
    }
}

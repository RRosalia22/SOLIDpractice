class Libro1{
    titulo: string;
    autor: string;
    contenido: string;

    constructor(titulo: string, autor: string, contenido: string){
        this.titulo = titulo;
        this.autor = autor;
        this.contenido = contenido;
    }

    mostrarContenido(){
        return this.contenido;
    }

    guardarEnBaseDeDatos(){
        // Codigo para guardar el libro en la base de datos
        console.log('Guardando el libro ${this.titulo} en la base de datos...');
    }


}
    
const libro1 = new Libro1('El Principito', 'Antoine de Saint-Exupéry', 'Érase una vez...');
libro1.guardarEnBaseDeDatos();
//solucionclass
class Libro2 {
    titulo: string;
    autor: string;
    contenido: string;

    constructor(titulo: string, autor: string, contenido: string){
        this.titulo = titulo;
        this.autor = autor;
        this.contenido = contenido;
    }

    mostrarContenido(){
        return this.contenido;
    }
}

const libro2 = new Libro2('El Principito', 'Antoine de Saint-Exupéry', 'Érase una vez...');
class BaseDeDatos {
    guardarLibro(libro: Libro2) {
        // Código para guardar el libro en la base de datos
        console.log(`Guardando el libro ${libro.titulo} en la base de datos...`);
    }
}

const baseDeDatos = new BaseDeDatos();
baseDeDatos.guardarLibro(libro2);

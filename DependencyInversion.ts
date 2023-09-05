abstract class Operador {
    abstract encender(): void;
    abstract apagar(): void;

}

class Luz extends Operador {
    encender() {
        console.log("Luz encendida");
    }

    apagar() {
        console.log("Luz apagada");
    }
}

class Interruptor {

    constructor(private Operador: Operador) { }

    operar() {
        this.Operador.encender();
    }

}
//////////////////////



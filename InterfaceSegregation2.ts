
interface Animal {
  hacerSonido(): void;
}

interface AnimalTerrestre extends Animal {
  caminar(): void;
}

interface AnimalAcuatico extends Animal {
  nadar(): void;
}

interface AnimalAereo extends Animal {
  volar(): void;
}

class Aguila implements Animal, AnimalAereo, AnimalTerrestre {
  caminar(): void {
    console.log('El aguila camina lentamente');
  }

  volar() {
    console.log('El aguila vuela alto en el cielo');
  }

  hacerSonido() {
    console.log('El aguila emite un sonido agudo');
  }
}

class Tiburon implements Animal, AnimalAcuatico {
  nadar() {
      console.log('El tiburon nada rapidamente');
  }

  hacerSonido() {
      console.log('El tiburon no hace sonidos audibles fuera del agua');
  }
}
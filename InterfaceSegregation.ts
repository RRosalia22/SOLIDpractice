interface ReproduceMusica {
  reproducirMusica(): void;
}

interface ReproduceVideo {
  reproducirVideo(): void;
}

interface LeeEbook {
  leerEbook(): void;
}


class Smartphone implements ReproduceMusica, ReproduceVideo, LeeEbook {
  reproducirMusica() {
    console.log("Reproduciendo musica en el smartphone");
  }

  reproducirVideo() {
    console.log("Reproduciendo video en el smartphone");
  }

  leerEbook() {
    console.log("Leyendo ebook en el smartphone")
  }
}


class ReproductorMP3 implements ReproduceMusica {
  reproducirMusica() {
    console.log("Reproduciendo musica en el reproductor MP3");
  }
}


function calcularOrcamentoPorta(params) {
    const { largura, altura, quantidadePortas, material, tipoMotor, dentroDoVao } = params;

    // Cálculo das lâminas
    const rolo = determinarRolo(largura);
    const area = largura * (altura + rolo) * quantidadePortas;

    // Soleira
    const soleira = largura * quantidadePortas;

    // Borracha
    const borracha = largura * quantidadePortas;

    // PVC
    const pvc = (altura * 4) * quantidadePortas;

    // Eixo
    const eixo = determinarEixo(largura);

    // Motor
    const motor = determinarMotor(area);

    // Soleira com reforço
    const soleiraReforco = determinarSoleiraReforco(largura);

    // Guias
    const guias = altura * 2;
    const guiaModelo = determinarGuiaModelo(largura);

    // Guia telescópica
    const guiaTelescopicaModelo = dentroDoVao ? determinarGuiaTelescopicaModelo(largura) : "Metalão";

    // Testeira
    const testeira = determinarTesteira(area);

    // Pintura eletrostática (opcional)
    const pinturaEletrostatica = area;

    // Kit controle (opcional)
    const kitControle = quantidadePortas;

    // Trava lâmina
    const travaLamina = Math.ceil((altura + rolo) / 0.075) * quantidadePortas / 2;

    // Metalão (se fora do vão)
    const metalaoModelo = dentroDoVao ? null : determinarMetalaoModelo(largura, altura);

    return {
        area,
        soleira,
        borracha,
        pvc,
        eixo,
        motor,
        soleiraReforco,
        guias,
        guiaModelo,
        guiaTelescopicaModelo,
        testeira,
        pinturaEletrostatica,
        kitControle,
        travaLamina,
        metalaoModelo,
    };
}

// Funções auxiliares para determinar componentes específicos

function determinarRolo(largura) {
    let rolo;

    if (largura <= 5.5) {
        rolo = 60; // Eixo 114: rolo de 60cm
    } else if (largura <= 7) {
        rolo = 60; // Eixo 141: rolo de 60cm
    } else if (largura <= 8.5) {
        rolo = 75; // Eixo 165: rolo de 75cm
    } else if (largura <= 12.99) {
        rolo = 90; // Eixo 219: rolo de 90cm
    } else {
        throw new Error("Largura acima de 13m: Consultar com especialista técnico.");
    }

    return rolo;
}
function determinarEixo(largura) {
    let eixo;

    if (largura <= 5.5) {
        eixo = "Eixo 114";
    } else if (largura <= 7) {
        eixo = "Eixo 141";
    } else if (largura <= 8.5) {
        eixo = "Eixo 165";
    } else if (largura <= 12.99) {
        eixo = "Eixo 219";
    } else if (largura > 13) {
        throw new Error("Largura acima de 13m: Consultar com especialista técnico.");
    } else {
        eixo = "Valor inválido";
    }

    return eixo;
}

function determinarMotor(area) {
    let motor;

    if (area <= 13) {
        motor = "Motor 200kg";
    } else if (area <= 20) {
        motor = "Motor 300kg";
    } else if (area <= 26) {
        motor = "Motor 400kg";
    } else if (area <= 33) {
        motor = "Motor 500kg";
    } else if (area <= 39) {
        motor = "Motor 600kg";
    } else if (area <= 46) {
        motor = "Motor 700kg";
    } else if (area <= 52) {
        motor = "Motor 800kg";
    } else if (area <= 60) {
        motor = "Motor 1000kg";
    } else if (area <= 65) {
        motor = "Motor 1300kg";
    } else if (area > 65) {
        motor = "Motor 1500kg";
    } else {
        motor = "Valor inválido";
    }

    return motor;
}

function determinarSoleiraReforco(largura) {
    let soleiraReforco;

    if (largura <= 6) {
        soleiraReforco = "Soleira em T";
    } else if (largura <= 9.5) {
        soleiraReforco = "Soleira em T com reforço de tubo 60x40";
    } else if (largura <= 10.5) {
        soleiraReforco = "Soleira em T com reforço de tubo 80x40";
    } else if (largura <= 12.99) {
        soleiraReforco = "Soleira em T com reforço de tubo 100x40";
    } else if (largura > 13) {
        throw new Error("Largura acima de 13m: Consultar com especialista técnico.");
    } else {
        soleiraReforco = "Valor inválido";
    }

    return soleiraReforco;
}

function determinarGuiaModelo(largura) {
    let guiaModelo;

    if (largura <= 4) {
        guiaModelo = "Guia 50x30";
    } else if (largura <= 5.5) {
        guiaModelo = "Guia 60x30";
    } else if (largura <= 7.5) {
        guiaModelo = "Guia 70x30";
    } else if (largura <= 10) {
        guiaModelo = "Guia 90x30";
    } else {
        guiaModelo = "Guia 120x30";
    }

    return guiaModelo;
}

function determinarGuiaTelescopicaModelo(largura) {
    let guiaTelescopicaModelo;

    if (largura <= 7.5) {
        guiaTelescopicaModelo = "Guia Telescópica 65x60";
    } else if (largura <= 10) {
        guiaTelescopicaModelo = "Guia Telescópica 65x90";
    } else {
        guiaTelescopicaModelo = "Guia Telescópica 90x90";
    }

    return guiaTelescopicaModelo;
}

function determinarTesteira(area) {
    let testeira;

    if (area <= 13) {
        testeira = "Modelo TM30";
    } else if (area <= 26) {
        testeira = "Modelo TM36";
    } else if (area <= 39) {
        testeira = "Modelo TM39";
    } else if (area <= 46) {
        testeira = "Modelo TM42";
    } else if (area <= 52) {
        testeira = "Modelo TM48";
    } else if (area <= 65) {
        testeira = "Modelo TM50";
    } else {
        throw new Error("Área acima de 65m²: Consultar com especialista técnico.");
    }

    return testeira;
}

function determinarMetalaoModelo(largura) {
    let metalaoModelo;

    if (largura <= 4) {
        metalaoModelo = "Metalão 40x40";
    } else if (largura <= 7.5) {
        metalaoModelo = "Metalão 60x60";
    } else if (largura <= 10) {
        metalaoModelo = "Metalão 60x80";
    } else {
        metalaoModelo = "Metalão 100x100";
    }

    return metalaoModelo;
}

module.exports = {
    calcularOrcamentoPorta,
    determinarRolo,
    determinarEixo,
    determinarMotor,
    determinarSoleiraReforco,
    determinarGuiaModelo,
    determinarGuiaTelescopicaModelo,
    determinarTesteira,
    determinarMetalaoModelo
};

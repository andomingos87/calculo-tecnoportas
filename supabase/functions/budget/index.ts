async function createBudget(body: object): Promise<object> {
  try {
    const { largura, altura, quantidadePortas, material, tipoMotor, dentroDoVao } = body;

    // Validação dos tipos
    if (typeof largura !== 'number' || largura <= 0) {
      throw new Error("Largura inválida! Deve ser um número positivo.");
    }

    if (typeof altura !== 'number' || altura <= 0) {
      throw new Error("Altura inválida! Deve ser um número positivo.");
    }

    if (typeof quantidadePortas !== 'number' || quantidadePortas <= 0) {
      throw new Error("Quantidade de portas inválida! Deve ser um número positivo.");
    }

    if (typeof material !== 'string' || !material.trim()) {
      throw new Error("Material inválido! Deve ser uma string não vazia.");
    }

    if (typeof tipoMotor !== 'string' || !tipoMotor.trim()) {
      throw new Error("Tipo de motor inválido! Deve ser uma string não vazia.");
    }

    if (typeof dentroDoVao !== 'boolean') {
      throw new Error("Valor de dentroDoVao inválido! Deve ser um booleano.");
    }

    // lâminas
    const rolo = await determinarRolo(largura);
    const area = largura * (altura + rolo) * quantidadePortas;

    // soleira
    const soleira = largura * quantidadePortas;

    // borracha
    const borracha = largura * quantidadePortas;
    
    // PVC
    const pvc = (altura * 4) * quantidadePortas;

    // guia inicial
    const guias = altura * 2;

    // Trava lâmina
    const travaLamina = Math.ceil((altura + rolo) / 0.075) * quantidadePortas / 2;

    // coletar de outras funções
    const results = await Promise.all([
      determinarEixo(largura),
      determinarMotor(area),
      determinarSoleiraReforco(largura),
      determinarGuiaModelo(largura),
      determinarTesteira(area),
      dentroDoVao ? determinarGuiaTelescopicaModelo(largura) : Promise.resolve("Metalão"),
      dentroDoVao ? Promise.resolve(null) : determinarMetalaoModelo(largura, altura)
    ]);

    // Verifica se alguma das operações falhou
    for (const result of results) {
      if (result && typeof result === 'string' && result.startsWith('Erro')) {
        return { error: result };
      }
    }

    // Retorna os resultados
    const [eixo, motor, soleiraReforco, guiaModelo, testeira, guiaTelescopicaModelo, metalaoModelo] = results;

    return {
      area: area,
      soleira: soleira,
      borracha: borracha,
      pvc: pvc,
      eixo: eixo,
      motor: motor,
      soleiraReforco: soleiraReforco,
      guias: guias,
      guiaModelo: guiaModelo,
      guiaTelescopicaModelo: guiaTelescopicaModelo,
      testeira: testeira,
      pinturaEletrostatica: area,
      kitControle: quantidadePortas,
      travaLamina: travaLamina,
      metalaoModelo: metalaoModelo,
    }

  } catch (error) {
    return { error: error.message };
  }
}

async function determinarRolo(largura: float): Promise<float> {
  switch (true) {
    case (largura <= 0):
      throw new Error("Largura inválida!");
    case (largura <= 5.5):
      return 60; // Eixo 114: rolo de 60cm
    case (largura <= 7):
      return 60; // Eixo 141: rolo de 60cm
    case (largura <= 8.5):
      return 75; // Eixo 165: rolo de 75cm
    case (largura <= 12.99):
      return 90; // Eixo 219: rolo de 90cm
    default:
      throw new Error("Largura acima de 13m: Consultar com especialista técnico.");
  }
}

async function determinarEixo(largura: float): Promise<float> {
  switch (true) {
    case (largura <= 0):
      throw new Error("Largura inválida!");
    case (largura <= 5.5):
      return "Eixo 114";
    case (largura <= 7):
      return "Eixo 141";
    case (largura <= 8.5):
      return "Eixo 165";
    case (largura <= 12.99):
      return "Eixo 219";
    default:
      throw new Error("Largura acima de 13m: Consultar com especialista técnico.");
  }
}

async function determinarMotor(area: float): Promise<float> {
  switch (true) {
    case (area <= 0):
      throw new Error("Área inválida!");
    case (area <= 13):
      return "Motor 200kg";
    case (area <= 20):
      return "Motor 300kg";
    case (area <= 26):
      return "Motor 400kg";
    case (area <= 33):
      return "Motor 500kg";
    case (area <= 39):
      return "Motor 600kg";
    case (area <= 46):
      return "Motor 700kg";
    case (area <= 52):
      return "Motor 800kg";
    case (area <= 60):
      return "Motor 1000kg";
    case (area <= 65):
      return "Motor 1300kg";
    case (area > 65):
      return "Motor 1500kg";
    default:
      throw new Error("Área inválida!");
  }
}

async function determinarSoleiraReforco(largura: float): Promise<float> {
  switch (true) {
    case (largura <= 0):
      throw new Error("Largura inválida!");
    case (largura <= 6):
      return "Soleira em T";
    case (largura <= 9.5):
      return "Soleira em T com reforço de tubo 60x40";
    case (largura <= 10.5):
      return "Soleira em T com reforço de tubo 80x40";
    case (largura <= 12.99):
      return "Soleira em T com reforço de tubo 100x40";
    default:
      throw new Error("Largura acima de 13m: Consultar com especialista técnico.");
  }
}

async function determinarGuiaModelo(largura: float): Promise<float> {
  switch (true) {
    case (largura <= 0):
      throw new Error("Largura inválida!");
    case (largura <= 4):
      return "Guia 50x30";
    case (largura <= 5.5):
      return "Guia 60x30";
    case (largura <= 7.5):
      return "Guia 70x30";
    case (largura <= 10):
      return "Guia 90x30";
    default:
      return "Guia 120x30";
  }
}

async function determinarGuiaTelescopicaModelo(largura: float): Promise<float> {
  switch (true) {
    case (largura <= 0):
      throw new Error("Largura inválida!");
    case (largura <= 7.5):
      return "Guia Telescópica 65x60";;
    case (largura <= 10):
      return "Guia Telescópica 65x90";
    default:
      return "Guia Telescópica 90x90";
  }
}

async function determinarTesteira(area: float): Promise<float> {
  switch (true) {
    case (area <= 0):
      throw new Error("Área inválida!");
    case (area <= 13):
      return "Modelo TM30";
    case (area <= 26):
      return "Modelo TM36";
    case (area <= 39):
      return "Modelo TM39";
    case (area <= 46):
      return "Modelo TM42";
    case (area <= 52):
      return "Modelo TM48";
    case (area <= 65):
      return "Modelo TM50";
    default:
      throw new Error("Área acima de 65m²: Consultar com especialista técnico.");
  }
}

async function determinarMetalaoModelo(largura: float): Promise<float> {
  switch (true) {
    case (largura <= 0):
      throw new Error("Largura inválida!");
    case (largura <= 4):
      return "Metalão 40x40";
    case (largura <= 7.5):
      return "Metalão 60x60";
    case (largura <= 10):
      return "Metalão 60x80";
    default:
      return "Metalão 100x100";
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  if (req.method === "GET") {
    return new Response("API ok", {
      headers: {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  if (req.method === "POST") {
    try {
      const requestBody = await req.json();

      const result = await createBudget(requestBody);

      return new Response( result.error ? JSON.stringify({ error: result.error }) : JSON.stringify({ data: result }), {
        status: result.error ? 400 : 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
  }

  return new Response("Method not allowed", {
    status: 405,
    headers: { "Content-Type": "text/plain" },
  });
})
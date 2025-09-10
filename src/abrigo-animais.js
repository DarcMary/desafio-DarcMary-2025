
const ANIMAIS_DATA = {
  'Rexcão':    { nome: 'Rexcão',    brinquedos: ['RATO', 'BOLA'], tipo: 'cao' },
  'Mimigato':  { nome: 'Mimigato',  brinquedos: ['BOLA', 'LASER'], tipo: 'gato' },
  'Fofogato':  { nome: 'Fofogato',  brinquedos: ['BOLA', 'RATO', 'LASER'], tipo: 'gato' },
  'Zerogato':  { nome: 'Zerogato',  brinquedos: ['RATO', 'BOLA'], tipo: 'gato' },
  'Bolacão':   { nome: 'Bolacão',   brinquedos: ['CAIXA', 'NOVELO'], tipo: 'cao' },
  'Bebecão':   { nome: 'Bebecão',   brinquedos: ['LASER', 'RATO', 'BOLA'], tipo: 'cao' },
  'Locojabuti':{ nome: 'Locojabuti',brinquedos: ['SKATE', 'RATO'], tipo: 'jabuti' },
  'Bolacão_extra':{ nome: 'Bolacão_extra',   brinquedos: ['CAIXA', 'NOVELO'], tipo: 'cao' },
  'Rexcão_extra': { nome: 'Rexcão_extra',    brinquedos: ['RATO', 'BOLA'], tipo: 'cao' }
};

class AbrigoAnimais {

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const validacao = this.validarEntradas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais);
    if (validacao.erro) {
      return { lista: [], erro: validacao.erro };
    }

    const resultados = this.processarAdocoes(
      validacao.animaisValidos,
      validacao.brinquedosP1,
      validacao.brinquedosP2
    );

    return this.formatarSaida(resultados);
  }

  validarEntradas(inputPessoa1, inputPessoa2, inputAnimais) {
    const ALL_BRINQUEDOS = Array.from(new Set(Object.values(ANIMAIS_DATA).flatMap(animal => animal.brinquedos)));

    const brinquedosP1 = inputPessoa1 ? inputPessoa1.split(',').map(b => b.trim().toUpperCase()) : [];
    const brinquedosP2 = inputPessoa2 ? inputPessoa2.split(',').map(b => b.trim().toUpperCase()) : [];
    const animaisValidos = inputAnimais.split(',').map(a => a.trim());

    // Lógica 2.2: VALIDATE animais -> checar duplicatas e existência em ANIMAIS_DATA.
    const duplicatasAnimais = animaisValidos.filter((animal, index) => animaisValidos.indexOf(animal) !== index);
    if (duplicatasAnimais.length > 0) {
      return { erro: `Animais duplicados: ${duplicatasAnimais.join(', ')}` };
    }

    const animaisInvalidos = animaisValidos.filter(animal => !ANIMAIS_DATA[animal]);
    if (animaisInvalidos.length > 0) {
      return { erro: `Animais inválidos: ${animaisInvalidos.join(', ')}` };
    }

    // Lógica 2.3: VALIDATE brinquedos -> checar duplicatas por pessoa e validade geral.
    const duplicatasBrinquedosP1 = brinquedosP1.filter((brinquedo, index) => brinquedosP1.indexOf(brinquedo) !== index);
    if (duplicatasBrinquedosP1.length > 0) {
      return { erro: `Brinquedos duplicados para Pessoa 1: ${duplicatasBrinquedosP1.join(', ')}` };
    }
    const brinquedosInvalidosP1 = brinquedosP1.filter(brinquedo => !ALL_BRINQUEDOS.includes(brinquedo));
    if (brinquedosInvalidosP1.length > 0) {
      return { erro: `Brinquedos inválidos para Pessoa 1: ${brinquedosInvalidosP1.join(', ')}` };
    }

    const duplicatasBrinquedosP2 = brinquedosP2.filter((brinquedo, index) => brinquedosP2.indexOf(brinquedo) !== index);
    if (duplicatasBrinquedosP2.length > 0) {
      return { erro: `Brinquedos duplicados para Pessoa 2: ${duplicatasBrinquedosP2.join(', ')}` };
    }
    const brinquedosInvalidosP2 = brinquedosP2.filter(brinquedo => !ALL_BRINQUEDOS.includes(brinquedo));
    if (brinquedosInvalidosP2.length > 0) {
      return { erro: `Brinquedos inválidos para Pessoa 2: ${brinquedosInvalidosP2.join(', ')}` };
    }

    return { animaisValidos, brinquedosP1, brinquedosP2 };
  }

  checkAnimalToyElegibility(pessoaBrinquedos, animal, animaisValidos) {
    const animalData = ANIMAIS_DATA[animal];
    const animalBrinquedos = animalData.brinquedos;

    // Regra C (Gatos): Match exato de brinquedos e ordem.
    if (animalData.tipo === 'gato') {
      if (pessoaBrinquedos.length !== animalBrinquedos.length) return false;
      return pessoaBrinquedos.every((brinquedo, index) => brinquedo === animalBrinquedos[index]);
    }

    // Regra D (Loco): Apenas conter brinquedos (sem ordem) se count(animaisValidos) > 1.
    if (animalData.nome === 'Locojabuti' && animaisValidos.length > 1) {
      return animalBrinquedos.every(brinquedo => pessoaBrinquedos.includes(brinquedo));
    }

    // Regra B: Ordem dos brinquedos (subsequência).
    let subSequenceIndex = 0;
    for (let i = 0; i < pessoaBrinquedos.length; i++) {
      if (subSequenceIndex < animalBrinquedos.length && pessoaBrinquedos[i] === animalBrinquedos[subSequenceIndex]) {
        subSequenceIndex++;
      }
    }
    if (subSequenceIndex === animalBrinquedos.length) return true;

    return false;
  }

  processarAdocoes(animaisValidos, brinquedosP1, brinquedosP2) {
    let adocoesPessoa1 = 0;
    let adocoesPessoa2 = 0;
    const resultados = [];

    for (const animal of animaisValidos) {
      let p1_elegivel_brinquedos = this.checkAnimalToyElegibility(brinquedosP1, animal, animaisValidos);
      let p2_elegivel_brinquedos = this.checkAnimalToyElegibility(brinquedosP2, animal, animaisValidos);

      let p1_elegivel = p1_elegivel_brinquedos && (adocoesPessoa1 < 3);
      let p2_elegivel = p2_elegivel_brinquedos && (adocoesPessoa2 < 3);

      if (p1_elegivel && !p2_elegivel) {
        resultados.push(`${animal} - pessoa 1`);
        adocoesPessoa1++;
      } else if (!p1_elegivel && p2_elegivel) {
        resultados.push(`${animal} - pessoa 2`);
        adocoesPessoa2++;
      } else {
        resultados.push(`${animal} - abrigo`);
      }
    }
    return resultados;
  }

  formatarSaida(resultados) {
    resultados.sort();
    return { lista: resultados };
  }
}

export { AbrigoAnimais as AbrigoAnimais };

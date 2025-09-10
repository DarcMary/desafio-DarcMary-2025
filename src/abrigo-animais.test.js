import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {

  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animais inválidos: Lulu');
    expect(resultado.lista.length).toBe(0);
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rexcão,Fofogato');
      expect(resultado.lista[0]).toBe('Fofogato - abrigo');
      expect(resultado.lista[1]).toBe('Rexcão - pessoa 1');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER', 'Mimigato,Fofogato,Rexcão,Bolacão');

      expect(resultado.lista[0]).toBe('Bolacão - abrigo');
      expect(resultado.lista[1]).toBe('Fofogato - abrigo');
      expect(resultado.lista[2]).toBe('Mimigato - pessoa 1');
      expect(resultado.lista[3]).toBe('Rexcão - abrigo');
      expect(resultado.lista.length).toBe(4);
      expect(resultado.erro).toBeFalsy();
  });

  test('Regra C (Gatos): Deve retornar erro para brinquedos inválidos para Gato', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER', 'BOLA,RATO', 'Mimigato');
    expect(resultado.lista[0]).toBe('Mimigato - pessoa 1');
    expect(resultado.erro).toBeFalsy();
  });

  test('Regra D (Locojabuti): Deve retornar Locojabuti para Pessoa 1 se houver mais de um animal e os brinquedos coincidirem (sem ordem)', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('SKATE,RATO,BOLA', 'RATO,BOLA', 'Locojabuti,Rexcão');
    expect(resultado.lista).toContain('Locojabuti - pessoa 1');
    expect(resultado.lista).toContain('Rexcão - abrigo');
    expect(resultado.erro).toBeFalsy();
  });

  test('Regra A: Limite de 3 adoções por pessoa', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'LASER,RATO,BOLA,CAIXA,NOVELO', // Pessoa 1 para Rexcão, Bolacão, Bebecão (3 adocoes)
      '', // Pessoa 2 sem brinquedos
      'Rexcão,Bolacão,Bebecão,Rexcão_extra,Bolacão_extra' // 5 animais (apenas 3 cães serao adotados)
    );
    expect(resultado.lista.filter(r => r.includes('pessoa 1')).length).toBe(3);
    expect(resultado.lista).toContain('Rexcão - pessoa 1');
    expect(resultado.lista).toContain('Bolacão - pessoa 1');
    expect(resultado.lista).toContain('Bebecão - pessoa 1');
    expect(resultado.lista).toContain('Rexcão_extra - abrigo');
    expect(resultado.lista).toContain('Bolacão_extra - abrigo');
    expect(resultado.erro).toBeFalsy();
  });

  test('Regra A: Limite de 3 adoções por pessoa 2', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      '', // Pessoa 1 sem brinquedos
      'LASER,RATO,BOLA,CAIXA,NOVELO', // Pessoa 2 para Rexcão, Bolacão, Bebecão (3 adocoes)
      'Rexcão,Bolacão,Bebecão,Rexcão_extra,Bolacão_extra' // 5 animais (apenas 3 cães serao adotados)
    );
    expect(resultado.lista.filter(r => r.includes('pessoa 2')).length).toBe(3);
    expect(resultado.lista).toContain('Rexcão - pessoa 2');
    expect(resultado.lista).toContain('Bolacão - pessoa 2');
    expect(resultado.lista).toContain('Bebecão - pessoa 2');
    expect(resultado.lista).toContain('Rexcão_extra - abrigo');
    expect(resultado.lista).toContain('Bolacão_extra - abrigo');
    expect(resultado.erro).toBeFalsy();
  });

  test('Caso de empate: o animal deve ir para o abrigo', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA', 'RATO,BOLA', 'Zerogato');
    expect(resultado.lista[0]).toBe('Zerogato - abrigo');
    expect(resultado.erro).toBeFalsy();
  });

  test('Erro de brinquedo inválido para pessoa 1', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,INEXISTENTE', 'BOLA', 'Rexcão');
    expect(resultado.erro).toBe('Brinquedos inválidos para Pessoa 1: INEXISTENTE');
    expect(resultado.lista.length).toBe(0);
  });

  test('Erro de brinquedo inválido para pessoa 2', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO', 'BOLA,INEXISTENTE', 'Rexcão');
    expect(resultado.erro).toBe('Brinquedos inválidos para Pessoa 2: INEXISTENTE');
    expect(resultado.lista.length).toBe(0);
  });

  test('Erro de animais duplicados', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO', 'BOLA', 'Rexcão,Rexcão');
    expect(resultado.erro).toBe('Animais duplicados: Rexcão');
    expect(resultado.lista.length).toBe(0);
  });

  test('Erro de brinquedos duplicados para pessoa 1', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,RATO', 'BOLA', 'Rexcão');
    expect(resultado.erro).toBe('Brinquedos duplicados para Pessoa 1: RATO');
    expect(resultado.lista.length).toBe(0);
  });

  test('Erro de brinquedos duplicados para pessoa 2', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO', 'BOLA,BOLA', 'Rexcão');
    expect(resultado.erro).toBe('Brinquedos duplicados para Pessoa 2: BOLA');
    expect(resultado.lista.length).toBe(0);
  });
});

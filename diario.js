(() => {
  'use strict';
  const chave = 'ainda.diario.v1';
  const $ = id => document.getElementById(id);
  const dataLocal = (agora = new Date()) => `${agora.getFullYear()}-${String(agora.getMonth()+1).padStart(2,'0')}-${String(agora.getDate()).padStart(2,'0')}`;
  const formatar = data => new Date(`${data}T12:00:00`).toLocaleDateString('pt-BR', {day:'numeric',month:'long',year:'numeric'});
  const parametros = new URLSearchParams(window.location.search);
  const viaPingente = ['pingente','nfc'].includes(parametros.get('origem'));
  const hora = new Date().getHours();
  const momentoPedido = parametros.get('momento');
  let registros = {}, momento = ['manha','noite'].includes(momentoPedido) ? momentoPedido : viaPingente && (hora >= 18 || hora < 5) ? 'noite' : 'manha', selecionada = dataLocal(), disponivel = true, alterado = false;
  document.body.classList.toggle('entrada-pingente', viaPingente);
  $('entradaNfc').hidden = !viaPingente;
  try {
    const bruto = JSON.parse(localStorage.getItem(chave) || '{}');
    if (!bruto || Array.isArray(bruto) || typeof bruto !== 'object' || Object.entries(bruto).some(([data,r]) => !/^\d{4}-\d{2}-\d{2}$/.test(data) || !r || typeof r.manha !== 'string' || typeof r.noite !== 'string')) throw new Error('Formato inválido');
    registros = bruto;
  } catch { disponivel = false; }
  function conteudo() { return window.conteudosDiario[Number(selecionada.slice(-2))-1]; }
  function aviso(texto) { $('status').textContent = texto; }
  function guardar() {
    if (!alterado) return true;
    const registro = registros[selecionada] || {manha:'',noite:''};
    registro[momento] = $('resposta').value;
    registros[selecionada] = registro;
    // Em caso de dados ilegíveis, preserva o original até que o usuário exporte sua escrita.
    if (!disponivel) { aviso('Não foi possível salvar neste navegador. Toque em Baixar meu diário para guardar uma cópia.'); return false; }
    try {
      localStorage.setItem(chave, JSON.stringify(registros));
      alterado = false;
      aviso('Sua resposta foi salva neste navegador.');
      return true;
    } catch { disponivel = false; aviso('Não foi possível salvar. Toque em Baixar meu diário antes de sair.'); return false; }
  }
  function mostrar() {
    const c = conteudo();
    $('data').value = selecionada;
    $('tema').textContent = `PENSAMENTO ${String(c.dia).padStart(2,'0')} DE 31 · ${c.tema.toLocaleUpperCase('pt-BR')}`;
    $('titulo').textContent = c.titulo;
    $('reflexao').textContent = c.texto;
    $('pratica').textContent = c.pratica;
    $('ciclo').textContent = 'Um pensamento para cada dia do mês';
    $('pergunta').textContent = c[momento];
    $('rotuloMomento').textContent = momento === 'manha' ? 'PARA COMEÇAR O DIA' : 'PARA PENSAR NO SEU DIA';
    $('resposta').value = registros[selecionada]?.[momento] || '';
    $('caracteres').textContent = `${$('resposta').value.length} caracteres`;
    for (const [id, valor] of [['abaManha','manha'],['abaNoite','noite']]) {
      $(id).classList.toggle('ativo',momento === valor);
      $(id).setAttribute('aria-pressed',String(momento === valor));
    }
    alterado = false;
    aviso(disponivel ? '' : 'Não foi possível salvar neste navegador. Toque em Baixar meu diário antes de sair.');
  }
  function historico() {
    const datas = Object.keys(registros).filter(d => registros[d].manha.trim() || registros[d].noite.trim()).sort().reverse();
    $('listaHistorico').replaceChildren();
    $('vazio').hidden = datas.length > 0;
    $('contagem').textContent = `${datas.length} ${datas.length === 1 ? 'dia com anotações' : 'dias com anotações'}`;
    for (const data of datas) {
      const li = document.createElement('li'), titulo = document.createElement('h3'), assunto = document.createElement('p');
      li.className = 'anotacao';
      titulo.textContent = formatar(data);
      const pensamento = window.conteudosDiario[Number(data.slice(-2))-1];
      assunto.className = 'assunto-anotacao';
      assunto.textContent = pensamento.titulo;
      li.append(titulo,assunto);
      for (const [periodo,nome] of [['manha','Começo do dia'],['noite','Fim do dia']]) {
        const texto = registros[data][periodo];
        if (!texto.trim()) continue;
        const bloco = document.createElement('section'), rotulo = document.createElement('h4'), pergunta = document.createElement('p'), resposta = document.createElement('p'), editar = document.createElement('button');
        bloco.className = 'momento-anotacao';
        rotulo.textContent = nome;
        pergunta.className = 'pergunta-anotacao';
        pergunta.textContent = pensamento[periodo];
        resposta.className = 'resposta-anotacao';
        resposta.textContent = texto;
        editar.textContent = 'Editar resposta';
        editar.setAttribute('aria-label', `Editar resposta de ${nome.toLocaleLowerCase('pt-BR')}, ${formatar(data)}`);
        editar.onclick = () => {
          guardar(); selecionada = data; momento = periodo; abrirPagina(); mostrar();
          $('escrita').scrollIntoView({block:'start'});
        };
        bloco.append(rotulo,pergunta,resposta,editar);
        li.append(bloco);
      }
      $('listaHistorico').append(li);
    }
  }
  function abrirPagina() { $('historico').hidden = true; $('pagina').hidden = false; $('hoje').classList.add('ativo'); $('verHistorico').classList.remove('ativo'); }
  $('salvar').onclick = () => { if (!alterado) aviso(disponivel ? 'Suas respostas já estão salvas.' : 'Toque em Baixar meu diário para guardar uma cópia.'); else guardar(); };
  $('resposta').addEventListener('input', () => { alterado = true; $('caracteres').textContent = `${$('resposta').value.length} caracteres`; guardar(); });
  for (const [id, valor] of [['abaManha','manha'],['abaNoite','noite']]) $(id).onclick = () => { guardar(); momento = valor; mostrar(); };
  $('data').onchange = () => { const nova = $('data').value; if (!nova || !$('data').validity.valid) { $('data').value = selecionada; return; } guardar(); selecionada = nova; mostrar(); };
  $('hoje').onclick = () => { guardar(); selecionada = dataLocal(); abrirPagina(); mostrar(); };
  $('verHistorico').onclick = () => { guardar(); historico(); $('historico').hidden = false; $('pagina').hidden = true; $('hoje').classList.remove('ativo'); $('verHistorico').classList.add('ativo'); };
  let fontePdf;
  $('exportar').onclick = async () => {
    guardar();
    const botao = $('exportar'), mensagem = $('mensagemDownload');
    const copia = JSON.parse(JSON.stringify(registros));
    if (!Object.values(copia).some(r => r.manha.trim() || r.noite.trim())) {
      mensagem.textContent = 'Escreva uma resposta para começar. Depois você pode baixar seu diário em PDF.';
      return;
    }
    botao.disabled = true; botao.setAttribute('aria-busy','true'); mensagem.textContent = 'Preparando seu PDF…';
    try {
      if (!fontePdf) {
        const resposta = await fetch('NotoSans-Regular.ttf');
        if (!resposta.ok) throw new Error('Fonte indisponível');
        const bytes = new Uint8Array(await resposta.arrayBuffer());
        let binario = '';
        for (let i=0;i<bytes.length;i+=8192) binario += String.fromCharCode(...bytes.subarray(i,i+8192));
        fontePdf = btoa(binario);
      }
      const pdf = window.criarPdfDiario(window.jspdf.jsPDF,fontePdf,copia,window.conteudosDiario);
      await pdf.save(`meu-diario-${dataLocal()}.pdf`,{returnPromise:true});
      mensagem.textContent = 'Seu PDF está pronto. Se ele abrir na tela, use Compartilhar ou Salvar para guardar uma cópia.';
    } catch {
      mensagem.textContent = 'Não foi possível criar o PDF. Confira sua conexão e tente de novo. Suas respostas continuam no diário.';
    } finally { botao.disabled = false; botao.setAttribute('aria-busy','false'); }
  };
  window.addEventListener('beforeunload', event => { if (alterado && !guardar()) { event.preventDefault(); event.returnValue = ''; } });
  // Celulares podem encerrar uma aba sem emitir beforeunload.
  window.addEventListener('pagehide', guardar);
  // Não substitui silenciosamente registros quando outro separador os atualiza.
  window.addEventListener('storage', event => { if (event.key === chave) { disponivel = false; aviso('O diário mudou em outra aba. Toque em Baixar meu diário e depois atualize esta página.'); } });
  mostrar();
})();

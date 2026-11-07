/* Gera o PDF no dispositivo. Nenhum registro é enviado pela rede. */
(function (root) {
  'use strict';
  function criarPdf(PDF, fonte, registros, conteudos) {
    const datas = Object.keys(registros).filter(d => registros[d].manha.trim() || registros[d].noite.trim()).sort();
    if (!datas.length) throw new Error('Escreva uma resposta antes de baixar seu diário.');
    const doc = new PDF({unit:'mm',format:'a4',compress:true,putOnlyUsedFonts:true});
    doc.addFileToVFS('NotoSans.ttf', fonte);
    doc.addFont('NotoSans.ttf','NotoSans','normal');
    doc.setFont('NotoSans');
    doc.setProperties({title:'Meu diário - AINDA',author:'',subject:'Minhas perguntas e respostas'});
    let y = 0, dataAtual = '';
    const largura = 166, esquerda = 22, limite = 272;
    const dataBonita = data => new Date(`${data}T12:00:00`).toLocaleDateString('pt-BR',{day:'numeric',month:'long',year:'numeric'});
    function cabecalho(continua=false) {
      doc.setTextColor(49,85,66); doc.setFontSize(10);
      doc.text('AINDA  /  MEU DIÁRIO',esquerda,18);
      doc.setDrawColor(211,219,206); doc.line(esquerda,23,188,23);
      doc.setTextColor(91,103,91); doc.setFontSize(9);
      doc.text(`${dataBonita(dataAtual)}${continua ? ' - continuação' : ''}`,esquerda,32);
      y = 44;
    }
    function novaPagina() { doc.addPage(); cabecalho(true); }
    function espaco(altura) { if (y + altura > limite) novaPagina(); }
    function paragrafo(texto,tamanho=11,cor=[41,59,50]) {
      doc.setFontSize(tamanho); doc.setTextColor(...cor);
      const linhas = doc.splitTextToSize(texto.replace(/\r\n?/g,'\n').replace(/\t/g,'    '),largura);
      const passo = tamanho * 0.3528 * 1.6;
      for (const linha of linhas) {
        espaco(passo);
        // O cabeçalho de uma nova página muda tamanho e cor da fonte.
        doc.setFontSize(tamanho); doc.setTextColor(...cor);
        doc.text(linha,esquerda,y); y += passo;
      }
      y += 5;
    }
    datas.forEach((data,i) => {
      dataAtual = data;
      if (i) doc.addPage();
      cabecalho();
      const c = conteudos[Number(data.slice(-2))-1];
      paragrafo(c.titulo,21,[49,85,66]);
      for (const [momento,nome] of [['manha','COMEÇO DO DIA'],['noite','FIM DO DIA']]) {
        const resposta = registros[data][momento];
        if (!resposta.trim()) continue;
        espaco(32);
        paragrafo(nome,9,[114,89,48]);
        paragrafo(c[momento],13,[49,85,66]);
        paragrafo(resposta);
        y += 7;
      }
    });
    const total = doc.getNumberOfPages();
    for (let pagina=1;pagina<=total;pagina++) {
      doc.setPage(pagina); doc.setFontSize(9); doc.setTextColor(91,103,91);
      doc.text(`${pagina} de ${total}`,188,285,{align:'right'});
    }
    return doc;
  }
  if (typeof module !== 'undefined') module.exports = criarPdf;
  else root.criarPdfDiario = criarPdf;
})(typeof window !== 'undefined' ? window : globalThis);

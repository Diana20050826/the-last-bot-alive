
/* =========================================
   THE LAST BOT ALIVE — JIBA_PEEK
========================================= */


/* 1. GERADOR DE DESCULPAS */

const botaoDesculpa = document.querySelector("#botao-desculpa");
const resultadoDesculpa = document.querySelector("#resultado-desculpa");

const desculpas = [
    "A minha equipa não comunicou. Eu estava impecável.",
    "Tinha lag. Mesmo que o ping estivesse normal.",
    "O rato falhou exatamente naquele momento.",
    "Eu ouvi passos... só não eram os que pensava.",
    "Era uma estratégia tão avançada que ninguém percebeu.",
    "A culpa foi do teclado. Claramente.",
    "Estava a testar uma nova sensibilidade.",
    "Não estava a falhar. Estava a dar oportunidades.",
    "O adversário teve sorte. Muita sorte.",
    "Estava a aquecer. A sério desta vez.",
    "A minha mira estava de férias.",
    "Não perdi. Estava a estudar o adversário."
];

if (botaoDesculpa && resultadoDesculpa) {
    botaoDesculpa.addEventListener("click", function () {
        const indice = Math.floor(Math.random() * desculpas.length);
        resultadoDesculpa.textContent = "Jiba_Peek alega: " + desculpas[indice];
    });
}


/* 2. CLASSIFICAÇÃO HUMORÍSTICA */

const botaoRank = document.querySelector("#botao-rank");
const resultadoRank = document.querySelector("#resultado-rank");

const classificacoes = [
    "FERRO COM ORGULHO 🥉",
    "BOT EM FORMA 🤖",
    "PRATA DAS DESGRAÇAS 🥈",
    "OURO... DEPOIS DE MUITO TREINO 🥇",
    "LENDA DAS DESCULPAS 🏆",
    "MVP DA CONFUSÃO 💀",
    "PROFISSIONAL A TEMPO PARCIAL 🎯",
    "O TERROR... DA PRÓPRIA EQUIPA 😭"
];

if (botaoRank && resultadoRank) {
    botaoRank.addEventListener("click", function () {
        const indice = Math.floor(Math.random() * classificacoes.length);
        resultadoRank.textContent = "Jiba_Peek foi classificado como: " + classificacoes[indice];
    });
}


/* 3. RELATÓRIO DE PARTIDA */

const botaoRelatorio = document.querySelector("#botao-relatorio");
const relatorioKills = document.querySelector("#relatorio-kills");
const relatorioMortes = document.querySelector("#relatorio-mortes");
const relatorioAssistencias = document.querySelector("#relatorio-assistencias");
const relatorioNota = document.querySelector("#relatorio-nota");
const relatorioComentario = document.querySelector("#relatorio-comentario");
const relatorioVeredicto = document.querySelector("#relatorio-veredicto");

const comentariosRelatorio = [
    "A mira apareceu durante alguns segundos. O departamento continua otimista.",
    "Boa tentativa. A equipa ainda está a tentar perceber o plano.",
    "O jogador demonstrou confiança. As provas de pontaria continuam desaparecidas.",
    "Algumas decisões foram tomadas. Nem todas foram aprovadas.",
    "O desempenho foi tão imprevisível que nem o próprio jogador esperava.",
    "Houve momentos de qualidade. A comissão pede mais evidências.",
    "A estratégia parecia genial... até começar a ronda.",
    "O jogador sobreviveu ao relatório. Isso já conta como uma vitória."
];

const veredictos = [
    "SOB INVESTIGAÇÃO 🔎",
    "PRECISA DE TREINO 🎯",
    "SUSPEITO DE GENIALIDADE 🧠",
    "BOT COM POTENCIAL 🤖",
    "A EQUIPA PEDE EXPLICAÇÕES 💀",
    "APROVADO... POR POUCO 🟠",
    "MVP DAS DESCULPAS 🏆"
];

function numeroAleatorio(minimo, maximo) {
    return Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;
}

if (
    botaoRelatorio && relatorioKills && relatorioMortes &&
    relatorioAssistencias && relatorioNota &&
    relatorioComentario && relatorioVeredicto
) {
    botaoRelatorio.addEventListener("click", function () {
        const kills = numeroAleatorio(0, 35);
        const mortes = numeroAleatorio(3, 30);
        const assistencias = numeroAleatorio(0, 15);

        relatorioKills.textContent = kills;
        relatorioMortes.textContent = mortes;
        relatorioAssistencias.textContent = assistencias;
        relatorioNota.textContent = (kills / Math.max(mortes, 1)).toFixed(2);

        relatorioComentario.textContent =
            comentariosRelatorio[numeroAleatorio(0, comentariosRelatorio.length - 1)];

        relatorioVeredicto.textContent =
            veredictos[numeroAleatorio(0, veredictos.length - 1)];

        const caixa = document.querySelector(".relatorio-caixa");

        if (caixa) {
            caixa.classList.remove("relatorio-atualizado");
            void caixa.offsetWidth;
            caixa.classList.add("relatorio-atualizado");
        }
    });
}


/* 4. SISTEMA DE MISSÕES, XP E MEDALHAS */

const missaoDados = {
    mira: { xp: 100 },
    tatica: { xp: 150 },
    desculpas: { xp: 200 },
    sobrevivente: { xp: 250 },
    operacao: { xp: 300 },
    equipa: { xp: 500 }
};

const chaveGuardado = "theLastBotAliveMissoes";

function carregarProgresso() {
    try {
        const guardado = localStorage.getItem(chaveGuardado);

        if (guardado) {
            const dados = JSON.parse(guardado);

            if (
                dados &&
                typeof dados === "object" &&
                dados.concluidas &&
                typeof dados.concluidas === "object"
            ) {
                return dados;
            }
        }
    } catch (erro) {
        console.warn("Não foi possível carregar o progresso guardado.");
    }

    return { concluidas: {} };
}

let progresso = carregarProgresso();

function guardarProgresso() {
    try {
        localStorage.setItem(chaveGuardado, JSON.stringify(progresso));
    } catch (erro) {
        console.warn("O navegador não permitiu guardar o progresso.");
    }
}

function calcularXP() {
    let total = 0;

    for (const id in missaoDados) {
        if (progresso.concluidas[id]) {
            total += missaoDados[id].xp;
        }
    }

    return total;
}

function contarMissoesConcluidas() {
    return Object.keys(missaoDados).filter(function (id) {
        return Boolean(progresso.concluidas[id]);
    }).length;
}

function obterNivel(xp) {
    if (xp >= 1000) {
        return { nome: "LENDA DAS DESCULPAS", minimo: 1000, proximo: 1000 };
    }

    if (xp >= 600) {
        return { nome: "MÁQUINA DE HEADSHOTS", minimo: 600, proximo: 1000 };
    }

    if (xp >= 300) {
        return { nome: "QUASE PROFISSIONAL", minimo: 300, proximo: 600 };
    }

    if (xp >= 100) {
        return { nome: "BOT EM TREINO", minimo: 100, proximo: 300 };
    }

    return { nome: "BOT DE SERVIÇO", minimo: 0, proximo: 100 };
}

function obterTituloCertificado(xp, missoes) {
    if (missoes === 6) return "LENDÁRIO E SEM DESCULPAS 👑";
    if (xp >= 600) return "MÁQUINA DE HEADSHOTS 🎯";
    if (xp >= 300) return "QUASE PROFISSIONAL 🥈";
    if (xp >= 100) return "BOT CERTIFICADO 🤖";
    return "BOT EM OBSERVAÇÃO 🤖";
}

function atualizarMissoes() {
    const xp = calcularXP();
    const nivel = obterNivel(xp);

    const xpTotal = document.querySelector("#xp-total");
    const nivelNome = document.querySelector("#nivel-nome");
    const xpBarra = document.querySelector("#xp-barra");
    const xpProgresso = document.querySelector("#xp-progresso");

    if (xpTotal) xpTotal.textContent = xp;
    if (nivelNome) nivelNome.textContent = nivel.nome;

    if (xpBarra) {
        const percentagem = xp >= 1000
            ? 100
            : ((xp - nivel.minimo) / (nivel.proximo - nivel.minimo)) * 100;

        xpBarra.style.width = Math.max(0, Math.min(100, percentagem)) + "%";
    }

    if (xpProgresso) {
        xpProgresso.textContent = xp >= 1000
            ? "Nível máximo atingido! A comissão está surpreendida."
            : "Faltam " + (nivel.proximo - xp) + " XP para o próximo nível.";
    }

    for (const id in missaoDados) {
        const botao = document.querySelector('[data-missao="' + id + '"]');
        const estado = document.querySelector("#estado-" + id);
        const cartao = botao ? botao.closest(".missao-cartao") : null;

        if (!botao || !estado) continue;

        const concluida = Boolean(progresso.concluidas[id]);

        botao.disabled = concluida;
        botao.textContent = concluida
            ? "MISSÃO CONCLUÍDA ✓"
            : "MARCAR COMO CONCLUÍDA";

        estado.textContent = concluida
            ? "✓ CONCLUÍDA — XP RECEBIDO"
            : "À espera de provas...";

        if (cartao) {
            cartao.classList.toggle("missao-concluida", concluida);
        }
    }

    const medalhas = [
        { id: "medalha-bronze", xp: 100 },
        { id: "medalha-prata", xp: 300 },
        { id: "medalha-ouro", xp: 600 },
        { id: "medalha-lenda", xp: 1000 }
    ];

    medalhas.forEach(function (medalha) {
        const elemento = document.querySelector("#" + medalha.id);
        if (!elemento) return;

        const desbloqueada = xp >= medalha.xp;
        elemento.classList.toggle("medalha-desbloqueada", desbloqueada);

        const estado = elemento.querySelector(".medalha-estado");
        if (estado) {
            estado.textContent = desbloqueada ? "DESBLOQUEADA ✓" : "BLOQUEADA";
        }
    });

    atualizarDadosCertificado();
}

document.querySelectorAll("[data-missao]").forEach(function (botao) {
    botao.addEventListener("click", function () {
        const id = botao.dataset.missao;

        if (!missaoDados[id] || progresso.concluidas[id]) return;

        progresso.concluidas[id] = true;
        guardarProgresso();
        atualizarMissoes();
    });
});

const botaoReset = document.querySelector("#botao-reset");

if (botaoReset) {
    botaoReset.addEventListener("click", function () {
        const confirmar = window.confirm(
            "Queres mesmo reiniciar todas as missões e perder o XP acumulado?"
        );

        if (!confirmar) return;

        progresso = { concluidas: {} };
        guardarProgresso();
        atualizarMissoes();
    });
}


/* 5. CERTIFICADO */

function atualizarDadosCertificado() {
    const xp = calcularXP();
    const nivel = obterNivel(xp);
    const missoes = contarMissoesConcluidas();

    const certificadoNivel = document.querySelector("#certificado-nivel");
    const certificadoXP = document.querySelector("#certificado-xp");
    const certificadoMissoes = document.querySelector("#certificado-missoes");
    const certificadoTitulo = document.querySelector("#certificado-titulo");

    if (certificadoNivel) certificadoNivel.textContent = nivel.nome;
    if (certificadoXP) certificadoXP.textContent = xp + " XP";
    if (certificadoMissoes) certificadoMissoes.textContent = missoes + " / 6";

    if (certificadoTitulo) {
        certificadoTitulo.textContent = obterTituloCertificado(xp, missoes);
    }
}

const botaoAtualizarCertificado =
    document.querySelector("#botao-atualizar-certificado");

if (botaoAtualizarCertificado) {
    botaoAtualizarCertificado.addEventListener("click", function () {
        atualizarDadosCertificado();

        const certificado = document.querySelector("#certificado-imprimir");

        if (certificado) {
            certificado.classList.remove("certificado-atualizado");
            void certificado.offsetWidth;
            certificado.classList.add("certificado-atualizado");
        }
    });
}

const botaoImprimirCertificado =
    document.querySelector("#botao-imprimir-certificado");

if (botaoImprimirCertificado) {
    botaoImprimirCertificado.addEventListener("click", function () {
        atualizarDadosCertificado();
        window.print();
    });
}


/* =========================================
   6. MINI-JOGO: SOBREVIVE À RONDA
========================================= */

/*
   Cada ronda apresenta três escolhas.
   Os efeitos alteram a vida, a moral da equipa
   e os pontos do jogador.
*/

const rondas = [
    {
        etiqueta: "RONDA 01 // INFORMAÇÕES CLASSIFICADAS",
        pergunta: "A tua equipa perdeu o controlo do meio. O que fazes?",
        descricao: "Tens poucos segundos para decidir. Os teus colegas esperam uma chamada clara.",
        opcoes: [
            {
                texto: "Avançar sozinho para recuperar o meio.",
                vida: -25, equipa: -20, pontos: 0,
                resultado: "Entraste sozinho e sem informação. A equipa ficou sem apoio. Bela iniciativa, Jiba_Peek."
            },
            {
                texto: "Pedir informação e coordenar uma rotação.",
                vida: 0, equipa: 10, pontos: 100,
                resultado: "Boa comunicação! A equipa consegue reorganizar-se sem oferecer eliminações gratuitas."
            },
            {
                texto: "Ficar parado sem avisar ninguém.",
                vida: 0, equipa: -15, pontos: 10,
                resultado: "Não perdeste vida, mas também não ajudaste. A equipa está a perguntar se o microfone funciona."
            }
        ]
    },
    {
        etiqueta: "RONDA 02 // AMEAÇA DETETADA",
        pergunta: "Ouves vários passos perto da tua posição.",
        descricao: "Não sabes exatamente quantos adversários estão a aproximar-se. Tens de gerir o risco.",
        opcoes: [
            {
                texto: "Abandonar a posição sem avisar a equipa.",
                vida: 0, equipa: -20, pontos: 0,
                resultado: "A tua posição ficou desprotegida e ninguém sabia que tinhas saído. O plano desapareceu contigo."
            },
            {
                texto: "Comunicar a informação e manter uma posição segura.",
                vida: 5, equipa: 10, pontos: 120,
                resultado: "Boa leitura! Informaste a equipa e mantiveste uma posição que permite reagir."
            },
            {
                texto: "Correr diretamente para o som.",
                vida: -30, equipa: -10, pontos: 5,
                resultado: "Foste investigar sem informação suficiente. A curiosidade é boa; neste caso, foi cara."
            }
        ]
    },
    {
        etiqueta: "RONDA 03 // RECURSOS LIMITADOS",
        pergunta: "Tens pouco equipamento e a equipa precisa de apoio.",
        descricao: "Não dá para resolver tudo sozinho. Uma compra ou decisão mal coordenada pode prejudicar a ronda.",
        opcoes: [
            {
                texto: "Verificar o equipamento da equipa e combinar a estratégia.",
                vida: 0, equipa: 10, pontos: 150,
                resultado: "Decisão sensata. A equipa consegue adaptar o plano ao equipamento disponível."
            },
            {
                texto: "Gastar tudo sem perguntar o que os colegas precisam.",
                vida: 0, equipa: -15, pontos: 0,
                resultado: "Compraste sem coordenar. A comissão recomenda rever o conceito de economia de equipa."
            },
            {
                texto: "Ignorar o plano e tentar resolver tudo sozinho.",
                vida: -20, equipa: -15, pontos: 10,
                resultado: "A falta de coordenação deixou-te exposto. Ser protagonista não é o mesmo que ajudar."
            }
        ]
    },
    {
        etiqueta: "RONDA 04 // DECISÃO CRÍTICA",
        pergunta: "És um dos últimos jogadores vivos da equipa.",
        descricao: "A pressão aumenta. Informação e paciência valem mais do que uma jogada impulsiva.",
        opcoes: [
            {
                texto: "Parar, ouvir e analisar as informações disponíveis.",
                vida: 5, equipa: 5, pontos: 160,
                resultado: "Boa disciplina. Recolher informação antes de agir pode evitar um erro desnecessário."
            },
            {
                texto: "Correr para o confronto sem avaliar a situação.",
                vida: -35, equipa: -15, pontos: 0,
                resultado: "Entraste sem preparar a jogada. A comissão quer saber onde ficou o plano."
            },
            {
                texto: "Comunicar a situação e combinar uma jogada com o colega.",
                vida: 0, equipa: 15, pontos: 180,
                resultado: "Excelente trabalho de equipa. Uma decisão coordenada aumenta as opções de resposta."
            }
        ]
    },
    {
        etiqueta: "RONDA 05 // A BOMBA ESTÁ EM JOGO",
        pergunta: "A situação da bomba exige uma decisão rápida.",
        descricao: "Tens de considerar o tempo, a posição dos colegas e a informação disponível.",
        opcoes: [
            {
                texto: "Confirmar a situação e coordenar com os colegas.",
                vida: 0, equipa: 15, pontos: 200,
                resultado: "Boa prioridade! A equipa partilha informação e decide com base na situação."
            },
            {
                texto: "Ignorar a equipa e seguir a tua própria ideia.",
                vida: -20, equipa: -25, pontos: 0,
                resultado: "A falta de comunicação complicou a situação. A comissão suspende temporariamente o teu cargo de líder."
            },
            {
                texto: "Esperar sem observar o que está a acontecer.",
                vida: -10, equipa: -10, pontos: 20,
                resultado: "A cautela sem informação tornou-se hesitação. Esperar também exige saber o que estás a avaliar."
            }
        ]
    },
    {
        etiqueta: "RONDA 06 // ÚLTIMA OPORTUNIDADE",
        pergunta: "Última situação. A equipa depende da tua decisão.",
        descricao: "Tudo o que aprendeste está em jogo. Escolhe com cabeça e não com o ego.",
        opcoes: [
            {
                texto: "Comunicar, avaliar o risco e coordenar a jogada final.",
                vida: 0, equipa: 10, pontos: 250,
                resultado: "Decisão madura! A equipa sabe o que se passa e pode agir em conjunto."
            },
            {
                texto: "Fazer uma jogada individual sem dar informação.",
                vida: -30, equipa: -20, pontos: 0,
                resultado: "A confiança era enorme. A coordenação, infelizmente, não apareceu."
            },
            {
                texto: "Mudar de plano várias vezes sem explicar nada.",
                vida: -10, equipa: -25, pontos: 10,
                resultado: "A equipa já não sabe qual é o plano. Nem o próprio comandante parece saber."
            }
        ]
    }
];

let jogoEstado = {
    ronda: 0,
    vida: 100,
    equipa: 100,
    pontos: 0,
    terminou: false,
    escolhaFeita: false
};

const jogoVida = document.querySelector("#jogo-vida");
const jogoEquipa = document.querySelector("#jogo-equipa");
const jogoPontos = document.querySelector("#jogo-pontos");
const jogoRonda = document.querySelector("#jogo-ronda");
const jogoVidaTexto = document.querySelector("#jogo-vida-texto");
const jogoEquipaTexto = document.querySelector("#jogo-equipa-texto");
const jogoVidaBarra = document.querySelector("#jogo-vida-barra");
const jogoEquipaBarra = document.querySelector("#jogo-equipa-barra");
const jogoEtiqueta = document.querySelector("#jogo-etiqueta");
const jogoPergunta = document.querySelector("#jogo-pergunta");
const jogoDescricao = document.querySelector("#jogo-descricao");
const jogoOpcoes = document.querySelector("#jogo-opcoes");
const jogoFeedback = document.querySelector("#jogo-feedback");
const jogoContinuar = document.querySelector("#jogo-continuar");
const jogoReiniciar = document.querySelector("#jogo-reiniciar");

function limitarValor(valor, minimo, maximo) {
    return Math.max(minimo, Math.min(maximo, valor));
}

function atualizarPainelJogo() {
    if (jogoVida) jogoVida.textContent = jogoEstado.vida;
    if (jogoEquipa) jogoEquipa.textContent = jogoEstado.equipa;
    if (jogoPontos) jogoPontos.textContent = jogoEstado.pontos;

    if (jogoRonda) {
        const numeroRonda = Math.min(jogoEstado.ronda + 1, rondas.length);
        jogoRonda.textContent = numeroRonda + " / " + rondas.length;
    }

    if (jogoVidaTexto) jogoVidaTexto.textContent = jogoEstado.vida + "%";
    if (jogoEquipaTexto) jogoEquipaTexto.textContent = jogoEstado.equipa + "%";

    if (jogoVidaBarra) {
        jogoVidaBarra.style.width = jogoEstado.vida + "%";
    }

    if (jogoEquipaBarra) {
        jogoEquipaBarra.style.width = jogoEstado.equipa + "%";
    }
}

function mostrarRonda() {
    if (jogoEstado.terminou) return;

    const ronda = rondas[jogoEstado.ronda];

    if (!ronda) {
        terminarJogo(true);
        return;
    }

    jogoEstado.escolhaFeita = false;

    jogoEtiqueta.textContent = ronda.etiqueta;
    jogoPergunta.textContent = ronda.pergunta;
    jogoDescricao.textContent = ronda.descricao;

    jogoFeedback.className = "jogo-feedback";
    jogoFeedback.innerHTML =
        "<strong>SITUAÇÃO EM ANÁLISE</strong><p>Escolhe uma opção. Não há botão para culpar o lag.</p>";

    jogoOpcoes.innerHTML = "";

    ronda.opcoes.forEach(function (opcao, indice) {
        const botao = document.createElement("button");

        botao.type = "button";
        botao.className = "jogo-opcao";
        botao.textContent = String.fromCharCode(65 + indice) + " — " + opcao.texto;

        botao.addEventListener("click", function () {
            escolherOpcao(indice);
        });

        jogoOpcoes.appendChild(botao);
    });

    jogoContinuar.disabled = true;
    jogoContinuar.textContent = "PRÓXIMA SITUAÇÃO";

    atualizarPainelJogo();
}

function escolherOpcao(indice) {
    if (jogoEstado.terminou || jogoEstado.escolhaFeita) return;

    const ronda = rondas[jogoEstado.ronda];
    const opcao = ronda.opcoes[indice];

    if (!opcao) return;

    jogoEstado.escolhaFeita = true;

    jogoEstado.vida = limitarValor(
        jogoEstado.vida + opcao.vida, 0, 100
    );

    jogoEstado.equipa = limitarValor(
        jogoEstado.equipa + opcao.equipa, 0, 100
    );

    jogoEstado.pontos += opcao.pontos;

    const botoes = jogoOpcoes.querySelectorAll("button");

    botoes.forEach(function (botao, botaoIndice) {
        botao.disabled = true;

        if (botaoIndice === indice) {
            botao.classList.add("jogo-opcao-escolhida");
        }
    });

    jogoFeedback.className = "jogo-feedback jogo-feedback-resultado";
    jogoFeedback.innerHTML = "";

    const titulo = document.createElement("strong");
    titulo.textContent = "RELATÓRIO DA DECISÃO";

    const texto = document.createElement("p");
    texto.textContent = opcao.resultado;

    const ganho = document.createElement("span");
    ganho.className = "jogo-ganho";
    ganho.textContent = "+" + opcao.pontos + " pontos";

    jogoFeedback.append(titulo, texto, ganho);

    atualizarPainelJogo();

    if (jogoEstado.vida <= 0 || jogoEstado.equipa <= 0) {
        jogoContinuar.disabled = false;
        jogoContinuar.textContent = "VER RESULTADO FINAL";
        return;
    }

    if (jogoEstado.ronda === rondas.length - 1) {
        jogoContinuar.disabled = false;
        jogoContinuar.textContent = "VER RESULTADO FINAL";
    } else {
        jogoContinuar.disabled = false;
        jogoContinuar.textContent = "AVANÇAR PARA A PRÓXIMA RONDA";
    }
}

function terminarJogo(sobreviveu) {
    jogoEstado.terminou = true;

    let titulo;
    let mensagem;

    if (!sobreviveu) {
        titulo = "BOT ELIMINADO 💀";
        mensagem = "A operação terminou antes do previsto. A comissão recomenda rever as decisões táticas.";
    } else if (jogoEstado.pontos >= 850 && jogoEstado.vida >= 50 && jogoEstado.equipa >= 50) {
        titulo = "LENDÁRIO TÁTICO 👑";
        mensagem = "Decisões fortes, equipa apoiada e boa gestão do risco. Afinal, havia um cérebro por detrás do nickname!";
    } else if (jogoEstado.pontos >= 600) {
        titulo = "AGENTE DE ELITE 🎯";
        mensagem = "Bom desempenho! Ainda há decisões a melhorar, mas a equipa pode voltar a confiar em ti.";
    } else if (jogoEstado.pontos >= 350) {
        titulo = "SOBREVIVENTE POR ACASO 🤖";
        mensagem = "Chegaste ao fim, mas a comissão continua a investigar alguns momentos preocupantes.";
    } else {
        titulo = "BOT COM LICENÇA PARA FALHAR 😭";
        mensagem = "Sobreviveste à avaliação, mas não convenceste ninguém. O treino continua.";
    }

    jogoEtiqueta.textContent = "OPERAÇÃO TERMINADA";
    jogoPergunta.textContent = titulo;
    jogoDescricao.textContent = mensagem;

    jogoOpcoes.innerHTML = "";

    const resumo = document.createElement("div");
    resumo.className = "jogo-resumo";

    const linhaPontos = document.createElement("p");
    linhaPontos.textContent = "Pontuação final: " + jogoEstado.pontos + " pontos";

    const linhaVida = document.createElement("p");
    linhaVida.textContent = "Vida restante: " + jogoEstado.vida + "%";

    const linhaEquipa = document.createElement("p");
    linhaEquipa.textContent = "Moral da equipa: " + jogoEstado.equipa + "%";

    resumo.append(linhaPontos, linhaVida, linhaEquipa);
    jogoOpcoes.appendChild(resumo);

    jogoFeedback.className = "jogo-feedback jogo-feedback-final";
    jogoFeedback.innerHTML =
        "<strong>VEREDICTO DA COMISSÃO</strong><p>" +
        (sobreviveu
            ? "A operação chegou ao fim. A avaliação está concluída."
            : "A operação falhou. A equipa vai recordar esta ronda durante muito tempo.") +
        "</p>";

    jogoContinuar.disabled = true;
    jogoContinuar.textContent = "OPERAÇÃO CONCLUÍDA";

    atualizarPainelJogo();
}

if (jogoOpcoes && jogoContinuar && jogoReiniciar) {
    mostrarRonda();

    jogoContinuar.addEventListener("click", function () {
        if (!jogoEstado.escolhaFeita || jogoEstado.terminou) return;

        if (jogoEstado.vida <= 0 || jogoEstado.equipa <= 0) {
            terminarJogo(false);
            return;
        }

        if (jogoEstado.ronda === rondas.length - 1) {
            terminarJogo(true);
            return;
        }

        jogoEstado.ronda++;
        mostrarRonda();
    });

    jogoReiniciar.addEventListener("click", function () {
        jogoEstado = {
            ronda: 0,
            vida: 100,
            equipa: 100,
            pontos: 0,
            terminou: false,
            escolhaFeita: false
        };

        mostrarRonda();
    });
}


/* 7. INICIALIZAR O SITE */

atualizarMissoes();

/* =====================================
   TRIBUNAL DO JIBA_PEEK ⚖️
===================================== */

const acusacoesJiba = [
    {
        acusacao: "CRIME Nº 001 — Abandono da pontaria",
        prova: "As câmaras registaram 14 tiros e zero preocupações com o alvo.",
        sentenca: "Condenado a 3 partidas a treinar contra paredes. Sem direito a reclamar!"
    },
    {
        acusacao: "CRIME Nº 002 — Mira em horário de almoço",
        prova: "O suspeito disparou para todos os lados, menos para o inimigo.",
        sentenca: "Condenado a pedir desculpa ao rato do computador."
    },
    {
        acusacao: "CRIME Nº 003 — Excesso de confiança",
        prova: "Disse 'deixem comigo' e foi o primeiro a desaparecer do mapa.",
        sentenca: "Condenado a jogar a próxima ronda em silêncio absoluto."
    },
    {
        acusacao: "CRIME Nº 004 — Comunicação enganosa",
        prova: "O suspeito gritou 'está low!' sem apresentar qualquer prova científica.",
        sentenca: "Condenado a apresentar análises laboratoriais de cada inimigo."
    },
    {
        acusacao: "CRIME Nº 005 — Uso abusivo da desculpa do lag",
        prova: "A ligação estava perfeita. A desculpa chegou antes do primeiro tiro.",
        sentenca: "Condenado a 24 horas sem pronunciar a palavra 'lag'."
    },
    {
        acusacao: "CRIME Nº 006 — Desaparecimento em combate",
        prova: "A equipa procurou o suspeito. Encontrou apenas os seus passos.",
        sentenca: "Condenado a ser o primeiro a entrar no bombsite durante 5 rondas."
    },
    {
        acusacao: "CRIME Nº 007 — Teclado sob investigação",
        prova: "O suspeito mexeu-se tanto que até o teclado pediu férias.",
        sentenca: "Condenado a jogar uma ronda com a dignidade em modo espectador."
    },
    {
        acusacao: "CRIME Nº 008 — Falso especialista",
        prova: "Deu conselhos a toda a equipa. O resultado foi uma derrota coletiva.",
        sentenca: "Condenado a deixar os colegas jogar sem comentários durante uma partida."
    }
];

const julgarBtn = document.getElementById("julgarBtn");
const acusacaoElemento = document.getElementById("acusacao");
const provaElemento = document.getElementById("prova");
const sentencaElemento = document.getElementById("sentenca");
const copiarSentencaBtn = document.getElementById("copiarSentenca");

let ultimaSentenca = "";

if (julgarBtn && acusacaoElemento && provaElemento && sentencaElemento) {
    julgarBtn.addEventListener("click", function () {
        let caso;

        do {
            caso = acusacoesJiba[
                Math.floor(Math.random() * acusacoesJiba.length)
            ];
        } while (
            acusacoesJiba.length > 1 &&
            caso.sentenca === ultimaSentenca
        );

        ultimaSentenca = caso.sentenca;

        acusacaoElemento.textContent = caso.acusacao;
        provaElemento.textContent = "🔎 PROVA: " + caso.prova;
        sentencaElemento.textContent = "⚖️ SENTENÇA: " + caso.sentenca;

        sentencaElemento.classList.remove("sentenca-animada");
        void sentencaElemento.offsetWidth;
        sentencaElemento.classList.add("sentenca-animada");

        if (copiarSentencaBtn) {
            copiarSentencaBtn.hidden = false;
        }
    });
}

if (copiarSentencaBtn && sentencaElemento) {
    copiarSentencaBtn.addEventListener("click", async function () {
        const texto = [
            "⚖️ TRIBUNAL DO JIBA_PEEK",
            acusacaoElemento.textContent,
            provaElemento.textContent,
            sentencaElemento.textContent
        ].join("\n");

        try {
            await navigator.clipboard.writeText(texto);
            copiarSentencaBtn.textContent = "✅ SENTENÇA COPIADA!";
        } catch (erro) {
            window.prompt("Copia a sentença:", texto);
        }

        setTimeout(function () {
            copiarSentencaBtn.textContent = "📋 COPIAR SENTENÇA";
        }, 2000);
    });
}

/* =====================================
   INVESTIGAÇÃO DO JIBA_PEEK
===================================== */

const investigarJiba = document.getElementById("investigarJiba");
const trocarRecompensa = document.getElementById("trocarRecompensa");
const resultadoInvestigacao = document.getElementById("resultadoInvestigacao");
const recompensaJiba = document.getElementById("recompensaJiba");
const estadoJiba = document.getElementById("estadoJiba");

const provasJiba = [
    "🚨 TESTEMUNHA: O suspeito disse «está low» e depois descobriu-se que o inimigo tinha a vida toda.",
    "🔎 PROVA A: Foram encontrados 37 disparos contra uma parede. A parede não apresentou queixa.",
    "📹 CÂMARAS: O suspeito entrou no bombsite com confiança e saiu em modo espectador.",
    "🧪 ANÁLISE TÉCNICA: A mira está operacional. O problema continua sob investigação.",
    "📞 DENÚNCIA: Um colega afirma que o suspeito disse «deixem comigo». A ronda terminou imediatamente.",
    "⚠️ ALERTA: Foram detetados movimentos suspeitos entre o teclado e a cadeira.",
    "📁 NOVA PROVA: O suspeito culpou o lag antes de verificar a ligação à Internet.",
    "👀 TESTEMUNHA OCULAR: O suspeito viu o inimigo. O inimigo também o viu. O resto é história."
];

const recompensasJiba = [
    "🌯 1 KEBAB",
    "🥤 1 SUMO E UM PEDIDO DE DESCULPAS",
    "🍕 1 FATIA DE PIZZA",
    "🪙 3 MOEDAS DO SOFÁ",
    "🎮 1 RATO NOVO (SÓ DEPOIS DO TREINO)",
    "🏆 UM TROFÉU DE PARTICIPAÇÃO",
    "🍪 2 BOLACHAS E UMA NOVA OPORTUNIDADE",
    "💸 0,01 € E MUITA DESILUSÃO"
];

let ultimaProvaJiba = -1;
let ultimaRecompensaJiba = -1;

if (investigarJiba && resultadoInvestigacao && estadoJiba) {
    investigarJiba.addEventListener("click", function () {
        let indice;

        do {
            indice = Math.floor(Math.random() * provasJiba.length);
        } while (
            provasJiba.length > 1 &&
            indice === ultimaProvaJiba
        );

        ultimaProvaJiba = indice;

        const estados = [
            "ESTADO: SUSPEITO SOB VIGILÂNCIA 👀",
            "ESTADO: NÍVEL DE VERGONHA ELEVADO 🚨",
            "ESTADO: A EQUIPA EXIGE EXPLICAÇÕES 📢",
            "ESTADO: PONTARIA AINDA NÃO LOCALIZADA 🔎"
        ];

        const estadoAleatorio =
            estados[Math.floor(Math.random() * estados.length)];

        resultadoInvestigacao.textContent = provasJiba[indice];
        estadoJiba.textContent = estadoAleatorio;

        resultadoInvestigacao.animate(
            [
                { opacity: 0, transform: "translateY(8px)" },
                { opacity: 1, transform: "translateY(0)" }
            ],
            { duration: 350 }
        );
    });
}

if (trocarRecompensa && recompensaJiba) {
    trocarRecompensa.addEventListener("click", function () {
        let indice;

        do {
            indice = Math.floor(Math.random() * recompensasJiba.length);
        } while (
            recompensasJiba.length > 1 &&
            indice === ultimaRecompensaJiba
        );

        ultimaRecompensaJiba = indice;
        recompensaJiba.textContent = recompensasJiba[indice];
    });
}

/* ===== MUSEU DOS DESASTRES: MVP DOS INIMIGOS ===== */

const botaoPremioJiba = document.getElementById("botaoPremioJiba");
const botaoDiplomaJiba = document.getElementById("botaoDiplomaJiba");
const diplomaJiba = document.getElementById("diplomaJiba");
const frasePremioJiba = document.getElementById("frasePremioJiba");
const estrelasJiba = document.getElementById("estrelasJiba");
const classificacaoJiba = document.getElementById("classificacaoJiba");
const botaoFecharDiploma = document.getElementById("botaoFecharDiploma");

const frasesPremioJiba = [
    "Pela dedicação exemplar em tornar as rondas mais fáceis... para os adversários.",
    "Por transformar cada vantagem numa oportunidade para a equipa inimiga.",
    "Pela pontaria tão misteriosa que nem os próprios colegas a conseguem explicar.",
    "Por fazer os adversários parecerem profissionais sem eles precisarem de treinar.",
    "Pela consistência impressionante em criar momentos que a equipa nunca esquecerá."
];

botaoPremioJiba.addEventListener("click", function () {

    // Escolher uma frase aleatória
    const indiceAleatorio = Math.floor(Math.random() * frasesPremioJiba.length);
    frasePremioJiba.textContent = frasesPremioJiba[indiceAleatorio];

    // Gerar uma classificação entre 1 e 5 estrelas
    const numeroEstrelas = Math.floor(Math.random() * 5) + 1;
    estrelasJiba.textContent = "★ ".repeat(numeroEstrelas).trim();

    // Atualizar a classificação
    if (numeroEstrelas <= 2) {
        classificacaoJiba.textContent = "NÍVEL DE DESASTRE: EM TREINO";
    } else if (numeroEstrelas <= 4) {
        classificacaoJiba.textContent = "NÍVEL DE DESASTRE: PROFISSIONAL";
    } else {
        classificacaoJiba.textContent = "NÍVEL DE DESASTRE: LENDA DOS INIMIGOS";
    }

    // Mostrar o botão do diploma
    botaoDiplomaJiba.hidden = false;

    // Esconder o diploma antigo, se estiver aberto
    diplomaJiba.hidden = true;

});

botaoDiplomaJiba.addEventListener("click", function () {
    diplomaJiba.hidden = false;

    // Levar o diploma para a zona visível do ecrã
    diplomaJiba.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
});

botaoFecharDiploma.addEventListener("click", function () {
    diplomaJiba.hidden = true;
});

/* ===== SOBREVIVE AO JIBA: MOTOR DO JOGO ===== */

const tituloMissaoJiba = document.getElementById("tituloMissaoJiba");
const textoMissaoJiba = document.getElementById("textoMissaoJiba");
const opcoesJiba = document.getElementById("opcoesJiba");
const resultadoJiba = document.getElementById("resultadoJiba");
const mensagemResultadoJiba = document.getElementById("mensagemResultadoJiba");
const continuarJiba = document.getElementById("continuarJiba");
const fimJiba = document.getElementById("fimJiba");
const tituloFinalJiba = document.getElementById("tituloFinalJiba");
const textoFinalJiba = document.getElementById("textoFinalJiba");
const reiniciarJiba = document.getElementById("reiniciarJiba");
const rondaJiba = document.getElementById("rondaJiba");
const pontosJiba = document.getElementById("pontosJiba");

const missoesJiba = [
    {
        titulo: "Ronda 1 — O plano misterioso",
        texto: "O Jiba diz que tem um plano genial, mas não explica qual. O que fazes?",
        opcoes: [
            {
                texto: "🛡️ Ficar numa posição segura",
                pontos: 2,
                resultado: "Boa decisão! Ficas protegido. O Jiba pergunta porque é que não foste atrás dele."
            },
            {
                texto: "🏃 Seguir o Jiba",
                pontos: -1,
                resultado: "O Jiba muda de direção três vezes. Acabam os dois perdidos. Excelente trabalho de equipa... aparentemente."
            },
            {
                texto: "👀 Perguntar qual é o plano",
                pontos: 3,
                resultado: "O Jiba responde: 'Logo se vê'. Pelo menos tentaste obter informação."
            }
        ]
    },
    {
        titulo: "Ronda 2 — O inimigo apareceu",
        texto: "A equipa adversária apareceu. O Jiba diz que controla a situação. Confias nele?",
        opcoes: [
            {
                texto: "🎯 Manter a calma e observar",
                pontos: 3,
                resultado: "Boa leitura da situação! Deixas o Jiba falar enquanto tentas perceber o que se passa."
            },
            {
                texto: "🤝 Ir salvar o Jiba",
                pontos: 1,
                resultado: "És uma pessoa leal. Infelizmente, o Jiba já estava a inventar uma desculpa."
            },
            {
                texto: "📢 Perguntar se ele precisa de ajuda",
                pontos: 2,
                resultado: "O Jiba diz que não. Cinco segundos depois, pergunta onde estás."
            }
        ]
    },
    {
        titulo: "Ronda 3 — A decisão final",
        texto: "A ronda está quase a acabar. O Jiba anuncia: 'Deixa comigo!'. Qual é a tua última decisão?",
        opcoes: [
            {
                texto: "🧠 Confiar na tua própria estratégia",
                pontos: 3,
                resultado: "Escolheste pensar pela tua cabeça. Uma decisão rara e preciosa nesta equipa."
            },
            {
                texto: "🍀 Confiar na sorte do Jiba",
                pontos: -2,
                resultado: "A sorte foi chamada, mas recusou a chamada. O Jiba diz que foi lag."
            },
            {
                texto: "👀 Preparar um plano B",
                pontos: 2,
                resultado: "Prevenção é tudo! Com o Jiba, ter um plano B é praticamente obrigatório."
            }
        ]
    }
];

let rondaAtualJiba = 0;
let pontuacaoJiba = 0;

function atualizarEstadoJiba() {
    rondaJiba.textContent = "RONDA " + (rondaAtualJiba + 1);
    pontosJiba.textContent = "SOBREVIVÊNCIA: " + pontuacaoJiba;
}

function mostrarMissaoJiba() {
    const missao = missoesJiba[rondaAtualJiba];

    tituloMissaoJiba.textContent = missao.titulo;
    textoMissaoJiba.textContent = missao.texto;

    opcoesJiba.innerHTML = "";

    missao.opcoes.forEach(function (opcao, indice) {
        const botao = document.createElement("button");

        botao.type = "button";
        botao.className = "opcao-jiba";
        botao.textContent = opcao.texto;

        botao.addEventListener("click", function () {
            escolherOpcaoJiba(indice);
        });

        opcoesJiba.appendChild(botao);
    });

    resultadoJiba.hidden = true;
    fimJiba.hidden = true;
    opcoesJiba.hidden = false;

    atualizarEstadoJiba();
}

function escolherOpcaoJiba(indice) {
    const missao = missoesJiba[rondaAtualJiba];
    const opcao = missao.opcoes[indice];

    pontuacaoJiba += opcao.pontos;

    mensagemResultadoJiba.textContent =
        opcao.resultado + " Pontos nesta escolha: " + opcao.pontos + ".";

    opcoesJiba.hidden = true;
    resultadoJiba.hidden = false;

    atualizarEstadoJiba();

    if (rondaAtualJiba === missoesJiba.length - 1) {
        continuarJiba.textContent = "🏁 VER RESULTADO FINAL";
    } else {
        continuarJiba.textContent = "➡️ PRÓXIMA RONDA";
    }
}

continuarJiba.addEventListener("click", function () {
    if (rondaAtualJiba < missoesJiba.length - 1) {
        rondaAtualJiba++;
        mostrarMissaoJiba();
    } else {
        terminarJogoJiba();
    }
});

function terminarJogoJiba() {
    resultadoJiba.hidden = true;
    opcoesJiba.hidden = true;
    fimJiba.hidden = false;

    rondaJiba.textContent = "MISSÃO CONCLUÍDA";
    pontosJiba.textContent = "TOTAL: " + pontuacaoJiba;

    if (pontuacaoJiba >= 7) {
        tituloFinalJiba.textContent = "🏆 SOBREVIVENTE LENDÁRIO";
        textoFinalJiba.textContent =
            "Sobreviveste a três rondas com o Jiba! Tens reflexos, estratégia e uma paciência fora do normal.";
    } else if (pontuacaoJiba >= 3) {
        tituloFinalJiba.textContent = "😅 SOBREVIVENTE POR ACASO";
        textoFinalJiba.textContent =
            "Conseguiste chegar ao fim! Houve momentos duvidosos, mas a equipa ainda tem esperança.";
    } else {
        tituloFinalJiba.textContent = "💀 VÍTIMA DO PLANO DO JIBA";
        textoFinalJiba.textContent =
            "A missão foi um desastre. O Jiba já está a escrever uma desculpa e a culpar o lag.";
    }
}

reiniciarJiba.addEventListener("click", function () {
    rondaAtualJiba = 0;
    pontuacaoJiba = 0;
    mostrarMissaoJiba();
});

mostrarMissaoJiba();

/* ===== CENTRAL DE COMUNICAÇÕES DO JIBA ===== */

const tituloModoJiba = document.getElementById("tituloModoJiba");
const fraseRadioJiba = document.getElementById("fraseRadioJiba");
const estadoRadioJiba = document.getElementById("estadoRadioJiba");

const botaoTransmitirJiba = document.getElementById("botaoTransmitirJiba");
const botaoPararJiba = document.getElementById("botaoPararJiba");

const botoesModoRadio = document.querySelectorAll(".modo-radio");

let modoAtualJiba = null;

const comunicacoesJiba = {
    toxico: {
        titulo: "🤬 MODO TÓXICO",
        frases: [
            "MAS TU ÉS CEGO OU QUÊ?!",
            "A EQUIPA NÃO FAZ NADA!",
            "COMO É QUE CONSEGUISTE FALHAR ISSO?!",
            "ALGUÉM NESTA EQUIPA SABE JOGAR?!",
            "EU ESTOU A CARREGAR ESTA EQUIPA TODA!",
            "ONDE É QUE VOCÊS ESTÃO?!"
        ]
    },

    diana: {
        titulo: "👩 MODO DIANA",
        frases: [
            "DIANA, PERDEMOS POR TUA CAUSA!",
            "SE A DIANA NÃO ESTIVESSE NA EQUIPA, GANHÁVAMOS!",
            "DIANA, EXPLICA-ME COMO É QUE CONSEGUISTE ESTRAGAR TUDO!",
            "EU JOGUEI BEM! A CULPA É DA DIANA!",
            "DIANA, ATÉ QUANDO É QUE VOU TER DE TE ATURAR?!",
            "PERDEMOS OUTRA VEZ... DIANA, QUERO EXPLICAÇÕES!",
            "NÃO FUI EU! FOI A DIANA! CASO ENCERRADO!"
        ]
    },

    desculpas: {
        titulo: "🛜 MODO DESCULPAS",
        frases: [
            "FOI LAG, JURO!",
            "O MEU RATO NÃO ESTÁ A FUNCIONAR!",
            "A MIRA ESTAVA COM VIDA PRÓPRIA!",
            "EU TINHA-O! O JOGO É QUE NÃO QUIS!",
            "O SERVIDOR ESTÁ CONTRA MIM!",
            "NÃO CONTA! EU ESTAVA DISTRAÍDO!",
            "O MEU TECLADO FALHOU NO MOMENTO MAIS IMPORTANTE!"
        ]
    },

    contraditorio: {
        titulo: "👑 MODO CONTRADITÓRIO",
        frases: [
            "EU SOU O MELHOR JOGADOR DESTE LOBBY!",
            "ALGUÉM ME AJUDA! ESTÃO TODOS EM CIMA DE MIM!",
            "EU NÃO PRECISO DE AJUDA DE NINGUÉM!",
            "ONDE É QUE ESTÁ A MINHA EQUIPA?!",
            "EU CARREGO ISTO TUDO! ... ALGUÉM ME REVIVA!",
            "ESTA RONDA ESTAVA GANHA! COMO É QUE PERDEMOS?!",
            "CONFIA EM MIM! ... OK, SE CALHAR NÃO."
        ]
    }
};

// Escolher um modo
botoesModoRadio.forEach(function (botao) {

    botao.addEventListener("click", function () {

        // Parar uma comunicação anterior
        if ("speechSynthesis" in window) {
            window.speechSynthesis.cancel();
        }

        // Retirar o destaque dos outros modos
        botoesModoRadio.forEach(function (outroBotao) {
            outroBotao.classList.remove("ativo");
        });

        // Destacar o modo escolhido
        botao.classList.add("ativo");

        // Guardar o modo selecionado
        modoAtualJiba = botao.dataset.modo;

        // Atualizar o painel
        tituloModoJiba.textContent =
            comunicacoesJiba[modoAtualJiba].titulo;

        fraseRadioJiba.textContent =
            "Canal selecionado! Carrega em TRANSMITIR FRASE.";

        estadoRadioJiba.textContent =
            "CANAL ATIVO · " + modoAtualJiba.toUpperCase();

    });

});

// Transmitir uma frase aleatória
botaoTransmitirJiba.addEventListener("click", function () {

    if (!modoAtualJiba) {
        tituloModoJiba.textContent = "⚠️ NENHUM CANAL SELECIONADO";
        fraseRadioJiba.textContent =
            "Escolhe primeiro um dos quatro modos de comunicação.";

        estadoRadioJiba.textContent = "À ESPERA DE UM CANAL";
        return;
    }

    const canal = comunicacoesJiba[modoAtualJiba];

    const indice = Math.floor(Math.random() * canal.frases.length);

    const frase = canal.frases[indice];

    fraseRadioJiba.textContent = "“" + frase + "”";

    estadoRadioJiba.textContent =
        "A TRANSMITIR · " + canal.titulo.toUpperCase();

    // Ler a frase em voz alta, se o navegador suportar
    if ("speechSynthesis" in window) {

        window.speechSynthesis.cancel();

        const mensagem = new SpeechSynthesisUtterance(frase);

        mensagem.lang = "pt-PT";
        mensagem.rate = 1;
        mensagem.pitch = 1;

        mensagem.onend = function () {
            estadoRadioJiba.textContent =
                "TRANSMISSÃO TERMINADA · O JIBA VOLTOU AO SILÊNCIO";
        };

        mensagem.onerror = function () {
            estadoRadioJiba.textContent =
                "FRASE MOSTRADA · VOZ INDISPONÍVEL";
        };

        window.speechSynthesis.speak(mensagem);

    } else {

        estadoRadioJiba.textContent =
            "FRASE MOSTRADA · ESTE NAVEGADOR NÃO SUPORTA VOZ";
    }

});

// Botão para interromper a voz
botaoPararJiba.addEventListener("click", function () {

    if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
    }

    estadoRadioJiba.textContent =
        "🔇 SILÊNCIO TOTAL · O JIBA FOI COLOCADO EM MUTE";

});

// Mensagem inicial
estadoRadioJiba.textContent =
    "SISTEMA PRONTO · À ESPERA DE COMUNICAÇÕES";

/* =====================================
   REGISTO CRIMINAL DO JIBA
===================================== */

const chaveRegistoJiba = "theLastBotAlive_registoJiba";
const chaveHistoricoJiba = "theLastBotAlive_historicoJiba";

let historicoJiba = [];

const tiposOcorrenciaJiba = {
    reclamacoes: {
        icone: "🤬",
        titulo: "Reclamação contra a equipa",
        descricao: "O suspeito voltou a reclamar com os colegas."
    },
    diana: {
        icone: "👩",
        titulo: "Acusação contra a Diana",
        descricao: "O suspeito perdeu e decidiu responsabilizar a Diana."
    },
    lag: {
        icone: "🛜",
        titulo: "Desculpa técnica apresentada",
        descricao: "O suspeito alega que o lag foi responsável pela derrota."
    }
};

let registoJiba = {
    reclamacoes: 0,
    diana: 0,
    lag: 0
};

function guardarRegistoJiba() {
    try {
        localStorage.setItem(
            chaveRegistoJiba,
            JSON.stringify(registoJiba)
        );
    } catch (erro) {
        console.warn("Não foi possível guardar o registo.", erro);
    }
}

function guardarHistoricoJiba() {
    try {
        localStorage.setItem(
            chaveHistoricoJiba,
            JSON.stringify(historicoJiba)
        );
    } catch (erro) {
        console.warn("Não foi possível guardar o histórico.", erro);
    }
}

function carregarRegistoJiba() {
    try {
        const dados = JSON.parse(
            localStorage.getItem(chaveRegistoJiba) || "{}"
        );

        registoJiba = {
            reclamacoes: Math.max(0, Number(dados.reclamacoes) || 0),
            diana: Math.max(0, Number(dados.diana) || 0),
            lag: Math.max(0, Number(dados.lag) || 0)
        };

        const historico = JSON.parse(
            localStorage.getItem(chaveHistoricoJiba) || "[]"
        );

        historicoJiba = Array.isArray(historico)
            ? historico.filter(function (ocorrencia) {
                return (
                    ocorrencia &&
                    tiposOcorrenciaJiba[ocorrencia.tipo] &&
                    typeof ocorrencia.data === "string"
                );
            })
            : [];
    } catch (erro) {
        console.warn("Erro ao carregar os registos.", erro);
    }

    atualizarRegistoJiba();
    atualizarHistoricoJiba();
}

function adicionarCrimeJiba(tipo) {
    if (!Object.prototype.hasOwnProperty.call(registoJiba, tipo)) {
        return;
    }

    registoJiba[tipo]++;

    historicoJiba.unshift({
        tipo: tipo,
        data: new Date().toISOString()
    });

    guardarRegistoJiba();
    guardarHistoricoJiba();

    atualizarRegistoJiba();
    atualizarHistoricoJiba();
}

function atualizarRegistoJiba() {
    const reclamacoes = document.getElementById("registo-reclamacoes");
    const diana = document.getElementById("registo-diana");
    const lag = document.getElementById("registo-lag");
    const totalElemento = document.getElementById("registo-total");
    const titulo = document.getElementById("registo-titulo");
    const mensagem = document.getElementById("registo-mensagem");

    if (reclamacoes) reclamacoes.textContent = registoJiba.reclamacoes;
    if (diana) diana.textContent = registoJiba.diana;
    if (lag) lag.textContent = registoJiba.lag;

    const total =
        registoJiba.reclamacoes +
        registoJiba.diana +
        registoJiba.lag;

    if (totalElemento) totalElemento.textContent = total;

    if (!titulo || !mensagem) return;

    if (total === 0) {
        titulo.textContent = "Ainda está sob investigação...";
        mensagem.textContent =
            "O primeiro incidente está prestes a acontecer.";
    } else if (total <= 3) {
        titulo.textContent = "Suspeito em Observação 👀";
        mensagem.textContent =
            "Já existem provas, mas o Jiba ainda se declara inocente.";
    } else if (total <= 7) {
        titulo.textContent = "Suspeito Habitual 🤨";
        mensagem.textContent =
            "O tribunal recomenda menos desculpas e mais pontaria.";
    } else if (total <= 15) {
        titulo.textContent = "Inimigo Público do Lobby 🚨";
        mensagem.textContent =
            "A equipa já não sabe se joga CS2 ou se está numa reunião de reclamações.";
    } else {
        titulo.textContent = "Lenda Criminal do CS2 🏆";
        mensagem.textContent =
            "Recorde histórico! A Diana foi considerada inocente por falta de paciência do júri.";
    }
}

function atualizarHistoricoJiba() {
    const lista = document.getElementById("historico-lista-jiba");
    const totalElemento = document.getElementById("historico-total-jiba");

    if (totalElemento) {
        totalElemento.textContent = historicoJiba.length;
    }

    if (!lista) return;

    lista.replaceChildren();

    if (historicoJiba.length === 0) {
        const vazio = document.createElement("p");
        vazio.textContent = "Ainda não existem ocorrências registadas.";
        lista.appendChild(vazio);
        return;
    }

    historicoJiba.forEach(function (ocorrencia) {
        const tipo = tiposOcorrenciaJiba[ocorrencia.tipo];
        const item = document.createElement("article");
        const titulo = document.createElement("h4");
        const descricao = document.createElement("p");
        const data = document.createElement("small");

        titulo.textContent = tipo.icone + " " + tipo.titulo;
        descricao.textContent = tipo.descricao;

        const dataOcorrencia = new Date(ocorrencia.data);

        data.textContent = Number.isNaN(dataOcorrencia.getTime())
            ? "Data desconhecida"
            : dataOcorrencia.toLocaleString("pt-PT");

        item.append(titulo, descricao, data);
        lista.appendChild(item);
    });
}

function limparRegistoJiba() {
    const confirmar = window.confirm(
        "Tens a certeza de que queres apagar todo o registo criminal do Jiba?"
    );

    if (!confirmar) return;

    registoJiba = {
        reclamacoes: 0,
        diana: 0,
        lag: 0
    };

    historicoJiba = [];

    guardarRegistoJiba();
    guardarHistoricoJiba();

    atualizarRegistoJiba();
    atualizarHistoricoJiba();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", carregarRegistoJiba);
} else {
    carregarRegistoJiba();
}

/* ===== CENA ESPECIAL DA DIANA ===== */

const botaoEntradaDiana = document.getElementById("botaoEntradaDiana");
const cenaDiana = document.getElementById("cenaDiana");
const fecharCenaDiana = document.getElementById("fecharCenaDiana");
const mensagemDiana = document.getElementById("mensagemDiana");

const mensagensDiana = [
    "O Jiba já abriu o menu das desculpas. 🚨",
    "A Diana chegou. A equipa recuperou 2% de esperança.",
    "Aviso: foram detetados níveis elevados de drama no lobby.",
    "O Jiba perguntou se isto conta como aquecimento.",
    "A Diana entrou e o ping do Jiba começou a inventar números.",
    "Missão principal: sobreviver às desculpas do Jiba.",
    "O árbitro está a analisar mais uma reclamação suspeita."
];

if (botaoEntradaDiana && cenaDiana && fecharCenaDiana) {

    botaoEntradaDiana.addEventListener("click", function () {
        const numeroAleatorio = Math.floor(
            Math.random() * mensagensDiana.length
        );

        if (mensagemDiana) {
            mensagemDiana.textContent =
                mensagensDiana[numeroAleatorio];
        }

        cenaDiana.classList.add("ativa");
    });

    fecharCenaDiana.addEventListener("click", function () {
        cenaDiana.classList.remove("ativa");
    });

    // Também permite fechar ao clicar fora do cartão
    cenaDiana.addEventListener("click", function (evento) {
        if (evento.target === cenaDiana) {
            cenaDiana.classList.remove("ativa");
        }
    });

    // Permite fechar com a tecla Escape
    document.addEventListener("keydown", function (evento) {
        if (evento.key === "Escape") {
            cenaDiana.classList.remove("ativa");
        }
    });
}

/* ===== MINI-JOGO: APANHAR O JIBA ===== */

const iniciarCacaJiba = document.getElementById("iniciarCacaJiba");
const arenaCacaJiba = document.getElementById("arenaJiba");
const alvoCacaJiba = document.getElementById("alvoJiba");
const tempoCacaJiba = document.getElementById("tempoJiba");
const tentativasCacaJiba = document.getElementById("tentativasJiba");
const instrucaoCacaJiba = document.getElementById("instrucaoJiba");
const resultadoCacaJiba = document.getElementById("resultadoCacaJiba");

if (
    iniciarCacaJiba &&
    arenaCacaJiba &&
    alvoCacaJiba &&
    tempoCacaJiba &&
    tentativasCacaJiba &&
    instrucaoCacaJiba &&
    resultadoCacaJiba
) {
    let tempoRestanteCacaJiba = 10;
    let tentativasFeitasCacaJiba = 0;
    let jogoCacaJibaAtivo = false;
    let intervaloCacaJiba = null;

    function moverAlvoCacaJiba() {
        const limiteX = Math.max(
            0,
            arenaCacaJiba.clientWidth - alvoCacaJiba.offsetWidth - 10
        );

        const limiteY = Math.max(
            45,
            arenaCacaJiba.clientHeight - alvoCacaJiba.offsetHeight - 10
        );

        const novaPosicaoX = Math.random() * limiteX;
        const novaPosicaoY = 45 + Math.random() * (limiteY - 45);

        alvoCacaJiba.style.left = novaPosicaoX + "px";
        alvoCacaJiba.style.top = novaPosicaoY + "px";
    }

    function terminarCacaJiba(vitoria) {
        jogoCacaJibaAtivo = false;
        clearInterval(intervaloCacaJiba);
        alvoCacaJiba.disabled = true;

        if (vitoria) {
            resultadoCacaJiba.textContent =
                "🏆 APANHASTE O JIBA! O CS2 perdeu uma batalha histórica!";
            instrucaoCacaJiba.textContent =
                "Suspeito capturado. A Diana merece férias!";
        } else {
            resultadoCacaJiba.textContent =
                "💀 O JIBA ESCAPOU! Já está a carregar em «Jogar» outra vez!";
            instrucaoCacaJiba.textContent =
                "Missão falhada. O suspeito regressou ao CS2.";
        }

        iniciarCacaJiba.textContent = "🔄 TENTAR OUTRA VEZ";
    }

    iniciarCacaJiba.addEventListener("click", function () {
        clearInterval(intervaloCacaJiba);

        tempoRestanteCacaJiba = 10;
        tentativasFeitasCacaJiba = 0;
        jogoCacaJibaAtivo = true;

        tempoCacaJiba.textContent = tempoRestanteCacaJiba;
        tentativasCacaJiba.textContent = tentativasFeitasCacaJiba;

        resultadoCacaJiba.textContent = "";
        instrucaoCacaJiba.textContent =
            "APANHA-O! Precisas de acertar 5 vezes! 😂";

        iniciarCacaJiba.textContent = "🏃 O JIBA ESTÁ A FUGIR!";
        alvoCacaJiba.disabled = false;

        moverAlvoCacaJiba();

        intervaloCacaJiba = setInterval(function () {
            tempoRestanteCacaJiba--;
            tempoCacaJiba.textContent = tempoRestanteCacaJiba;

            if (tempoRestanteCacaJiba <= 0) {
                terminarCacaJiba(false);
            }
        }, 1000);
    });

    alvoCacaJiba.addEventListener("click", function () {
        if (!jogoCacaJibaAtivo) return;

        tentativasFeitasCacaJiba++;
        tentativasCacaJiba.textContent = tentativasFeitasCacaJiba;

        if (tentativasFeitasCacaJiba >= 5) {
            terminarCacaJiba(true);
            return;
        }

        instrucaoCacaJiba.textContent =
            "ACERTASTE! O Jiba está a fugir outra vez! 😭";

        moverAlvoCacaJiba();
    });
}

/* ===== ANALISADOR DO JIBA_PEEK ===== */

const botaoAnalisarJiba = document.getElementById("analisarJiba");
const relatorioAnaliseJiba = document.getElementById("relatorioJiba");

const analisesJiba = [
    {
        titulo: "🚨 ANÁLISE CONCLUÍDA",
        texto: "Nível de confiança: 100%. Nível de pontaria: informação confidencial. Quantidade de desculpas: superior à capacidade do servidor."
    },
    {
        titulo: "🧪 RELATÓRIO DO LABORATÓRIO",
        texto: "Foram detetados vestígios de lag, reclamações e uma necessidade urgente de dizer «não fui eu». Recomenda-se uma revisão da próxima demo."
    },
    {
        titulo: "🥊 PROTOCOLO MIKE TYSON",
        texto: "A fotografia transmite respeito. O nickname transmite confiança. O relatório de pontaria continua desaparecido. O laboratório está a investigar."
    },
    {
        titulo: "🏆 PRÉMIO DE CARREIRA",
        texto: "O jogador foi nomeado para o prémio de melhor explicação de uma derrota. A cerimónia terá lugar depois da próxima partida, que supostamente é a última."
    },
    {
        titulo: "📡 ANÁLISE DE COMUNICAÇÕES",
        texto: "A equipa reporta atividade elevada no microfone e resultados ainda por confirmar. Foram solicitadas provas em formato de gameplay."
    }
];

if (botaoAnalisarJiba && relatorioAnaliseJiba) {
    botaoAnalisarJiba.addEventListener("click", function () {
        const indice = Math.floor(Math.random() * analisesJiba.length);
        const analise = analisesJiba[indice];

        relatorioAnaliseJiba.replaceChildren();

        const titulo = document.createElement("h3");
        titulo.textContent = analise.titulo;

        const texto = document.createElement("p");
        texto.textContent = analise.texto;

        relatorioAnaliseJiba.append(titulo, texto);
        relatorioAnaliseJiba.classList.add("visivel");

        botaoAnalisarJiba.textContent = "🔄 ANALISAR OUTRA VEZ";
    });
}

/* ===== ANALISADOR DOS MAPAS DO JIBA ===== */

const botoesMapasJiba = document.querySelectorAll(".botao-mapa");
const resultadoMapaJiba = document.getElementById("resultadoMapaJiba");

const relatoriosMapasJiba = {
    mirage: [
        "O Jiba conhece cada canto de Mirage. O problema é que os adversários também.",
        "Mirage selecionado! A equipa pede controlo do meio. O Jiba pede um milagre.",
        "Análise concluída: confiança elevada, resultado da próxima ronda por confirmar."
    ],

    dust2: [
        "Dust II: o mapa onde qualquer derrota pode ser explicada com a palavra LAG.",
        "O Jiba conhece Dust II tão bem que já sabe onde vai arranjar a próxima desculpa.",
        "Relatório: entrou para fazer história. A história ainda está a carregar."
    ],

    anubis: [
        "Anubis selecionado! O Jiba entrou no templo. Agora só falta encontrar o caminho para a vitória.",
        "Foram detetados sinais de confusão no minimapa. Recomenda-se abrir o minimapa.",
        "A equipa está pronta. O plano está feito. Falta descobrir se o Jiba recebeu o plano."
    ]
};

botoesMapasJiba.forEach(function(botao) {
    botao.addEventListener("click", function() {
        const mapaEscolhido = botao.dataset.mapa;
        const relatorios = relatoriosMapasJiba[mapaEscolhido];

        const indice = Math.floor(Math.random() * relatorios.length);
        const mensagem = relatorios[indice];

        const titulo = document.createElement("span");
        titulo.textContent = "📡 RELATÓRIO: " + mapaEscolhido.toUpperCase();

        const texto = document.createElement("p");
        texto.textContent = mensagem;

        resultadoMapaJiba.replaceChildren(titulo, texto);
    });
});

/* ===== EFEITO DE SELEÇÃO DOS MAPAS ===== */

document.querySelectorAll(".botao-mapa").forEach(function(botao) {
    botao.addEventListener("click", function() {
        document.querySelectorAll(".mapa-card").forEach(function(card) {
            card.classList.remove("mapa-selecionado");
        });

        const mapaAtual = botao.closest(".mapa-card");

        if (mapaAtual) {
            mapaAtual.classList.add("mapa-selecionado");
        }
    });
});

/* ===== SCANNER OFICIAL DO JIBA ===== */

const scannerJiba = document.getElementById("scannerJiba");
const botaoScanner = document.getElementById("botaoScanner");
const estadoScanner = document.getElementById("estadoScanner");
const precisaoScanner = document.getElementById("precisaoScanner");
const qualidadeScanner = document.getElementById("qualidadeScanner");
const confiancaScanner = document.getElementById("confiancaScanner");
const relatorioScanner = document.getElementById("relatorioScanner");

const relatoriosJiba = [
    {
        precisao: "12%",
        qualidade: "QUESTIONÁVEL",
        confianca: "100%",
        titulo: "🚨 PEEK ALTAMENTE SUSPEITO",
        mensagem: "O Jiba espreitou o inimigo, o inimigo espreitou de volta... e ganhou."
    },
    {
        precisao: "3%",
        qualidade: "CRÍTICA",
        confianca: "100%",
        titulo: "🤖 MIRA NÃO ENCONTRADA",
        mensagem: "A mira foi procurada em todos os ficheiros. Não foi possível localizar."
    },
    {
        precisao: "47%",
        qualidade: "INSTÁVEL",
        confianca: "100%",
        titulo: "⚠️ EXCESSO DE CONFIANÇA",
        mensagem: "A confiança entrou primeiro no bombsite. A equipa ainda está a comprar."
    },
    {
        precisao: "8%",
        qualidade: "DUVIDOSA",
        confianca: "100%",
        titulo: "💀 INIMIGO AVISTADO",
        mensagem: "O Jiba viu o inimigo. O inimigo viu o Jiba. Só um deles sobreviveu."
    },
    {
        precisao: "21%",
        qualidade: "EM INVESTIGAÇÃO",
        confianca: "100%",
        titulo: "📡 LAG DETETADO... TALVEZ",
        mensagem: "O sistema não encontrou provas de lag. O suspeito continua a apresentar essa desculpa."
    },
    {
        precisao: "0%",
        qualidade: "LENDA DO SERVIDOR",
        confianca: "100%",
        titulo: "🏆 PEEK HISTÓRICO",
        mensagem: "Um movimento tão inesperado que até o próprio Jiba ficou surpreendido."
    }
];

if (scannerJiba && botaoScanner) {
    botaoScanner.addEventListener("click", function () {
        if (botaoScanner.disabled) return;

        botaoScanner.disabled = true;
        scannerJiba.classList.add("a-analisar");

        estadoScanner.textContent = "● A ANALISAR O SUSPEITO...";
        precisaoScanner.textContent = "A CALCULAR...";
        qualidadeScanner.textContent = "A CALCULAR...";
        confiancaScanner.textContent = "...";

        relatorioScanner.innerHTML = `
            <strong>🔍 A EXECUTAR DIAGNÓSTICO...</strong>
            <p>A verificar mira, reflexos e desculpas apresentadas.</p>
        `;

        botaoScanner.textContent = "⏳ ANÁLISE EM CURSO...";

        setTimeout(function () {
            const resultado = relatoriosJiba[
                Math.floor(Math.random() * relatoriosJiba.length)
            ];

            precisaoScanner.textContent = resultado.precisao;
            qualidadeScanner.textContent = resultado.qualidade;
            confiancaScanner.textContent = resultado.confianca;

            estadoScanner.textContent = "● ANÁLISE CONCLUÍDA";
            relatorioScanner.innerHTML = `
                <strong>${resultado.titulo}</strong>
                <p>${resultado.mensagem}</p>
            `;

            scannerJiba.classList.remove("a-analisar");
            botaoScanner.disabled = false;
            botaoScanner.textContent = "🔄 ANALISAR OUTRA VEZ";
        }, 1800);
    });
}

/* ===== DESARMA A BOMBA: JIBA EDITION ===== */

const secaoBomba = document.getElementById("bombaJiba");

if (secaoBomba) {
    const visorBomba = document.getElementById("bombaDisplay");
    const luzBomba = document.getElementById("bombaLuz");
    const estadoBomba = document.getElementById("bombaStatus");
    const instrucaoBomba = document.getElementById("bombaInstrucao");
    const pistasBomba = document.getElementById("bombaPistas");
    const campoCodigo = document.getElementById("codigoBomba");
    const botaoIniciar = document.getElementById("botaoIniciarBomba");
    const botaoDesarmar = document.getElementById("botaoDesarmarBomba");
    const resultadoBomba = document.getElementById("resultadoBomba");

    let codigoSecreto = "";
    let tempoRestante = 30;
    let tentativas = 0;
    let cronometroBomba = null;
    let jogoAtivo = false;

    // ===== ESTATISTICAS GUARDADAS =====

    const chaveEstatisticasBomba = "jibaBombaEstatisticas";

    function carregarEstatisticasBomba() {
        const dadosIniciais = {
            vitorias: 0,
            derrotas: 0,
            melhorTempo: null
        };

        try {
            const dadosGuardados = localStorage.getItem(
                chaveEstatisticasBomba
            );

            if (!dadosGuardados) return dadosIniciais;

            const dados = JSON.parse(dadosGuardados);

            return {
                vitorias: Number.isInteger(dados.vitorias) && dados.vitorias >= 0
                    ? dados.vitorias : 0,
                derrotas: Number.isInteger(dados.derrotas) && dados.derrotas >= 0
                    ? dados.derrotas : 0,
                melhorTempo: Number.isInteger(dados.melhorTempo) &&
                    dados.melhorTempo >= 0 && dados.melhorTempo <= 30
                    ? dados.melhorTempo : null
            };
        } catch (erro) {
            return dadosIniciais;
        }
    }

    let estatisticasBomba = carregarEstatisticasBomba();

    function guardarEstatisticasBomba() {
        try {
            localStorage.setItem(
                chaveEstatisticasBomba,
                JSON.stringify(estatisticasBomba)
            );
        } catch (erro) {
            console.warn("Não foi possível guardar as estatísticas.");
        }
    }

    function atualizarEstatisticasBomba() {
        const totalPartidas =
            estatisticasBomba.vitorias + estatisticasBomba.derrotas;

        document.getElementById("vitoriasBomba").textContent =
            estatisticasBomba.vitorias;

        document.getElementById("derrotasBomba").textContent =
            estatisticasBomba.derrotas;

        document.getElementById("partidasBomba").textContent =
            totalPartidas;

        document.getElementById("recordeBomba").textContent =
            estatisticasBomba.melhorTempo === null
                ? "--"
                : estatisticasBomba.melhorTempo + " s";

        let patente;
        let vitoriasParaProxima;
        let progresso;

        if (estatisticasBomba.vitorias >= 20) {
            patente = "👑 LENDA ANTIBOT";
            vitoriasParaProxima = 20;
            progresso = 100;
        } else if (estatisticasBomba.vitorias >= 10) {
            patente = "🔥 ESPECIALISTA";
            vitoriasParaProxima = 20;
            progresso = (estatisticasBomba.vitorias - 10) / 10 * 100;
        } else if (estatisticasBomba.vitorias >= 5) {
            patente = "🥇 DESARMADOR";
            vitoriasParaProxima = 10;
            progresso = (estatisticasBomba.vitorias - 5) / 5 * 100;
        } else {
            patente = "🎖️ RECRUTA";
            vitoriasParaProxima = 5;
            progresso = estatisticasBomba.vitorias / 5 * 100;
        }

        document.getElementById("patenteBomba").textContent = patente;

        document.getElementById("progressoPatenteTexto").textContent =
            estatisticasBomba.vitorias >= 20
                ? "PATENTE MÁXIMA"
                : estatisticasBomba.vitorias + " / " +
                  vitoriasParaProxima + " vitórias";

        document.getElementById("progressoPatenteBarra").style.width =
            progresso + "%";
    }

    // Mostrar os resultados guardados ao abrir o site.
    atualizarEstatisticasBomba();

    const mensagensDerrota = [
        "O Jiba tentou ajudar. A situação ficou ainda pior.",
        "A bomba ganhou. O Jiba diz que foi lag.",
        "Missão falhada! O Jiba já está a culpar o servidor.",
        "Nem o melhor tutorial do YouTube salvava esta ronda."
    ];

    function mostrarResultado(titulo, mensagem) {
        resultadoBomba.innerHTML = `
            <strong>${titulo}</strong>
            <p>${mensagem}</p>
        `;
    }

    function atualizarVisor() {
        const minutos = Math.floor(tempoRestante / 60);
        const segundos = tempoRestante % 60;

        visorBomba.textContent =
            String(minutos).padStart(2, "0") + ":" +
            String(segundos).padStart(2, "0");
    }

    function criarCodigo() {
        // O primeiro dígito é diferente de zero.
        return String(Math.floor(Math.random() * 900) + 100);
    }

    function criarPistas() {
        const digitos = codigoSecreto.split("").map(Number);

        const soma = digitos.reduce((total, numero) => total + numero, 0);
        const maior = Math.max(...digitos);
        const menor = Math.min(...digitos);

        pistasBomba.innerHTML = `
            <span>PISTA 01: A soma dos dígitos é ${soma}.</span>
            <span>PISTA 02: O maior dígito é ${maior}.</span>
            <span>PISTA 03: O último dígito é ${digitos[2]}.</span>
        `;
    }

    
    function terminarJogo(vitoria) {
        if (!jogoAtivo) return;

        jogoAtivo = false;
        clearInterval(cronometroBomba);

        campoCodigo.disabled = true;
        botaoDesarmar.disabled = true;
        botaoIniciar.disabled = false;

        secaoBomba.classList.remove("bomba-ativa");

        if (vitoria) {
            secaoBomba.classList.remove("bomba-derrota");
            secaoBomba.classList.add("bomba-vitoria");     // Tocar o som de vitória
    if (window.sonsGaming) {
        window.sonsGaming.vitoria();
    }

            // Registar a vitória e atualizar o melhor tempo.
            const tempoUtilizado = 30 - tempoRestante;

            estatisticasBomba.vitorias++;

            if (
                estatisticasBomba.melhorTempo === null ||
                tempoUtilizado < estatisticasBomba.melhorTempo
            ) {
                estatisticasBomba.melhorTempo = tempoUtilizado;
            }

            estadoBomba.textContent = "● MISSÃO CONCLUÍDA";

            mostrarResultado(
                "🏆 BOMBA DESARMADA!",
                "Salvaste a ronda em " + tempoUtilizado +
                " segundos! O Jiba está oficialmente impressionado."
            );

        } else {
            secaoBomba.classList.remove("bomba-vitoria");
            secaoBomba.classList.add("bomba-derrota");
    // Tocar o som de derrota
    if (window.sonsGaming) {
        window.sonsGaming.derrota();
    }
            estatisticasBomba.derrotas++;

            estadoBomba.textContent = "● MISSÃO FALHADA";
            visorBomba.textContent = "00:00";

            mostrarResultado(
                "💥 FIM DA MISSÃO!",
                mensagensDerrota[
                    Math.floor(Math.random() * mensagensDerrota.length)
                ]
            );
        }

        guardarEstatisticasBomba();
        atualizarEstatisticasBomba();

        botaoIniciar.textContent = "🔄 TENTAR NOVAMENTE";
    }
{
    }

    function iniciarJogo() {
        clearInterval(cronometroBomba);

        codigoSecreto = criarCodigo();
        tempoRestante = 30;
        tentativas = 0;
        jogoAtivo = true;

        secaoBomba.classList.remove("bomba-vitoria", "bomba-derrota");
        secaoBomba.classList.add("bomba-ativa");

        atualizarVisor();
        criarPistas();

        estadoBomba.textContent = "● MISSÃO EM CURSO";
        instrucaoBomba.textContent =
            "Descobre o código secreto. Tens 30 segundos e até 5 tentativas.";

        campoCodigo.value = "";
        campoCodigo.disabled = false;
        campoCodigo.maxLength = 3;

        botaoDesarmar.disabled = false;
        botaoIniciar.disabled = true;
        botaoIniciar.textContent = "⏳ MISSÃO EM CURSO";

        mostrarResultado(
            "🔎 ANÁLISE INICIADA...",
            "Lê as três pistas e descobre o código antes que o tempo termine."
        );

        campoCodigo.focus();

        cronometroBomba = setInterval(function () {
            tempoRestante--;
            atualizarVisor();

            if (tempoRestante <= 0) {
                terminarJogo(false);
            }
        }, 1000);
    }

    function verificarCodigo() {
        if (!jogoAtivo) return;

        const codigoIntroduzido = campoCodigo.value.trim();

        if (!/^\d{3}$/.test(codigoIntroduzido)) {
            mostrarResultado(
                "⚠️ CÓDIGO INVÁLIDO",
                "Tens de introduzir exatamente três dígitos!"
            );
            return;
        }

        tentativas++;

        if (codigoIntroduzido === codigoSecreto) {
            terminarJogo(true);
            return;
        }

        const digitosCertos = codigoIntroduzido
            .split("")
            .filter((digito, indice) => digito === codigoSecreto[indice])
            .length;

        const tentativasRestantes = 5 - tentativas;

        campoCodigo.value = "";

        if (tentativasRestantes <= 0) {
            terminarJogo(false);
            return;
        }

        mostrarResultado(
            "❌ CÓDIGO ERRADO!",
            `Dígitos na posição certa: ${digitosCertos}. Tentativas restantes: ${tentativasRestantes}. O Jiba teria tentado adivinhar à sorte.`
        );

        campoCodigo.focus();
    }

    botaoIniciar.addEventListener("click", iniciarJogo);
    botaoDesarmar.addEventListener("click", verificarCodigo);

    campoCodigo.addEventListener("keydown", function (evento) {
        if (evento.key === "Enter" && jogoAtivo) {
            verificarCodigo();
        }
    });

    campoCodigo.addEventListener("input", function () {
        campoCodigo.value = campoCodigo.value
            .replace(/\D/g, "")
            .slice(0, 3);
    });
}

/* ===== DECISÕES DO GABINETE DA DIANA ===== */

const ordensDiana = {
    treino: {
        estado: "Em treino obrigatório 🎯",
        mensagem: "📢 ORDEM OFICIAL: Jiba_Peek, estás convocado para treino obrigatório. A desculpa «foi o lag» não será aceite!",
        pontos: 10
    },

    castigo: {
        estado: "Sob investigação 🚨",
        mensagem: "🚨 SANÇÃO APLICADA: o suspeito terá de apresentar um relatório a explicar como conseguiu falhar aquela ronda.",
        pontos: 15
    },

    missao: {
        estado: "Em missão secreta 🕵️",
        mensagem: "🕵️ MISSÃO CLASSIFICADA: Jiba_Peek, tens uma missão especial. O briefing será revelado pela Diretora Diana quando ela quiser!",
        pontos: 20
    },

    perdao: {
        estado: "Em liberdade condicional 😇",
        mensagem: "😇 PERDÃO CONCEDIDO: podes continuar a jogar, Jiba. Mas a Diana estará a observar os teus próximos movimentos!",
        pontos: 5
    }
};

let autoridadeDianinha = 0;

function decidirJiba(decisao) {
    const ordem = ordensDiana[decisao];

    if (!ordem) return;
const estadoGabinete = document.getElementById("estadoJibaGabinete");

if (estadoGabinete) {
    estadoGabinete.textContent = ordem.estado;
}
    document.getElementById("ordemDiana").textContent =
        ordem.mensagem;

    autoridadeDiana += ordem.pontos;

    document.getElementById("pontosDiana").textContent =
        autoridadeDiana;
}

/* ===== INVESTIGAÇÃO DAS MORTES DO JIBA ===== */

const casosJiba = [
    {
        culpado: "CULPA DA DIANA 👀",
        descricao: "A Diana olhou para o ecrã. O Jiba sentiu-se observado, perdeu a concentração e foi eliminado. Caso encerrado.",
        tipo: "diana",
        estado: "🚨 A Diana foi convocada para prestar declarações."
    },
    {
        culpado: "CULPA DA EQUIPA 🤡",
        descricao: "Os colegas não adivinharam a estratégia genial do Jiba. Segundo o treinador, a equipa devia ler-lhe a mente.",
        tipo: "equipa",
        estado: "📢 O treinador exige uma reunião de emergência."
    },
    {
        culpado: "CULPA DO SERVIDOR 🖥️",
        descricao: "O servidor teve a ousadia de não proteger o Jiba. Está aberto um processo disciplinar contra a máquina.",
        tipo: "servidor",
        estado: "⚖️ O servidor está a ser interrogado."
    },
    {
        culpado: "CULPA DO INIMIGO 🎯",
        descricao: "O adversário disparou contra o Jiba e acertou. Uma atitude completamente inesperada numa partida de CS2.",
        tipo: "inimigo",
        estado: "😡 O Jiba apresentou queixa por excesso de pontaria."
    },
    {
        culpado: "CULPA DO TECLADO ⌨️",
        descricao: "Uma tecla não colaborou com a visão estratégica do melhor jogador do mundo. O teclado será substituído.",
        tipo: "teclado",
        estado: "🔧 O equipamento está a ser investigado."
    },
    {
        culpado: "CULPA DO UNIVERSO 🌌",
        descricao: "Mercúrio retrógrado, pressão atmosférica e energias negativas. O Jiba está oficialmente ilibado.",
        tipo: "universo",
        estado: "🔮 A astrologia foi chamada como testemunha."
    },
    {
        culpado: "CULPA DE TODA A GENTE 💀",
        descricao: "A equipa, a Diana, o servidor e o inimigo foram convocados. O Jiba será o presidente da reunião.",
        tipo: "equipa",
        estado: "🏆 O Jiba foi nomeado treinador apesar de ter morrido primeiro."
    }
];

const botaoInvestigar = document.getElementById("botaoInvestigar");

if (botaoInvestigar) {
    let mortes = 0;
    let culpasDiana = 0;
    let culpasEquipa = 0;
    let ultimoCaso = -1;

    botaoInvestigar.addEventListener("click", function () {
        let indice;

        // Evita repetir a mesma desculpa duas vezes seguidas.
        do {
            indice = Math.floor(Math.random() * casosJiba.length);
        } while (casosJiba.length > 1 && indice === ultimoCaso);

        ultimoCaso = indice;

        const caso = casosJiba[indice];

        mortes++;

        if (caso.tipo === "diana") {
            culpasDiana++;
        }

        if (caso.tipo === "equipa") {
            culpasEquipa++;
        }

        document.getElementById("culpadoNome").textContent = caso.culpado;
        document.getElementById("culpadoDescricao").textContent = caso.descricao;
        document.getElementById("treinadorStatus").querySelector("p").textContent = caso.estado;

        document.getElementById("mortesInvestigadas").textContent = mortes;
        document.getElementById("culpasDiana").textContent = culpasDiana;
        document.getElementById("culpasEquipa").textContent = culpasEquipa;
    });
}

/* ===== O JIBA ESTÁ A FALAR ===== */

const frasesJiba = [
    {
        frase: "EU TINHA-TE MATADO SE A DIANA NÃO ESTIVESSE A OLHAR!",
        contexto: "A Diana estava quieta e, aparentemente, isso afetou a mira."
    },
    {
        frase: "VOCÊS NÃO JOGAM NADA! TENHO DE FAZER TUDO SOZINHO!",
        contexto: "O treinador foi eliminado primeiro e já tem uma análise completa."
    },
    {
        frase: "VIRAM?! É DISTO QUE EU FALO! SOU O MELHOR!",
        contexto: "Ganhou uma ronda e já está a preparar o discurso de campeão."
    },
    {
        frase: "EU NÃO FALHEI! ELE É QUE TEVE SORTE!",
        contexto: "O adversário acertou os tiros. Uma coincidência inacreditável."
    },
    {
        frase: "EU DISSE PARA IREM PARA A B! NINGUÉM ME OUVE!",
        contexto: "A estratégia só foi explicada depois de a ronda acabar."
    },
    {
        frase: "O MEU JOGO ESTÁ TODO BUGADO!",
        contexto: "A investigação não encontrou problemas no jogo. O caso continua aberto."
    },
    {
        frase: "SE EU NÃO ESTIVESSE AQUI, VOCÊS PERDIAM TODAS!",
        contexto: "O Jiba acabou de perder uma ronda com a equipa inteira."
    },
    {
        frase: "EU ESTAVA A JOGAR COM 200 DE PING!",
        contexto: "O ping pode ou não ter sido consultado antes desta declaração."
    },
    {
        frase: "NÃO ME DEIXARAM JOGAR! ESTÃO TODOS CONTRA MIM!",
        contexto: "A equipa estava a jogar a mesma partida, mas o treinador discorda."
    },
    {
        frase: "CALADOS! EU SEI EXATAMENTE O QUE ESTOU A FAZER!",
        contexto: "Disse isto imediatamente antes de entrar sozinho contra cinco."
    },
    {
        frase: "ESTA RONDA ESTAVA GANHA SE FIZESSEM O QUE EU DISSE!",
        contexto: "Ninguém se lembra de ter ouvido esse plano."
    },
    {
        frase: "EU DEIXEI-ME MORRER PARA TESTAR A EQUIPA!",
        contexto: "Um teste estratégico que ninguém pediu."
    },
    {
        frase: "NÃO FOI SORTE! EU PLANEIEI TUDO!",
        contexto: "Conseguiu uma eliminação por acaso e já está a escrever um livro."
    },
    {
        frase: "DIANA, NÃO OLHES! ESTÁS A DESESTABILIZAR-ME!",
        contexto: "A presença da Diana foi adicionada ao relatório de incidentes."
    }
];

const botaoFalarJiba = document.getElementById("botaoFalarJiba");
const botaoCopiarJiba = document.getElementById("botaoCopiarJiba");
const fraseJiba = document.getElementById("fraseJiba");
const contextoJiba = document.getElementById("contextoJiba");
const estadoCopiaJiba = document.getElementById("estadoCopiaJiba");

let ultimaFraseJiba = -1;

if (botaoFalarJiba && fraseJiba && contextoJiba) {
    botaoFalarJiba.addEventListener("click", function () {
        let indice;

        do {
            indice = Math.floor(Math.random() * frasesJiba.length);
        } while (frasesJiba.length > 1 && indice === ultimaFraseJiba);

        ultimaFraseJiba = indice;

        fraseJiba.textContent = "«" + frasesJiba[indice].frase + "»";
        contextoJiba.textContent = frasesJiba[indice].contexto;

        if (estadoCopiaJiba) {
            estadoCopiaJiba.textContent = "";
        }
    });
}

if (botaoCopiarJiba && fraseJiba && contextoJiba) {
    botaoCopiarJiba.addEventListener("click", async function () {
        const texto = fraseJiba.textContent + "\n" + contextoJiba.textContent;

        try {
            await navigator.clipboard.writeText(texto);

            if (estadoCopiaJiba) {
                estadoCopiaJiba.textContent =
                    "😂 Frase copiada! Está pronta para enviar ao grupo.";
            }
        } catch (erro) {
            if (estadoCopiaJiba) {
                estadoCopiaJiba.textContent =
                    "Não foi possível copiar automaticamente. Seleciona e copia a frase manualmente.";
            }
        }
    });
}

/* ===== TRADUTOR OFICIAL DO JIBA ===== */

const traducoesJiba = [
    {
        original: "VOCÊS NÃO JOGAM NADA!",
        traducao: "Morri primeiro e preciso de encontrar um responsável.",
        selo: "⚖️ A equipa foi considerada suspeita."
    },
    {
        original: "FOI SORTE! EU TINHA-TE MATADO!",
        traducao: "Não gostei que o adversário tivesse melhor pontaria do que eu.",
        selo: "🎯 O talento adversário continua sob investigação."
    },
    {
        original: "DIANA, NÃO OLHES PARA MIM!",
        traducao: "Preciso de uma desculpa nova e tu estás mesmo aqui.",
        selo: "👀 A Diana foi chamada para depor."
    },
    {
        original: "EU SOU O MELHOR DESTA EQUIPA!",
        traducao: "Preciso que alguém confirme a minha autoestima.",
        selo: "🏆 Ego detetado acima dos níveis recomendados."
    },
    {
        original: "O JOGO ESTÁ TODO BUGADO!",
        traducao: "O resultado não corresponde às minhas expectativas.",
        selo: "🖥️ O servidor declarou-se inocente."
    },
    {
        original: "EU DISSE PARA IREM PARA A B!",
        traducao: "Acabei de descobrir uma estratégia que devia ter explicado antes.",
        selo: "📢 A reunião tática começou depois da ronda."
    },
    {
        original: "EU NÃO MORRI POR SER MAU!",
        traducao: "A possibilidade de eu ter cometido um erro está excluída.",
        selo: "🔎 A autocrítica não foi encontrada."
    },
    {
        original: "NÃO ME DEIXAM JOGAR!",
        traducao: "A equipa não organizou toda a partida à minha volta.",
        selo: "👨‍⚖️ O tribunal recomenda trabalho de equipa."
    },
    {
        original: "EU ESTAVA COM LAG!",
        traducao: "Preciso de consultar o ping antes de aceitar este resultado.",
        selo: "📡 A ligação à responsabilidade foi perdida."
    },
    {
        original: "VIRAM COMO EU JOGUEI?!",
        traducao: "Consegui uma eliminação e vou falar dela durante três rondas.",
        selo: "🎉 Uma jogada transformada num documentário."
    },
    {
        original: "SE EU NÃO ESTIVESSE AQUI, PERDIAM!",
        traducao: "Gostava que reparassem mais nas minhas contribuições.",
        selo: "📊 O departamento de estatísticas foi convocado."
    },
    {
        original: "EU DEIXEI-ME MORRER PARA TESTAR A EQUIPA!",
        traducao: "Não tenho uma explicação melhor para o que acabou de acontecer.",
        selo: "🧪 Experiência sem autorização."
    },
    {
        original: "NINGUÉM SABE JOGAR NESTA EQUIPA!",
        traducao: "Estou chateado e decidi fazer uma avaliação profissional de toda a gente.",
        selo: "📋 O treinador esqueceu-se de avaliar o próprio desempenho."
    },
    {
        original: "EU TINHA TUDO CONTROLADO!",
        traducao: "Nada correu como eu esperava, mas vamos fingir que fazia parte do plano.",
        selo: "🧠 Plano estratégico ainda por localizar."
    }
];

const botaoTraduzirJiba =
    document.getElementById("botaoTraduzirJiba");

const botaoCopiarTraducao =
    document.getElementById("botaoCopiarTraducao");

const jibaOriginal =
    document.getElementById("jibaOriginal");

const jibaTraducao =
    document.getElementById("jibaTraducao");

const jibaSelo =
    document.getElementById("jibaSelo");

const estadoTradutorJiba =
    document.getElementById("estadoTradutorJiba");

let ultimaTraducaoJiba = -1;

if (botaoTraduzirJiba) {
    botaoTraduzirJiba.addEventListener("click", function () {
        let indice;

        do {
            indice = Math.floor(Math.random() * traducoesJiba.length);
        } while (
            traducoesJiba.length > 1 &&
            indice === ultimaTraducaoJiba
        );

        ultimaTraducaoJiba = indice;

        const traducao = traducoesJiba[indice];

        jibaOriginal.textContent = "«" + traducao.original + "»";
        jibaTraducao.textContent = "«" + traducao.traducao + "»";
        jibaSelo.textContent = traducao.selo;

        if (estadoTradutorJiba) {
            estadoTradutorJiba.textContent = "";
        }
    });
}

if (botaoCopiarTraducao) {
    botaoCopiarTraducao.addEventListener("click", async function () {
        const texto =
            "JIBA DIZ: " + jibaOriginal.textContent +
            "\nTRADUÇÃO OFICIAL: " + jibaTraducao.textContent +
            "\n" + jibaSelo.textContent;

        try {
            await navigator.clipboard.writeText(texto);

            if (estadoTradutorJiba) {
                estadoTradutorJiba.textContent =
                    "😂 Tradução copiada! Pronta para enviar ao grupo.";
            }
        } catch (erro) {
            if (estadoTradutorJiba) {
                estadoTradutorJiba.textContent =
                    "Não foi possível copiar automaticamente. Seleciona o texto e copia-o manualmente.";
            }
        }
    });
}

/* =====================================
   SISTEMA DE PARTÍCULAS GAMING
   ===================================== */

(() => {
    const canvas = document.getElementById("particulasGaming");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    let largura = 0;
    let altura = 0;
    let particulas = [];
    let animacaoAtiva = true;
    let frame = 0;

    const movimentoReduzido = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    function criarParticula() {
        return {
            x: Math.random() * largura,
            y: Math.random() * altura,
            raio: Math.random() * 2.2 + 0.5,
            velocidadeX: (Math.random() - 0.5) * 0.8,
            velocidadeY: -(Math.random() * 0.8 + 0.15),
            opacidade: Math.random() * 0.7 + 0.2,
            brilho: Math.random() * 12 + 4
        };
    }

    function ajustarCanvas() {
        const escala = Math.min(window.devicePixelRatio || 1, 2);

        largura = window.innerWidth;
        altura = window.innerHeight;

        canvas.width = largura * escala;
        canvas.height = altura * escala;

        ctx.setTransform(escala, 0, 0, escala, 0, 0);

        const quantidade = Math.min(
            150,
            Math.max(35, Math.floor(largura * altura / 10000))
        );

        particulas = Array.from(
            { length: quantidade },
            criarParticula
        );

        desenhar();
    }

    function desenhar() {
        ctx.clearRect(0, 0, largura, altura);

        /* Partículas luminosas */
        for (const p of particulas) {
            ctx.save();

            ctx.globalAlpha = p.opacidade;
            ctx.fillStyle = "#ff6a00";
            ctx.shadowColor = "#ff4500";
            ctx.shadowBlur = p.brilho;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.raio, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        }

        /* Linhas de energia entre partículas próximas */
        for (let i = 0; i < particulas.length; i++) {
            for (let j = i + 1; j < particulas.length; j++) {
                const a = particulas[i];
                const b = particulas[j];

                const dx = a.x - b.x;
                const dy = a.y - b.y;
                const distancia = Math.sqrt(dx * dx + dy * dy);

                if (distancia < 105) {
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);

                    ctx.strokeStyle =
                        `rgba(255, 90, 0, ${(1 - distancia / 105) * 0.22})`;

                    ctx.lineWidth = 0.7;
                    ctx.stroke();
                }
            }
        }
    }

    function animar() {
        if (!animacaoAtiva || movimentoReduzido) return;

        frame++;

        for (const p of particulas) {
            p.x += p.velocidadeX;
            p.y += p.velocidadeY;

            /* Movimento ligeiramente irregular */
            p.x += Math.sin(frame * 0.01 + p.raio) * 0.15;

            /* Reaparecem na parte inferior */
            if (p.y < -10) {
                p.y = altura + 10;
                p.x = Math.random() * largura;
            }

            if (p.x < -10) p.x = largura + 10;
            if (p.x > largura + 10) p.x = -10;
        }

        desenhar();
        requestAnimationFrame(animar);
    }

    /* Pausa quando o separador não está visível */
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            animacaoAtiva = false;
        } else {
            animacaoAtiva = true;

            if (!movimentoReduzido) {
                requestAnimationFrame(animar);
            }
        }
    });

    window.addEventListener("resize", ajustarCanvas);

    ajustarCanvas();

    if (!movimentoReduzido) {
        animar();
    }
})();

/* ==========================================
   SISTEMA DE SONS GAMING
   THE LAST BOT ALIVE
   ========================================== */

(() => {
    // Evita criar o sistema duas vezes
    if (document.getElementById("somGamingToggle")) return;

    let audio = null;
    let sonsAtivos = true;

    // Recuperar a preferência guardada
    try {
        sonsAtivos = localStorage.getItem("sonsGaming") !== "off";
    } catch (erro) {
        // Se o armazenamento não estiver disponível,
        // os sons continuam a funcionar nesta sessão.
    }

    // Criar o botão para ligar/desligar os sons
    const botaoSom = document.createElement("button");

    botaoSom.id = "somGamingToggle";
    botaoSom.type = "button";
    botaoSom.setAttribute("aria-pressed", String(sonsAtivos));

    function atualizarBotao() {
        botaoSom.textContent = sonsAtivos
            ? "🔊 Sons: ligados"
            : "🔇 Sons: desligados";

        botaoSom.setAttribute("aria-pressed", String(sonsAtivos));
        botaoSom.title = "Ativar ou desativar os efeitos sonoros";
    }

    atualizarBotao();
    document.body.appendChild(botaoSom);

    // Gerar um pequeno som eletrónico
    function tocarSom() {
        if (!sonsAtivos) return;

        try {
            const AudioContext =
                window.AudioContext || window.webkitAudioContext;

            if (!AudioContext) return;

            if (!audio) audio = new AudioContext();

            if (audio.state === "suspended") {
                audio.resume().catch(() => {});
            }

            const oscilador = audio.createOscillator();
            const volume = audio.createGain();
            const inicio = audio.currentTime;

            oscilador.type = "square";
            oscilador.frequency.setValueAtTime(620, inicio);
            oscilador.frequency.exponentialRampToValueAtTime(
                280,
                inicio + 0.07
            );

            volume.gain.setValueAtTime(0.0001, inicio);
            volume.gain.exponentialRampToValueAtTime(
                0.055,
                inicio + 0.01
            );
            volume.gain.exponentialRampToValueAtTime(
                0.0001,
                inicio + 0.09
            );

            oscilador.connect(volume);
            volume.connect(audio.destination);

            oscilador.start(inicio);
            oscilador.stop(inicio + 0.1);
        } catch (erro) {
            // Um erro de áudio não deve interromper o site.
        }
    }

    // Botão de controlo dos sons
    botaoSom.addEventListener("click", () => {
        sonsAtivos = !sonsAtivos;

        try {
            localStorage.setItem(
                "sonsGaming",
                sonsAtivos ? "on" : "off"
            );
        } catch (erro) {
            // A preferência mantém-se durante esta sessão.
        }

        atualizarBotao();

        // Ao ligar, toca um som de confirmação
        if (sonsAtivos) tocarSom();
    });

   
    // Som ao clicar nos outros botões do site
    document.addEventListener("click", (evento) => {
        const botao = evento.target.closest("button");

        if (!botao) return;
        if (botao.id === "somGamingToggle") return;
        if (botao.disabled) return;

        tocarSom();
    });

    // Criar sons especiais usando o mesmo sistema de áudio
    function tocarSequencia(notas) {
        if (!sonsAtivos) return;

        try {
            const AudioContext =
                window.AudioContext || window.webkitAudioContext;

            if (!AudioContext) return;
            if (!audio) audio = new AudioContext();

            audio.resume().catch(() => {});

            const inicio = audio.currentTime;

            notas.forEach((nota) => {
                const oscilador = audio.createOscillator();
                const volume = audio.createGain();
                const instante = inicio + nota.tempo;
                const duracao = nota.duracao || 0.13;

                oscilador.type = "square";
                oscilador.frequency.setValueAtTime(
                    nota.frequencia,
                    instante
                );

                volume.gain.setValueAtTime(0.0001, instante);
                volume.gain.exponentialRampToValueAtTime(
                    0.045,
                    instante + 0.015
                );
                volume.gain.exponentialRampToValueAtTime(
                    0.0001,
                    instante + duracao
                );

                oscilador.connect(volume);
                volume.connect(audio.destination);

                oscilador.start(instante);
                oscilador.stop(instante + duracao + 0.02);
            });
        } catch (erro) {
            // Os sons não devem interromper o jogo.
        }
    }

    // Som de vitória
    function somVitoria() {
        tocarSequencia([
            { frequencia: 523, tempo: 0, duracao: 0.12 },
            { frequencia: 659, tempo: 0.13, duracao: 0.12 },
            { frequencia: 784, tempo: 0.26, duracao: 0.22 },
            { frequencia: 1047, tempo: 0.49, duracao: 0.3 }
        ]);
    }

    // Som de derrota
    function somDerrota() {
        tocarSequencia([
            { frequencia: 440, tempo: 0, duracao: 0.18 },
            { frequencia: 349, tempo: 0.2, duracao: 0.2 },
            { frequencia: 262, tempo: 0.43, duracao: 0.35 }
        ]);
    }

    // Som de missão concluída
    function somMissaoConcluida() {
        tocarSequencia([
            { frequencia: 740, tempo: 0, duracao: 0.1 },
            { frequencia: 988, tempo: 0.12, duracao: 0.18 }
        ]);
    }

    // Disponibilizar os sons para o resto do site
    window.sonsGaming = {
        vitoria: somVitoria,
        derrota: somDerrota,
        missaoConcluida: somMissaoConcluida
    };

})();

/* ==========================================
   ANIMAÇÕES DE ENTRADA AO FAZER SCROLL
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
    const elementos = document.querySelectorAll(
        ".perfil-jiba, .diana-evento, section"
    );

    elementos.forEach((elemento) => {
        // Evitar preparar o mesmo elemento duas vezes
        if (elemento.classList.contains("animar-ao-entrar")) {
            return;
        }

        elemento.classList.add("animar-ao-entrar");
    });

    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("visivel");
                observador.unobserve(entrada.target);
            }
        });
    }, {
        threshold: 0.12
    });

    elementos.forEach((elemento) => {
        observador.observe(elemento);
    });
});

/* ==========================================
   QUIZ — QUE TIPO DE BOT ÉS?
   ========================================== */

(() => {
    const perguntasQuiz = [
        {
            pergunta: "1. O teu colega foi eliminado. O que fazes?",
            respostas: [
                "A) Vingo-o imediatamente!",
                "B) Culpo o lag, obviamente.",
                "C) Fujo e finjo que não o conhecia.",
                "D) Digo: era tudo parte da estratégia."
            ],
            feedback: [
                "Espírito de equipa... e sede de vingança!",
                "O lag é sempre o suspeito número um.",
                "A amizade acaba quando começa o matchmaking.",
                "Uma estratégia tão secreta que nem tu a conheces."
            ]
        },
        {
            pergunta: "2. Ouves passos atrás de ti. O que fazes?",
            respostas: [
                "A) Viro-me e disparo!",
                "B) Olho para o radar... talvez.",
                "C) Continuo a correr em frente.",
                "D) Pergunto à equipa onde está o inimigo."
            ],
            feedback: [
                "Reflexos rápidos! Agora falta acertar.",
                "O radar é teu amigo. Usa-o!",
                "O inimigo agradece a visita.",
                "A comunicação chegou... um bocadinho tarde."
            ]
        },
        {
            pergunta: "3. A equipa precisa de uma decisão urgente.",
            respostas: [
                "A) Assumo a liderança.",
                "B) Pergunto ao Jiba o que fazer.",
                "C) Faço o contrário do que todos dizem.",
                "D) Digo «confia» e avanço."
            ],
            feedback: [
                "O capitão chegou ao servidor!",
                "Pedir conselhos ao Jiba? Coragem.",
                "Estratégia alternativa ou caos absoluto?",
                "A confiança está alta. Vamos ver o resto."
            ]
        },
        {
            pergunta: "4. Acabaste de perder uma ronda. A tua reação?",
            respostas: [
                "A) Analiso o que correu mal.",
                "B) Foi lag, sem dúvida.",
                "C) Digo «esta ronda não conta».",
                "D) Peço logo outra partida."
            ],
            feedback: [
                "Mentalidade de jogador que quer melhorar!",
                "O lag continua a ser o maior inimigo.",
                "Se não conta, porque é que aparece no resultado?",
                "O clássico «só mais uma» ataca novamente."
            ]
        },
        {
            pergunta: "5. Qual é a tua maior qualidade no CS2?",
            respostas: [
                "A) Pontaria e reflexos.",
                "B) Criatividade nas desculpas.",
                "C) Confiança acima de tudo.",
                "D) Sobreviver por pura sorte."
            ],
            feedback: [
                "Temos aqui alguém com ambição!",
                "Um talento que nunca fica sem munições.",
                "A confiança está no máximo. A pontaria é confidencial.",
                "A sorte também faz parte do espetáculo!"
            ]
        }
    ];

    const resultadosQuiz = [
        {
            titulo: "🎯 O AIMBOT HUMANO",
            texto: "A tua confiança é lendária. O servidor ainda está a tentar confirmar a tua pontaria."
        },
        {
            titulo: "🤡 O REI DAS DESCULPAS",
            texto: "O teu verdadeiro talento é explicar porque é que a ronda não correu como planeado."
        },
        {
            titulo: "😎 O LÍDER DO CAOS",
            texto: "Tens sempre um plano. A equipa só precisa de descobrir qual é."
        },
        {
            titulo: "🍀 O BOT SOBREVIVENTE",
            texto: "Não sabes bem como, mas continuas vivo. E no CS2, isso já é uma conquista."
        }
    ];

    const perguntaElemento = document.getElementById("quizPergunta");
    const respostasElemento = document.getElementById("quizRespostas");
    const contadorElemento = document.getElementById("quizContador");
    const barraElemento = document.getElementById("quizBarraProgresso");
    const feedbackElemento = document.getElementById("quizFeedback");
    const seguinteBotao = document.getElementById("quizSeguinte");
    const resultadoElemento = document.getElementById("quizResultado");
    const tituloResultado = document.getElementById("quizTituloResultado");
    const textoResultado = document.getElementById("quizTextoResultado");
    const reiniciarBotao = document.getElementById("quizReiniciar");

    // Se a secção não existir, não interfere com o resto do site.
    if (
        !perguntaElemento ||
        !respostasElemento ||
        !contadorElemento ||
        !barraElemento ||
        !feedbackElemento ||
        !seguinteBotao ||
        !resultadoElemento ||
        !tituloResultado ||
        !textoResultado ||
        !reiniciarBotao
    ) {
        return;
    }

    let indicePergunta = 0;
    let respostasEscolhidas = [];
    let quizTerminado = false;

    function mostrarPergunta() {
        const pergunta = perguntasQuiz[indicePergunta];

        contadorElemento.textContent =
            `Pergunta ${indicePergunta + 1} de ${perguntasQuiz.length}`;

        barraElemento.style.width =
            `${(indicePergunta / perguntasQuiz.length) * 100}%`;

        perguntaElemento.textContent = pergunta.pergunta;
        respostasElemento.replaceChildren();
        feedbackElemento.textContent = "";
        seguinteBotao.hidden = true;
        resultadoElemento.hidden = true;
        perguntaElemento.hidden = false;
        respostasElemento.hidden = false;
        quizTerminado = false;

        pergunta.respostas.forEach((resposta, indice) => {
            const botao = document.createElement("button");
            botao.type = "button";
            botao.textContent = resposta;

            botao.addEventListener("click", () => {
                if (quizTerminado) return;

                quizTerminado = true;
                respostasEscolhidas.push(indice);

                feedbackElemento.textContent =
                    pergunta.feedback[indice];

                respostasElemento.querySelectorAll("button").forEach((outroBotao) => {
                    outroBotao.disabled = true;
                });

                barraElemento.style.width =
                    `${((indicePergunta + 1) / perguntasQuiz.length) * 100}%`;

                seguinteBotao.textContent =
                    indicePergunta === perguntasQuiz.length - 1
                        ? "Ver o meu resultado →"
                        : "Próxima pergunta →";

                seguinteBotao.hidden = false;
            });

            respostasElemento.appendChild(botao);
        });
    }

    function mostrarResultado() {
        // Cada letra corresponde a um estilo de resposta.
        const contagem = [0, 0, 0, 0];

        respostasEscolhidas.forEach((resposta) => {
            contagem[resposta]++;
        });

        const maiorPontuacao = Math.max(...contagem);
        const empatados = contagem
            .map((pontuacao, indice) => ({ pontuacao, indice }))
            .filter((item) => item.pontuacao === maiorPontuacao)
            .map((item) => item.indice);

        // Desempate aleatório entre os estilos com mais respostas.
        const indiceResultado =
            empatados[Math.floor(Math.random() * empatados.length)];

        const resultado = resultadosQuiz[indiceResultado];

        perguntaElemento.hidden = true;
        respostasElemento.hidden = true;
        feedbackElemento.textContent = "";
        seguinteBotao.hidden = true;
        resultadoElemento.hidden = false;

        contadorElemento.textContent = "Teste concluído!";
        barraElemento.style.width = "100%";
        tituloResultado.textContent = resultado.titulo;
        textoResultado.textContent = resultado.texto;
    }

    seguinteBotao.addEventListener("click", () => {
        if (!quizTerminado) return;

        if (indicePergunta < perguntasQuiz.length - 1) {
            indicePergunta++;
            mostrarPergunta();
        } else {
            mostrarResultado();
        }
    });

    reiniciarBotao.addEventListener("click", () => {
        indicePergunta = 0;
        respostasEscolhidas = [];
        mostrarPergunta();
    });

    mostrarPergunta();
})();

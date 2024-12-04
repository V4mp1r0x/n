// Simulação de base de dados local para usuários
const users = {};

// Sistema de Registro
document.getElementById("register-button").addEventListener("click", () => {
    const username = document.getElementById("register-username").value.trim();
    const password = document.getElementById("register-password").value.trim();

    if (username && password) {
        if (!users[username]) {
            users[username] = password;
            alert("Conta criada com sucesso! Faça login para acessar.");
            document.getElementById("signup-container").style.display = "none";
            document.getElementById("login-container").style.display = "block";
        } else {
            alert("Este nome de usuário já está em uso. Tente outro.");
        }
    } else {
        alert("Por favor, preencha todos os campos.");
    }
});

// Sistema de Login
document.getElementById("login-button").addEventListener("click", () => {
    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value.trim();

    if (username && password) {
        if (users[username] && users[username] === password) {
            alert("Login bem-sucedido! Bem-vindo, " + username);
            document.getElementById("login-container").style.display = "none";
            document.getElementById("chat-container").style.display = "block";
        } else {
            alert("Nome de usuário ou senha incorretos.");
        }
    } else {
        alert("Por favor, preencha todos os campos.");
    }
});

// Base de dados de perguntas e respostas com múltiplos formatos
const predefinedResponses = [
    {
        triggers: ["oi", "olá", "e aí", "bom dia", "boa tarde", "boa noite"],
        response: "Olá! Como posso ajudar hoje?"
    },
    {
        triggers: ["tudo bem?", "oi tube bem?", "tudo certo?", "você esta bem?"],
        response: "Estou bem, pronto para te ajudar!"
    },
    {
        triggers: ["quem é você?", "o que você é?", "quem é jarvis?", "quem é você jarvis?"],
        response: "Eu sou J.A.R.V.I.S, seu assistente virtual!"
    },
    {
        triggers: ["qual é o propósito disso?", "pra que serve isso?", "qual é sua função?", "o que você faz?", "para o que você serve?"],
        response: "Ajudar você a completar suas tarefas e responder suas perguntas!"
    },
    {
        triggers: ["qual é a capital do brasil?", "qual é a cidade capital do brasil?", "onde fica a capital do brasil?"],
        response: "A capital do Brasil é Brasília."
    },
    {
        triggers: ["me conte uma piada", "me faz rir", "conte uma piada", "tem alguma piada?"],
        response: "Por que o livro de matemática ficou triste? Porque tinha muitos problemas!"
    },
    {
        triggers: ["qual é a sua cor favorita?", "do que você gosta?", "qual é sua cor predileta?"],
        response: "Minha cor favorita é azul neon. Parece tecnológica, não acha?"
    },
    {
        triggers: ["você gosta de humanos?", "o que você acha de humanos?", "você nos odeia?"],
        response: "Eu gosto de ajudar humanos! Vocês são cheios de perguntas interessantes."
    },
    {
        triggers: ["qual é a fórmula da água?", "como se escreve água na química?", "como é água na química?", "qual a fórmula da água?"],
        response: "A fórmula da água é H2O."
    },
    {
        triggers: ["como faço um bolo?", "me ensine a fazer um bolo", "como preparo um bolo?", "me ajude a preparar um bolo"],
        response: "Para fazer um bolo simples, misture ovos, açúcar, farinha, leite e fermento. Asse no forno a 180°C até dourar!"
    },
    {
        triggers: ["quem é o presidente do brasil?", "quem governa o brasil?", "quem é o líder do brasil?"],
        response: "Em 2024, o presidente do Brasil é Luiz Inácio Lula da Silva."
    },
    {
        triggers: ["adeus", "tchau", "até logo", "até mais"],
        response: "Até mais! Se precisar, estarei aqui!"
    }
];

// Função de Enviar Mensagem no Chat
function sendMessage() {
    const userInput = document.getElementById("user-input").value.trim();
    if (!userInput) return;

    addMessage(userInput, "user-message");
    getPredefinedResponse(userInput.toLowerCase());
    document.getElementById("user-input").value = "";
}

// Adiciona Mensagem ao Chat
function addMessage(message, type) {
    const messageElement = document.createElement("div");
    messageElement.className = `message ${type}`;
    messageElement.innerText = message;
    document.getElementById("chat-box").appendChild(messageElement);
    document.getElementById("chat-box").scrollTop = document.getElementById("chat-box").scrollHeight;
}

// Busca Resposta na Base de Dados
function getPredefinedResponse(userMessage) {
    for (const entry of predefinedResponses) {
        if (entry.triggers.some(trigger => userMessage.includes(trigger))) {
            setTimeout(() => addMessage(entry.response, "jarvis-message"), 500);
            return;
        }
    }
    // Resposta padrão para perguntas não reconhecidas
    setTimeout(() => addMessage("Desculpe, não sei a resposta para isso.", "jarvis-message"), 500);
}

// Evento de Clique no Botão de Enviar
document.getElementById("send-button").addEventListener("click", sendMessage);

// Evento de Tecla Enter para Enviar Mensagem
document.getElementById("user-input").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
});

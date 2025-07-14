let res = document.getElementById('res')
let btn = document.getElementById('btn-cadastrar')

window.addEventListener("DOMContentLoaded", () => {
    const hoje = new Date();
    const dataISO = hoje.toISOString().split("T")[0]; // ex: "2025-07-14"
    document.getElementById('dataSolicitacao').value = dataISO;
});



btn.addEventListener('click', () => {
    function getHoraAtual() {
        const agora = new Date();
        const hora = String(agora.getHours()).padStart(2, '0');
        const min = String(agora.getMinutes()).padStart(2, '0');
        return `${hora}:${min}`;
    }

    const saida = {
        dataSolicitacao: document.getElementById('dataSolicitacao').value,
        horaSaida: getHoraAtual(),
        motivo: document.getElementById('motivo').value,
        localDestino: document.getElementById('destino').value,
        status: document.getElementById('status').value,
        nomeProfessor: document.getElementById('nomeProfessor').value,
        nomeAluno: document.getElementById('nomeAluno').value,
        aluno_cod: document.getElementById('codAluno').value,
        professor_cod: document.getElementById('codProfessor').value
    };

    fetch('http://localhost:8081/saida', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(saida)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao cadastrar saída");
            }
            return response.json();
        })
        .then(data => {
            res.innerHTML = `<p style="color:green;">Saída cadastrada com sucesso! ID: ${data.codSaida}</p>`;
            console.log(data);
        })
        .catch(error => {
            console.error("Erro:", error);
            res.innerHTML = `<p style="color:red;">Erro ao cadastrar saída.</p>`;
        });
})

// Botão de voltar
document.getElementById('voltar').addEventListener("click", () => {
    window.location.href = '/html/index.html'
})
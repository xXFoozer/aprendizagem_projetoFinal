let res = document.getElementById('res');
let btn_consult = document.getElementById('consultar');
let btn_update = document.getElementById('atualizar');


btn_consult.addEventListener('click', async () => {
    const id = document.getElementById("codSaida").value;

    if (!id) {
        res.innerText = "Informe o código da saída.";
        return;
    }

    try {
        const response = await fetch(`http://localhost:8081/saida/${id}`);
        if (!response.ok) {
            throw new Error("Saída não encontrada.");
        }
        const saida = await response.json();

       
        horaSaidaOriginal = saida.horaSaida || null;
        horaRetornoOriginal = saida.horaRetorno || null;
        
     
        document.getElementById("dataSolicitacao").value = saida.dataSolicitacao || "";
        document.getElementById("motivo").value = saida.motivo || "";
        document.getElementById("destino").value = saida.localDestino || "";
        document.getElementById("status").value = saida.status || "";
        document.getElementById("horaSaida").value = saida.horaSaida || "";
        document.getElementById("nomeProfessor").value = saida.nomeProfessor || "";
        document.getElementById("codProfessor").value = saida.professor?.codProfessor || "";
        document.getElementById("nomeAluno").value = saida.nomeAluno || "";
        document.getElementById("codAluno").value = saida.aluno?.codAluno || "";

        res.innerText = "Saída encontrada com sucesso!";
        res.style.color = '#13a200';
    } catch (error) {
        console.error(error);
        res.innerText = "Erro ao buscar saída.";
        res.style.color = '#e20000';
    }
});


btn_update.addEventListener("click", () => {
    const id = document.getElementById("codSaida").value;

    function getHoraAtual() {
        const agora = new Date();
        const hora = String(agora.getHours()).padStart(2, '0');
        const min = String(agora.getMinutes()).padStart(2, '0');
        return `${hora}:${min}`;
    }

    if (!id) {
        res.innerHTML = `<p style="color:red;">Informe o ID da saída para atualizar.</p>`;
        return;
    }

    const saidaAtualizada = {
        dataSolicitacao: document.getElementById("dataSolicitacao").value,
        motivo: document.getElementById("motivo").value,
        localDestino: document.getElementById("destino").value,
        status: document.getElementById("status").value,
        // nomeProfessor: document.getElementById("nomeProfessor").value,
        // professor_cod: parseInt(document.getElementById("codProfessor").value),
        // nomeAluno: document.getElementById("nomeAluno").value,
        // aluno_cod: parseInt(document.getElementById("codAluno").value),
        horaSaida: horaSaidaOriginal, // preserva a hora original
        horaRetorno: horaSaidaOriginal // preserva a hora original
    };

    fetch(`http://localhost:8081/saida/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(saidaAtualizada)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro ao atualizar saída");
        }
        return response.json();
    })
    .then(data => {
        res.innerHTML = `<p style="color:green;">Saída atualizada com sucesso! ID: ${data.codSaida}</p>`;
        res.style.color = '#13a200';
    })
    .catch(error => {
        console.error("Erro:", error);
        res.innerHTML = `<p style="color:red;">Erro ao atualizar saída.</p>`;
        res.style.color = '#e20000';
    });
});

// Botão voltar
document.getElementById('voltar').addEventListener("click", () => {
    window.location.href = '../../index.html'
});
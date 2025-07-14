let res = document.getElementById('res');
let btn = document.getElementById('consultar');

btn.addEventListener('click', () => {
    const idConsult = document.getElementById('codSaida').value;

    fetch(`http://localhost:8081/saida/${idConsult}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao buscar saída");
            }
            return response.json();
        })
        .then(data => {
            if (!data || !data.codSaida) {
                res.innerHTML = "<p style='color:gray;'>Saída não encontrada.</p>";
                return;
            }

            let html = `
                <table border="1" cellpadding="10" cellspacing="0">
                    <tr>
                        <th>ID</th>
                        <th>Data Solicitação</th>
                        <th>Hora de Saída</th>
                        <th>Hora de Retorno</th>
                        <th>Motivo</th>
                        <th>Destino</th>
                        <th>Status</th>
                        <th>Nome do Responsável</th>
                        <th>Nome do Aluno</th>
                    </tr>
                    <tr>
                        <td>${data.codSaida}</td>
                        <td>${data.dataSolicitacao}</td>
                        <td>${data.horaSaida || '-'}</td>
                        <td>${data.horaRetorno || '-'}</td>
                        <td>${data.motivo}</td>
                        <td>${data.localDestino}</td>
                        <td>${data.status}</td>
                        <td>${data.nomeProfessor}</td>
                        <td>${data.nomeAluno}</td>
                    </tr>
                </table>
            `;

            res.innerHTML = html;
    
        })
        .catch(error => {
            console.error("Erro:", error);
            res.innerHTML = `<p style="color:red;">Erro ao buscar saída.</p>`;
        });
});


document.getElementById('voltar').addEventListener("click", () => {
    window.location.href = '/html/index.html'
})
let res = document.getElementById('res')
let btn = document.getElementById('listar')

btn.addEventListener('click', () => {


    fetch(`http://localhost:8081/saida`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao buscar saída");
            }
            return response.json();
        })
        .then(data => {
            if (!Array.isArray(data) || data.length === 0) {
                res.innerHTML = "<p style='color:gray;'>Nenhuma saída encontrada.</p>";
                return;
            }
        
            let html = `
            <div class="tabela-scroll">
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
            `;
        
            data.forEach(saida => {
                html += `
                    <tr>
                        <td>${saida.codSaida}</td>
                        <td>${saida.dataSolicitacao}</td>
                        <td>${saida.horaSaida || '-'}</td>
                        <td>${saida.horaRetorno || '-'}</td>
                        <td>${saida.motivo}</td>
                        <td>${saida.localDestino}</td>
                        <td>${saida.status}</td>
                        <td>${saida.nomeProfessor}</td>
                        <td>${saida.nomeAluno}</td>
                    </tr>
                `;
            });
        
            html += `</table></div>`;
            res.innerHTML = html;
        })
        .catch(error => {
            console.error("Erro:", error);
            res.innerHTML = `<p style="color:red;">Erro ao buscar saída.</p>`;
        });

})


document.getElementById('voltar').addEventListener("click", () => {
    window.location.href = '/html/index.html'
})
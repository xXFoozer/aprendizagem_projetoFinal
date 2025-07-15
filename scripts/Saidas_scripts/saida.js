
document.getElementById('cadastrar').addEventListener('click', () => {
    window.location.href = '/html/saidaCadastrar.html'
})

document.getElementById('listar').addEventListener('click', () => {
    window.location.href = '/html/saidaListar.html'
})

document.getElementById('consultar').addEventListener('click', () => {
    window.location.href = '/html/saidaConsultar.html'
})

document.getElementById('atualizar').addEventListener('click', () => {
    window.location.href = '/html/saidaAtualizar.html'
})

document.getElementById('apagar').addEventListener('click', () => {
    window.location.href = '/html/saidaApagar.html'
})

let res = document.getElementById('res');

document.addEventListener("DOMContentLoaded", () => {
    const res = document.getElementById('res');

    fetch("http://localhost:8081/saida")
        .then(response => {
            if (!response.ok) throw new Error("Erro ao buscar saída");
            return response.json();
        })
        .then(data => {
            if (!Array.isArray(data) || data.length === 0) {
                res.innerHTML = "<p style='color:gray;'>Nenhuma saída encontrada.</p>";
                return;
            }

            let html = `
                <table border="1" cellpadding="10" cellspacing="0">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Data Solicitação</th>
                            <th>Hora de Saída</th>
                            <th>Hora de Retorno</th>
                            <th>Motivo</th>
                            <th>Destino</th>
                            <th>Status</th>
                            <th>Responsável</th>
                            <th>Aluno</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            data.forEach(saida => {
                html += `
                    <tr 
                        data-id="${saida.codSaida}" 
                        data-aluno="${saida.aluno_cod}" 
                        data-professor="${saida.professor_cod}"
                    >
                        <td>${saida.codSaida}</td>
                        <td>${saida.dataSolicitacao}</td>
                        <td>${saida.horaSaida || '-'}</td>
                        <td>${saida.horaRetorno || '-'}</td>
                        <td>${saida.motivo}</td>
                        <td>${saida.localDestino}</td>
                        <td class="status">${saida.status}</td>
                        <td>${saida.nomeProfessor}</td>
                        <td>${saida.nomeAluno}</td>
                        <td>
                            <button class="btn-aprovar">Aceitar</button>
                            <button class="btn-retornou">Retornou</button>
                            <button class="btn-reprovar">Reprovar</button>
                        </td>
                    </tr>
                `;
            });


            html += `</tbody></table>`;
            res.innerHTML = html;

            function formatarHora(hora) {
                if (!hora || hora === "-") return null;
                return hora.length === 5 ? hora + ":00" : hora;
            }

            document.querySelectorAll('.btn-aprovar').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    const row = e.target.closest('tr');
                    const id = row.dataset.id;

                    console.log('antes de passar')
                    
                    const dto = {
                        dataSolicitacao: row.cells[1].textContent,
                        horaSaida: formatarHora(row.cells[2].textContent),
                        horaRetorno: formatarHora(row.cells[3].textContent),
                        motivo: row.cells[4].textContent,
                        localDestino: row.cells[5].textContent,
                        status: "Aprovado",
                        nomeProfessor: row.cells[7].textContent,
                        nomeAluno: row.cells[8].textContent,
                     
                    };
                    
                    console.log('depois de passar',dto)

                    const response = await fetch(`http://localhost:8081/saida/${id}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(dto)
                    });

                    if (response.ok) {
                        alert("Saída aprovada com sucesso!");
                        row.querySelector(".status").textContent = "Aprovado";
                    } else {
                        alert("Erro ao aprovar.");
                    }
                });
            });
//---------------------------------------------------------------------------------------------------------------------
            document.querySelectorAll('.btn-reprovar').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    const row = e.target.closest('tr');
                    const id = row.dataset.id;

                    // console.log('antes de passar')
                    
                    // const dto = {
                    //     dataSolicitacao: row.cells[1].textContent,
                    //     horaSaida: formatarHora(row.cells[2].textContent),
                    //     horaRetorno: formatarHora(row.cells[3].textContent),
                    //     motivo: row.cells[4].textContent,
                    //     localDestino: row.cells[5].textContent,
                    //     status: "Reprovado",
                    //     nomeProfessor: row.cells[7].textContent,
                    //     nomeAluno: row.cells[8].textContent,
                     
                    // };
                    
                    // console.log('depois de passar',dto)

                    const response = await fetch(`http://localhost:8081/saida/${id}`, {
                        method: "DELETE",
                    });

                    if (response.ok) {
                        alert("Saída Reprovada com sucesso!");
                        row.querySelector(".status").textContent = "Reprovado";
                    } else {
                        alert("Erro ao Reprovar.");
                    }

                    location.reload();
                });
            });


        })




});
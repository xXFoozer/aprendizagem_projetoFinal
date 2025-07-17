document.getElementById('alunos').addEventListener("click", () => {
    window.location.href = '/html/alunos.html'
})
document.getElementById('professores').addEventListener("click", () => {
    window.location.href = '/html/professor.html'
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
            <div class="tabela-scroll">
                <table border="1" cellpadding="10" cellspacing="0">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Data Solicitação</th>
                            <th>Hora de Saída</th>
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
                if (saida.status === 'Pendente' || saida.status === 'Aprovado') {
                    html += `
                        <tr 
                            data-id="${saida.codSaida}" 
                            data-aluno="${saida.aluno_cod}" 
                            data-professor="${saida.professor_cod}"
                        >
                            <td>${saida.codSaida}</td>
                            <td>${saida.dataSolicitacao}</td>
                            <td>${saida.horaSaida || '-'}</td>
                            <td>${saida.motivo}</td>
                            <td>${saida.localDestino}</td>
                            <td class="status">${saida.status}</td>
                            <td>${saida.nomeProfessor}</td>
                            <td>${saida.nomeAluno}</td>
                            <td>
                                ${saida.status === "Aprovado" ?
                                    `<button class="btn-retornou">Retornou</button>` :
                                    `<button class="btn-aprovar">Aceitar</button>
                                <button class="btn-reprovar">Reprovar</button>`
                                }
                            </td>
                        </tr>
                    `;
                }
            });

            html += `</tbody></table></div>`;
            res.innerHTML = html;
            
            function getHoraAtual() {
                const agora = new Date();
                const hora = String(agora.getHours()).padStart(2, '0');
                const min = String(agora.getMinutes()).padStart(2, '0');
                return `${hora}:${min}`;
            }

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
                        horaRetorno: null, 
                        motivo: row.cells[3].textContent,
                        localDestino: row.cells[4].textContent,
                        status: "Aprovado",
                        nomeProfessor: row.cells[6].textContent,
                        nomeAluno: row.cells[7].textContent,

                    };

                    console.log('depois de passar', dto)

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
                    location.reload();

                });
            });
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            document.querySelectorAll('.btn-retornou').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    const row = e.target.closest('tr');
                    const id = row.dataset.id;

                    console.log('antes de retornar')
                    location.reload();

                    const dto = {
                        dataSolicitacao: row.cells[1].textContent,
                        horaSaida: formatarHora(row.cells[2].textContent),
                        horaRetorno: getHoraAtual(),
                        motivo: row.cells[3].textContent,
                        localDestino: row.cells[4].textContent,
                        status: "Retornado",
                        nomeProfessor: row.cells[6].textContent,
                        nomeAluno: row.cells[7].textContent,

                    };

                    console.log('depois de passar', dto)

                    const response = await fetch(`http://localhost:8081/saida/${id}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(dto)
                    });

                    if (response.ok) {
                        alert("Aluno retornou com sucesso!");
                        row.querySelector(".status").textContent = "Retornou";
                    } else {
                        alert("Erro ao registrar retorno.");
                    }
                });
            });
 //-----------------------REPROVOU-ABAIXO----------------------------------------------------------------------------------------------
            document.querySelectorAll('.btn-reprovar').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    const row = e.target.closest('tr');
                    const id = row.dataset.id;

                    // console.log('antes de passar')

                    const dto = {
                        dataSolicitacao: row.cells[1].textContent,
                        horaSaida: formatarHora(row.cells[2].textContent),
                        horaRetorno: null,
                        motivo: row.cells[3].textContent,
                        localDestino: row.cells[4].textContent,
                        status: "Aprovado", 
                        nomeProfessor: row.cells[6].textContent,
                        nomeAluno: row.cells[7].textContent,
                    };

                    // console.log('depois de passar',dto)

                    const response = await fetch(`http://localhost:8081/saida/${id}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(dto)
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
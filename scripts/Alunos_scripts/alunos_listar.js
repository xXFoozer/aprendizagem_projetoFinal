let res = document.getElementById('res')
let btn = document.getElementById('listar')

btn.addEventListener('click',()=>{

    fetch(`http://localhost:8081/aluno`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao Listar Aluno")
            }
            return response.json()
        })
        .then(data => {
            if (data.length === 0) {
                res.innerHTML = "<p style='color:gray;'>Nenhum aluno encontrado.</p>";
                return;
            }
    
            let html = `
                <table border="1" cellpadding="10" cellspacing="0">
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Sobrenome</th>
                        <th>Matrícula</th>
                        <th>Telefone</th>
                        <th>Email</th>
                    </tr>
            `;
    
            data.forEach(aluno => {
                html += `
                    <tr>
                        <td>${aluno.codAluno}</td>
                        <td>${aluno.nome}</td>
                        <td>${aluno.sobrenome}</td>
                        <td>${aluno.matricula}</td>
                        <td>${aluno.telefone}</td>
                        <td>${aluno.email}</td>
                    </tr>
                `;
            });
    
            html += "</table>";
            res.innerHTML = html;
        })
        .catch(error => {
            console.error("Erro:", error);
            res.innerHTML = `<p style="color:red;">Erro ao buscar alunos.</p>`;
        });
})


document.getElementById('voltar').addEventListener("click", () => {
    window.location.href = '/html/alunos.html'
})
let res = document.getElementById('res')
let btn = document.getElementById('listar')

btn.addEventListener('click',()=>{

    fetch(`http://localhost:8081/professor`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao Listar Professor")
            }
            return response.json()
        })
        .then(data => {
            if (data.length === 0) {
                res.innerHTML = "<p style='color:gray;'>Nenhum professor encontrado.</p>";
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
    
            data.forEach(professor => {
                html += `
                    <tr>
                        <td>${professor.codProfessor}</td>
                        <td>${professor.nome}</td>
                        <td>${professor.sobrenome}</td>
                        <td>${professor.matricula}</td>
                        <td>${professor.telefone}</td>
                        <td>${professor.email}</td>
                    </tr>
                `;
            });
    
            html += "</table>";
            res.innerHTML = html;
        })
        .catch(error => {
            console.error("Erro:", error);
            res.innerHTML = `<p style="color:red;">Erro ao buscar professores.</p>`;
        });
})


document.getElementById('voltar').addEventListener("click", () => {
    window.location.href = '/html/professor.html'
})
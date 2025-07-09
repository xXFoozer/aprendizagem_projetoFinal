let res = document.getElementById('res')
let btn = document.getElementById('btn-cadastrar')

btn.addEventListener('click', () => {
    const aluno = {
        nome: document.getElementById('nome').value,
        sobrenome: document.getElementById('sobrenome').value,
        matricula: Number(document.getElementById('matricula').value),
        telefone: document.getElementById('telefone').value,
        email: document.getElementById('email').value
    };

    fetch('http://localhost:8081/aluno', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(aluno)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao cadastrar Aluno")
            }
            return response.json()
        })
        .then(data =>{
            res.innerHTML = `<p style="color:green;">Aluno cadastrado com sucesso! ID: ${data.codAluno}</p>`;
            console.log(data)
        })
        .catch(error => {
            console.error("Erro:", error);
            res.innerHTML = `<p style="color:red;">Erro ao cadastrar aluno.</p>`;
        })
})

// Botão de voltar
document.getElementById('voltar').addEventListener("click", () => {
    window.location.href = '/html/alunos.html'
})
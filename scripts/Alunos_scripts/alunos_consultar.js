let res = document.getElementById('res')
let btn = document.getElementById('consultar')

btn.addEventListener('click',()=>{
    const idConsult = document.getElementById('codAluno').value

    fetch(`http://localhost:8081/aluno/${idConsult}`)
    .then(response =>{
        if (!response.ok) {
            throw new Error("Erro ao Buscar Aluno")
        }
        return response.json()
    })
    .then(aluno =>{
        res.innerHTML = `
        <p><strong>Nome do Aluno:</strong> ${aluno.nome}</p>
        <p><strong>Sobrenome do Aluno:</strong> ${aluno.sobrenome}</p>
        <p><strong>Matrícula:</strong> ${aluno.matricula}</p>
        <p><strong>Telefone do Aluno:</strong> ${aluno.telefone}</p>
        <p><strong>Email do Aluno:</strong> ${aluno.email}</p>
        `;
        res.style.marginTop ='150px'
        res.style.width = '720px'
        res.style.height = '155px'
        res.style.backgroundColor= '#d9d9d9'
        res.style.display = 'flex'
        res.style.flexDirection = 'column'
        res.style.alignItems = 'center'
        res.style.justifyContent = 'center'
        res.style.borderRadius = '16px'
    })
    .catch(error => {
        console.error("Erro:", error);
        res.innerHTML = `<p style="color:red;">Erro ao buscar alunos.</p>`;
    })

})

document.getElementById('voltar').addEventListener("click",()=>{
    window.location.href = '/html/alunos.html'
})
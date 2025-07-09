let res = document.getElementById('res')
let btn = document.getElementById('apagar')

btn.addEventListener('click', () => {
    const idConsult = document.getElementById('codAluno').value

    fetch(`http://localhost:8081/aluno/${idConsult}`,{
        method:'DELETE'
    }
    )
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao Buscar Aluno")
            }
            res.innerHTML = `<p style="color:green;">Aluno com ID ${idConsult} apagado com sucesso!</p>`;
        })
        .catch(error => {
            console.error("Erro:", error);
            res.innerHTML = `<p style="color:red;">Erro ao deletar aluno.</p>`;
        })

})


document.getElementById('voltar').addEventListener("click", () => {
    window.location.href = '/html/alunos.html'
})
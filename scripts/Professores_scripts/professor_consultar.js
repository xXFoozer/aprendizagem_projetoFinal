let res = document.getElementById('res')
let btn = document.getElementById('consultar')

btn.addEventListener('click',()=>{
    const idConsult = document.getElementById('codProfessor').value

    fetch(`http://localhost:8081/professor/${idConsult}`)
    .then(response =>{
        if (!response.ok) {
            throw new Error("Erro ao Buscar Professor")
        }
        return response.json()
    })
    .then(professor =>{
        res.innerHTML = `
        <p><strong>Nome do Professor:</strong> ${professor.nome}</p>
        <p><strong>Sobrenome do Professor:</strong> ${professor.sobrenome}</p>
        <p><strong>Matrícula:</strong> ${professor.matricula}</p>
        <p><strong>Telefone do Professor:</strong> ${professor.telefone}</p>
        <p><strong>Email do Professor:</strong> ${professor.email}</p>
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
        res.innerHTML = `<p style="color:red;">Erro ao buscar Professor.</p>`;
    })

})

document.getElementById('voltar').addEventListener("click",()=>{
    window.location.href = '/html/professor.html'
})
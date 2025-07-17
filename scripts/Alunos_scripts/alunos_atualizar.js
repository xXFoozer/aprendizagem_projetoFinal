let res = document.getElementById('res')
let btn_consult = document.getElementById('consultar')
let btn_update = document.getElementById('atualizar')

btn_consult.addEventListener('click', async () => {
    const id = document.getElementById("codAluno").value

    if (!id) {
        res.innerHTML = `<p style="color:red;">Informe o ID do aluno para atualizar.</p>`;
        return;
    }

    try {
        const response = await fetch(`http://localhost:8081/aluno/${id}`);
        if (!response.ok) {
            throw new Error("Aluno não encontrado.");
        }
        const aluno = await response.json();

        document.getElementById("nome").value = aluno.nome || "";
        document.getElementById("sobrenome").value = aluno.sobrenome || "";
        document.getElementById("matricula").value = aluno.matricula || "";
        document.getElementById("telefone").value = aluno.telefone || "";
        document.getElementById("email").value = aluno.email || "";
        document.getElementById("res").innerText = "Aluno encontrado com sucesso!";

        res.style.display = 'flex'
        res.style.alignItems = 'center'
        res.style.justifyContent = 'center'
        res.style.color = '#13a200'
        res.style.marginTop = '10px'
    } catch (error) {
        console.error(error);
        document.getElementById("res").innerText = "Erro ao buscar aluno.";
        res.style.color = '#e20000'
        res.style.display = 'flex'
        res.style.alignItems = 'center'
        res.style.justifyContent = 'center'
        res.style.marginTop = '10px'
    }
})

btn_update.addEventListener("click", function () {
    const id = document.getElementById("codAluno").value;

    if (!id) {
        res.innerHTML = `<p style="color:red;">Informe o ID do aluno para atualizar.</p>`;
        return;
    }

    const aluno = {
        nome: document.getElementById("nome").value,
        sobrenome: document.getElementById("sobrenome").value,
        matricula: parseInt(document.getElementById("matricula").value),
        telefone: document.getElementById("telefone").value,
        email: document.getElementById("email").value
    };

    fetch(`http://localhost:8081/aluno/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(aluno)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao atualizar aluno");
            }
            if (response.status === 204) {
                return {};
            }
            return response.json();
        })
        .then(data => {
            res.innerHTML = `<p style="color:green;">Aluno atualizado com sucesso! ID: ${data.codAluno}</p>`;
            res.style.color = '#13a200';
            console.log("Atualizado:", aluno);
        })
        .catch(error => {
            console.error("Erro:", error);
            res.innerHTML = `<p style="color:red;">Erro ao atualizar aluno.</p>`;
            res.style.color = '#e20000';
        });
});


document.getElementById('voltar').addEventListener("click", () => {
    window.location.href = '/html/alunos.html'
})
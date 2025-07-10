let res = document.getElementById('res')
let btn_consult = document.getElementById('consultar')
let btn_update = document.getElementById('atualizar')

btn_consult.addEventListener('click', async () => {
    const id = document.getElementById("codProfessor").value

    if (!id) {
        document.getElementById("res").innerText = "";
        return;
    }

    try {
        const response = await fetch(`http://localhost:8081/professor/${id}`);
        if (!response.ok) {
            throw new Error("Professor não encontrado.");
        }
        const professor = await response.json();

        document.getElementById("nome").value = professor.nome || "";
        document.getElementById("sobrenome").value = professor.sobrenome || "";
        document.getElementById("matricula").value = professor.matricula || "";
        document.getElementById("telefone").value = professor.telefone || "";
        document.getElementById("email").value = professor.email || "";
        document.getElementById("res").innerText = "Professor encontrado com sucesso!";

        res.style.display = 'flex'
        res.style.alignItems = 'center'
        res.style.justifyContent = 'center'
        res.style.color = '#13a200'
        res.style.marginTop = '10px'
    } catch (error) {
        console.error(error);
        document.getElementById("res").innerText = "Erro ao buscar Professor.";
        res.style.color = '#e20000'
        res.style.display = 'flex'
        res.style.alignItems = 'center'
        res.style.justifyContent = 'center'
        res.style.marginTop = '10px'
    }
})

btn_update.addEventListener("click", function () {
    const id = document.getElementById("codProfessor").value;

    if (!id) {
        res.innerHTML = `<p style="color:red;">Informe o ID do Professor para atualizar.</p>`;
        return;
    }

    const professor = {
        nome: document.getElementById("nome").value,
        sobrenome: document.getElementById("sobrenome").value,
        matricula: parseInt(document.getElementById("matricula").value),
        telefone: document.getElementById("telefone").value,
        email: document.getElementById("email").value
    };

    fetch(`http://localhost:8081/professor/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(professor)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao atualizar Professor");
            }
            return response.json();
        })
        .then(data => {
            res.innerHTML = `<p style="color:green;">Professor atualizado com sucesso! ID: ${data.codProfessor}</p>`;
            res.style.color = '#13a200';
        })
        .catch(error => {
            console.error("Erro:", error);
            res.innerHTML = `<p style="color:red;">Erro ao atualizar Professor.</p>`;
            res.style.color = '#e20000';
        });
});


document.getElementById('voltar').addEventListener("click", () => {
    window.location.href = '/html/professor.html'
})
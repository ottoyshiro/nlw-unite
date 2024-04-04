let participantes = [
  {
    nome: "Diego Fernandes",
    email: "diego@hotmail.com",
    dataInscricao: new Date(2024, 3, 1, 21, 10),
    dataCheckIn: null,
  },
  {
    nome: "Mayk Brito",
    email: "mayk@gmail.com",
    dataInscricao: new Date(2024, 2, 2, 19, 22),
    dataCheckIn: null,
  },
  {
    nome: "Ana Silva",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 2, 2, 10, 15),
    dataCheckIn: new Date(2024, 2, 2, 12, 20),
  },
  {
    nome: "João Oliveira",
    email: "joao@gmail.com",
    dataInscricao: new Date(2024, 2, 2, 14, 45),
    dataCheckIn: new Date(2024, 2, 5, 9, 0),
  },
  {
    nome: "Maria Souza",
    email: "maria@gmail.com",
    dataInscricao: new Date(2024, 2, 4, 8, 0),
    dataCheckIn: new Date(2024, 2, 6, 15, 20),
  },
  {
    nome: "Pedro Santos",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2024, 2, 5, 16, 20),
    dataCheckIn: null,
  },
  {
    nome: "Luciana Lima",
    email: "luciana@gmail.com",
    dataInscricao: new Date(2024, 2, 6, 11, 20),
    dataCheckIn: new Date(2024, 2, 8, 10, 0),
  },
  {
    nome: "Rafaela Oliveira",
    email: "rafaela@gmail.com",
    dataInscricao: new Date(2024, 2, 7, 19, 0),
    dataCheckIn: new Date(2024, 2, 9, 14, 15),
  },
  {
    nome: "Felipe Costa",
    email: "felipe@gmail.com",
    dataInscricao: new Date(2024, 2, 8, 15, 10),
    dataCheckIn: new Date(2024, 2, 10, 17, 20),
  },
  {
    nome: "Carla Santos",
    email: "carla@gmail.com",
    dataInscricao: new Date(2024, 2, 9, 12, 45),
    dataCheckIn: new Date(2024, 2, 11, 9, 45),
  }
]

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now())
  .to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now())
  .to(participante.dataCheckIn)

  if (participante.dataCheckIn == null) {
    dataCheckIn = `
      <button
        data-email="${participante.email}" 
        onclick="fazerCheckIn(event)"
      >
        Confirmar Check-In
      </button>
    ` 
  }

  return `<tr>
      <td>
        <strong>${participante.nome}</strong>
        <br>
        <small>${participante.email}</small>
      </td>
      <td>${dataInscricao}</td>
      <td>${dataCheckIn}</td>
    </tr>`
}

const atualizarLista = (participantes) => {

let output = ""

for (let participante of participantes) {
output = output + criarNovoParticipante(participante)
}

document
  .querySelector('tbody')
  .innerHTML = output
}

atualizarLista(participantes)


const adicionarParticipante = (event) => {
  event.preventDefault()

  const formData = new FormData(event.target)

  const participante = {
    nome: formData.get('nome'),
    email: formData.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

const participanteExiste = participantes.find(
  (p) => p.email == participante.email
)

if (participanteExiste) {
  alert('Email já cadastrado! Por favor tente outro email.')
  return
}

participantes = [participante, ...participantes]
atualizarLista(participantes)

event.target.querySelector('[name="nome"]').value = ""
event.target.querySelector('[name="email"]').value = ""

} 

const fazerCheckIn = (event) => {
const mensagem = "Tem certeza que deseja fazer o check-in?"
 
if (confirm(mensagem) == false) {
return
}


const participante = participantes.find(
  (p) => p.email == event.target.dataset.email
)

participante.dataCheckIn = new Date()


atualizarLista(participantes)
}


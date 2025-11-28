<script setup>
import { ref } from 'vue';
import axios from 'axios';

const cepDigitado = ref('');
const dadosEndereco = ref(null);
const mensagemErro = ref('');
const carregando = ref(false);

const buscar = async () => {
  dadosEndereco.value = null;
  mensagemErro.value = '';
  carregando.value = true;

  // Validação simples
  if (cepDigitado.value.length < 8) {
    mensagemErro.value = "Digite 8 números.";
    carregando.value = false;
    return;
  }

  try {
    const resposta = await axios.get(`http://localhost:3000/api/cep/${cepDigitado.value}`);
    dadosEndereco.value = resposta.data;
  } catch (erro) {
    if (erro.code === "ERR_NETWORK") {
      mensagemErro.value = "O servidor Backend está desligado.";
    } else {
      mensagemErro.value = "CEP não encontrado.";
    }
  } finally {
    carregando.value = false;
  }
}
</script>

<template>
  <div class="layout-pagina">
    <header class="cabecalho">
      <div class="container-limite">
        <h1>🇧🇷 Busca CEP Brasil</h1>
      </div>
    </header>

    <main class="conteudo">
      <div class="container-limite">
        
        <div class="painel-busca">
          <h2>Consultar Endereço</h2>
          
          <div class="input-area">
            <input 
              v-model="cepDigitado" 
              type="text" 
              placeholder="Digite o CEP..." 
              maxlength="8"
              @keyup.enter="buscar"
            />
            <button @click="buscar" :disabled="carregando">
              {{ carregando ? '...' : '🔍' }}
            </button>
          </div>

          <p v-if="mensagemErro" class="msg-erro">
            {{ mensagemErro }}
          </p>

        </div>

        <div v-if="dadosEndereco" class="tabela-resultado">
          <div class="linha">
            <strong>Logradouro:</strong> {{ dadosEndereco.logradouro }}
          </div>
          <div class="linha">
            <strong>Bairro:</strong> {{ dadosEndereco.bairro }}
          </div>
          <div class="linha">
            <strong>Cidade:</strong> {{ dadosEndereco.localidade }} - {{ dadosEndereco.uf }}
          </div>
          <div class="linha">
            <strong>CEP:</strong> {{ dadosEndereco.cep }}
          </div>
        </div>

      </div>
    </main>

    <footer class="rodape">
      <div class="container-limite">
        <p>Desenvolvido por <strong>Matheus Henrique da Conceição Bispo</strong></p>
      </div>
    </footer>
  </div>
</template>

<style>
/* RESET GLOBAL - Isso garante que não tenha "quebra" nem margens brancas */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #f4f4f9;
  font-family: Arial, Helvetica, sans-serif;
}
</style>

<style scoped>
/* ESTRUTURA DA PÁGINA */
.layout-pagina {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Garante que o rodapé vá para o final se a tela for grande */
}

/* Limita a largura do conteúdo para não esticar demais em monitores grandes */
.container-limite {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;
}

/* CABEÇALHO */
.cabecalho {
  background-color: #009c3b; /* Verde Brasil */
  color: white;
  padding: 20px 0;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.cabecalho h1 {
  font-size: 1.5rem;
}

/* CONTEÚDO (MAIN) */
.conteudo {
  flex: 1; /* Empurra o rodapé para baixo */
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* PAINEL DE BUSCA */
.painel-busca {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  width: 100%;
  max-width: 600px;
  text-align: center;
  border-top: 4px solid #ffdf00; /* Detalhe Amarelo */
  margin: 0 auto; /* Centraliza */
}

.painel-busca h2 {
  color: #002776;
  margin-bottom: 20px;
}

.input-area {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

input {
  flex: 1;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white; /* Força fundo branco */
  color: #333;
}

button {
  padding: 12px 20px;
  background-color: #002776;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2rem;
}

button:hover {
  background-color: #003a8c;
}

.msg-erro {
  color: red;
  margin-top: 10px;
  font-weight: bold;
}

/* RESULTADOS */
.tabela-resultado {
  background: white;
  margin-top: 20px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  width: 100%;
  max-width: 600px; /* Mesma largura da busca */
  margin-left: auto;
  margin-right: auto;
}

.linha {
  padding: 15px;
  border-bottom: 1px solid #eee;
  color: #333;
}

.linha:last-child {
  border-bottom: none;
}

/* RODAPÉ */
.rodape {
  background-color: #333;
  color: #fff;
  padding: 20px 0;
  text-align: center;
  margin-top: auto;
}

.rodape strong {
  color: #ffdf00;
}
</style>
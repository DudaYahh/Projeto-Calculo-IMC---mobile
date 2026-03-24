import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const [nome, setNome] = useState("");
  const [sexo, setSexo] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [lista, setLista] = useState<any[]>([]);

  function calcularIMC() {
    const pesoNum = parseFloat(peso);
    const alturaNum = parseFloat(altura);

    if (!pesoNum || !alturaNum) return;

    let imc = pesoNum / (alturaNum * alturaNum);
    let condicao = "";

    if (sexo.toUpperCase() === "F") {
      if (imc < 19.1) condicao = "Abaixo do peso";
      else if (imc <= 25.8) condicao = "Peso normal";
      else if (imc <= 27.3) condicao = "Marginalmente acima do peso";
      else if (imc <= 32.3) condicao = "Acima do peso ideal";
      else condicao = "Obeso";
    } else {
      if (imc < 20.7) condicao = "Abaixo do peso";
      else if (imc <= 26.4) condicao = "Peso normal";
      else if (imc <= 27.8) condicao = "Marginalmente acima do peso";
      else if (imc <= 31.1) condicao = "Acima do peso ideal";
      else condicao = "Obeso";
    }

    const pessoa = {
      nome,
      sexo,
      peso,
      altura,
      imc: imc.toFixed(2),
      condicao,
    };

    setLista([...lista, pessoa]);

    setNome("");
    setSexo("");
    setPeso("");
    setAltura("");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Calculadora de IMC</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Sexo (M ou F)"
        value={sexo}
        onChangeText={setSexo}
      />

      <TextInput
        style={styles.input}
        placeholder="Peso (kg)"
        keyboardType="numeric"
        value={peso}
        onChangeText={setPeso}
      />

      <TextInput
        style={styles.input}
        placeholder="Altura (m)"
        keyboardType="numeric"
        value={altura}
        onChangeText={setAltura}
      />

      <TouchableOpacity style={styles.botao} onPress={calcularIMC}>
        <Text style={styles.textoBotao}>Calcular IMC</Text>
      </TouchableOpacity>

      <ScrollView style={styles.lista}>
        {lista.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text>Nome: {item.nome}</Text>
            <Text>Sexo: {item.sexo}</Text>
            <Text>Peso: {item.peso}</Text>
            <Text>Altura: {item.altura}</Text>
            <Text>IMC: {item.imc}</Text>
            <Text>Condição: {item.condicao}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 20,
    paddingTop: 60,
  },

  titulo: {
    fontSize: 28,
    color: "#38bdf8",
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },

  input: {
    backgroundColor: "#1e293b",
    color: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },

  botao: {
    backgroundColor: "#22c55e",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },

  textoBotao: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  lista: {
    marginTop: 10,
  },

  card: {
    backgroundColor: "#e2e8f0",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
});

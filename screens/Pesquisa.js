import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function Pesquisa() {
  const [termoBusca, setTermoBusca] = useState('');
  const [resultados, setResultados] = useState([]);
  const [buscando, setBuscando] = useState(false);
  const [termoPesquisado, setTermoPesquisado] = useState('');

  const realizarPesquisa = () => {
    if (!termoBusca.trim()) {
      return;
    }

    setBuscando(true);
    setTermoPesquisado(termoBusca);

    setTimeout(() => {
      const mockResultados = [
        { id: 1, titulo: 'Risoto de Funghi', categoria: 'Massas' },
        { id: 2, titulo: 'Salada Caesar', categoria: 'Saladas' },
        { id: 3, titulo: 'Bolo de Chocolate', categoria: 'Sobremesas' }
      ];

      setResultados(mockResultados);
      setBuscando(false);
    }, 1000);
  };

  const renderResultadoItem = ({ item }) => (
    <TouchableOpacity style={estilosPesquisa.resultadoItem}>
      <View style={estilosPesquisa.resultadoConteudo}>
        <Text style={estilosPesquisa.tituloResultado}>{item.titulo}</Text>
        <Text style={estilosPesquisa.categoriaResultado}>{item.categoria}</Text>
      </View>
      <FontAwesome name="chevron-right" size={16} color="#bbb" />
    </TouchableOpacity>
  );

  return (
    <View style={estilosPesquisa.container}>
      <View style={estilosPesquisa.cabecalho}>
        <Text style={estilosPesquisa.titulo}>Pesquisar</Text>
        <Text style={estilosPesquisa.subtitulo}>Encontre suas receitas favoritas</Text>
      </View>

      <View style={estilosPesquisa.barraPesquisa}>
        <FontAwesome name="search" size={20} color="#666" style={estilosPesquisa.iconePesquisa} />
        <TextInput
          placeholder="Digite o nome da receita..."
          style={estilosPesquisa.campoPesquisa}
          value={termoBusca}
          onChangeText={setTermoBusca}
          returnKeyType="search"
          onSubmitEditing={realizarPesquisa}
        />
        {termoBusca ? (
          <TouchableOpacity
            style={estilosPesquisa.botaoLimpar}
            onPress={() => setTermoBusca('')}
          >
            <FontAwesome name="times-circle" size={18} color="#999" />
          </TouchableOpacity>
        ) : null}
      </View>

      <TouchableOpacity
        style={estilosPesquisa.botaoBuscar}
        onPress={realizarPesquisa}
      >
        <Text style={estilosPesquisa.textoBotaoBuscar}>Buscar Receitas</Text>
      </TouchableOpacity>

      <View style={estilosPesquisa.conteudoResultados}>
        {buscando ? (
          <View style={estilosPesquisa.loaderContainer}>
            <ActivityIndicator size="large" color="#3498db" />
            <Text style={estilosPesquisa.textoCarregando}>Buscando receitas...</Text>
          </View>
        ) : (
          <>
            {termoPesquisado ? (
              <Text style={estilosPesquisa.infoResultados}>
                {resultados.length > 0
                  ? `Resultados para "${termoPesquisado}"`
                  : `Nenhum resultado encontrado para "${termoPesquisado}"`}
              </Text>
            ) : null}

            {resultados.length > 0 ? (
              <FlatList
                data={resultados}
                renderItem={renderResultadoItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={estilosPesquisa.listaResultados}
              />
            ) : termoPesquisado ? (
              <View style={estilosPesquisa.semResultados}>
                <FontAwesome name="search" size={50} color="#ddd" />
                <Text style={estilosPesquisa.textoSemResultados}>
                  Nenhuma receita encontrada
                </Text>
                <Text style={estilosPesquisa.dicaSemResultados}>
                  Tente mudar os termos da sua busca
                </Text>
              </View>
            ) : (
              <View style={estilosPesquisa.estadoInicial}>
                <FontAwesome name="search" size={60} color="#eee" />
                <Text style={estilosPesquisa.textoEstadoInicial}>
                  Digite algo para pesquisar receitas
                </Text>
              </View>
            )}
          </>
        )}
      </View>
    </View>
  );
}

const estilosPesquisa = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginTop: 20,
  },
  cabecalho: {
    padding: 20,
    paddingBottom: 15,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitulo: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  barraPesquisa: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  iconePesquisa: {
    padding: 10,
  },
  campoPesquisa: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  botaoLimpar: {
    padding: 10,
  },
  botaoBuscar: {
    backgroundColor: '#3498db',
    marginHorizontal: 20,
    marginTop: 10,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  textoBotaoBuscar: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  conteudoResultados: {
    flex: 1,
    marginTop: 20,
  },
  infoResultados: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  listaResultados: {
    paddingHorizontal: 20,
  },
  resultadoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  resultadoConteudo: {
    flex: 1,
  },
  tituloResultado: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  categoriaResultado: {
    fontSize: 14,
    color: '#666',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoCarregando: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  estadoInicial: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoEstadoInicial: {
    marginTop: 20,
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  semResultados: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoSemResultados: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  dicaSemResultados: {
    marginTop: 8,
    fontSize: 14,
    color: '#999',
    paddingHorizontal: 20,
    textAlign: 'center',
  },
});
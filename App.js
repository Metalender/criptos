import { StatusBar } from 'react-native';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, SafeAreaView } from 'react-native';
import Moneda from './componentes/Moneda';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: [],
      refreshing: false,
      search: "",
    }
  }


  loadCoins = async () => {
    try {
      const res = await fetch(
        "https://api.binance.com/api/v3/ticker/24hr"
      );

      const cryptos = await res.json();
      const filteredCryptos = cryptos.filter((coin) => coin.symbol.includes("USDT"));
      this.setState({ coins: filteredCryptos });
    } catch (error) {
      console.error("Error", error);

    }
  }

  componentDidMount() {
    this.loadCoins();
  }

  render() {

    const { coins, refreshing, search } = this.state;

    return (
      <SafeAreaView  style={[styles.container]}>
        <StatusBar backgroundColor="#141414" barStyle="light-content" />

        <View style={styles.header}>
          <Text style={styles.title}>CryptoMarket</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search a Coin"
            placeholderTextColor="#858585"
            onChangeText={(text) => this.setState({ search: text })}
          />

        </View>


        <FlatList
          style={styles.list}
          data={coins.filter(
            (coin) =>
              coin.symbol.toLowerCase().includes(search.toLowerCase())
          )}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Moneda coin={item}  />
          )}
          refreshing={refreshing}
          onRefresh={async () => {
            this.setState({ refreshing: true });
            await this.loadCoins();
            this.setState({ refreshing: false });
          }}
        />
    </SafeAreaView >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#bababa",
    flex: 1,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    width: "85%",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  title: {
    fontSize: 30,
    color: "#000000",
    fontFamily: "Helvetica",
    marginTop: 16,
  },
  list: {
    width: "90%",
  },
  searchInput: {
    marginTop: 16,
    marginRight: 100,
    color: "#000000",
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
    width: "30%",
    textAlign: "left",
    fontFamily: "Helvetica",
  },
});
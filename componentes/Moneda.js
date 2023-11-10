import { Component, } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Modal, ScrollView } from "react-native";

export default class Moneda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibilidad: false,
      coinArray: [],
    }
  }

  deleteSearch(symbol) {
    const filtrado = symbol.replace("USDT", "");
    return filtrado;
  }

  removeSubstract(priceChange) {
    return priceChange.startsWith('-') ? priceChange.slice(1) : priceChange;
  }

  Abrir = (coin) => {
    const coinArray = Object.keys(coin).map((key) => ({
      name: key,
      value: coin[key],
    }));

    this.setState({ visibilidad: true, coinArray });
  };

  Cerrar = () => {
    this.setState({ visibilidad: false, coinArray: [] });
  };

  render() {
    const { coin } = this.props;
    const { coinArray } = this.state;
    const filtrado = this.deleteSearch(coin.symbol);
    const priceChange = this.removeSubstract(coin.priceChange);

    return (
      <View>

        <View style={styles.containerItem}>
          <View style={styles.coinName}>
            <TouchableOpacity style={styles.containerNames} onPress={() => this.Abrir(coin)}>
              <Text style={styles.coinName}>{filtrado}</Text>
              <Text style={styles.textSymbol}>{coin.symbol}</Text>
            </TouchableOpacity>

          </View>
          <View>
            <Text style={styles.textPrice}>${priceChange}</Text>
            <Text
              style={[
                styles.pricePercentage,
                coin.priceChangePercent > 0
                  ? styles.priceUp
                  : styles.priceDown,
              ]}
            >

              {coin.priceChangePercent}%
            </Text>
          </View>
        </View>
        <Modal visible={this.state.visibilidad} animationType="slide" >
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.return} onPress={this.Cerrar}>
              <Text style={styles.returnText}>Volver</Text>
            </TouchableOpacity>
            <ScrollView >
              {coinArray.map((coins, index) => (
                <View style={styles.modalRow} key={index}>
                  <Text style={styles.modalCoins}>{coins.name}</Text>
                  <Text style={styles.modalInfo}>{coins.value}</Text>
                </View>
              ))}

            </ScrollView>

          </View>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  containerItem: {
    backgroundColor: "#",
    paddingTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerNames: {
    marginLeft: 32,
  },
  coinName: {
    flexDirection: "row",
    fontFamily: "Helvetica",
    color: '#000000',
  },
  text: {
    color: "#3b3b3b",
  },
  textPrice: {
    color: "#ffffff",
    fontFamily: "Helvetica",
    fontWeight: "bold",
  },
  pricePercentage: {
    textAlign: "right",
    fontFamily: "Helvetica",
  },
  priceUp: {
    color: "#05ff16",
    fontFamily: "Helvetica",
  },
  priceDown: {
    color: "#ff0505",
    fontFamily: "Helvetica",
  },
  textSymbol: {
    color: "#ffffff",
    fontFamily: "Helvetica",
    textTransform: "uppercase",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#bababa",
    padding: 20,
  },
  return: {
    alignItems: "center",
    borderWidth: 3,
    borderColor: '#000000',
    borderRadius: 3,
    padding: 10,
    marginBottom: 5,

  },
  modalCoins: {
    fontSize: 16,
    fontWeight: "bold",
    color: '#000000',
    fontFamily: "Helvetica",
  },
  modalInfo: {
    fontSize: 16,
    color: '#000000 ',
    fontFamily: "Helvetica",
  },
  returnText: {
    color: "#000000",
    fontFamily: "Helvetica",
  },
  modalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: '#000000',
    padding: 8,
  },
});
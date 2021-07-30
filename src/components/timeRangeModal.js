/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
class ModalDatePicker extends Component {
  state = {
    modalVisible: false,
    selectedDate: new Date(),
  };
  openModal() {
    this.setModalVisible(true);
  }
  selectDate = (visible) => {
    if (this.props.getDate) {
      this.props.getDate(this.state.selectedDate);
    }
    this.setModalVisible(visible);
  };
  setModalVisible = (visible) => {
    this.setState({ ...this.state, modalVisible: visible });
  };

  setSelectedDate = (date) => {
    console.log(date);
    this.setState({ ...this.state, selectedDate: date });
  };

  render() {
    const { modalVisible, selectedDate } = this.state;
    return (
      <View style={{}}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            this.setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <DatePicker
                maximumDate={new Date()}
                //   androidVariant="nativeAndroid"
                mode="date"
                date={selectedDate}
                onDateChange={(date) => this.setSelectedDate(date)}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                //   backgroundColor: 'yellow',
                  alignSelf: 'stretch',
                }}>
                <Pressable
                  style={[styles.button, styles.buttonOpen, { marginTop: 35 }]}
                  onPress={() => this.selectDate(!modalVisible)}>
                  <Text style={[styles.textStyle, { fontSize: 20 }]}>
                    Select
                  </Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose, { marginTop: 35 }]}
                  onPress={() => this.setModalVisible(!modalVisible)}>
                  <Text style={[styles.textStyle, { fontSize: 20 }]}>
                    Close
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ModalDatePicker;

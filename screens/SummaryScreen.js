import * as React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';
import db from '../config';
import AppHeader from '../components/AppHeader';
class SummaryScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      present_students: [],
      absent_students: [],
    };
  }

  getTodaysDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;

    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    today = dd + '-' + mm + '-' + yyyy;
    return today;
  }
  componentDidMount = async () => {
    var today = await this.getTodaysDate();

    var students_ref = db.ref('/').on('value', (data) => {
      var class_a = data.val();
      var present_students = [];
      var absent_students = [];
      for (var i in class_a) {
        if (class_a[i][today] === 'present') {
          present_students.push(class_a[i]);
        }
        if (class_a[i][today] === 'absent') {
          absent_students.push(class_a[i]);
        }
      }

      present_students.sort(function (a, b) {
        return a.roll_no - b.roll_no;
      });

      absent_students.sort(function (a, b) {
        return a.roll_no - b.roll_no;
      });

      this.setState({
        present_students: present_students,
        absent_students: absent_students,
      });
    });
  };

  render() {
    return (
      <View>
      
      <View style={{ flex: 1, backgroundColor: 'cyan', marginTop:-35, }}>
        <View style={{ flex: 0 }}></View>
        <Text style={styles.title}>Present Students List</Text>
        <View style={styles.presentContainer}>
          {this.state.present_students.map((student, index) => (
            <Text style={{ fontSize: 21, marginTop: '2px', }}>
              {student.name}
            </Text>
          ))}
        </View>
        <Text style={styles.title}>Absent Students List</Text>

        <View style={styles.absentContainer}>
          {this.state.absent_students.map((student, index) => (
            <Text style={{ fontSize: 21 }}>
              {student.name}
            </Text>
          ))}
        </View>
        <View
          style={{
            marginTop: 30,
            flex: 0.1,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <Text
            style={{ fontSize: 20, marginBottom: 50, fontWeight:'bold', color:'black',}}>
            Present: {this.state.present_students.length}
          </Text>
          <Text style={{ fontSize: 20 ,fontWeight:'bold',color:'black',}}>
            Absent: {this.state.absent_students.length}
          </Text>
        </View>
      </View>
</View>    );
  }
}

const styles = StyleSheet.create({
  presentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    backgroundColor: 'cyan',
  },
  absentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: 'cyan',
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 50,
    color:'black',
    backgroundColor:'cyan',

  },
});

export default SummaryScreen;

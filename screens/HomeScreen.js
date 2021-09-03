import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, Image } from 'react-native';
import db from '../config';
import AppHeader from '../components/AppHeader'
export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      all_students: [],
      presentStudentsList: [],
      absentStudentsList: [],
    };
  }

  componentDidMount = async () => {
    var class_ref = await db.ref('/').on('value', (data) => {
      var all_students = [];
      var class_a = data.val();
      for (var i in class_a) {
        all_students.push(class_a[i]);
      }
      all_students.sort(function (a, b) {
        return a.roll_no - b.roll_no;
      });
      this.setState({ all_students: all_students });
      console.log(all_students);
    });
  };

  updateAttendence(roll_no, status) {
    var id = '';
    if (roll_no <= 9) {
      id = '0' + roll_no;
    } else {
      id = roll_no;
    }

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
    var ref_path = id;
    var class_ref = db.ref(ref_path);
    class_ref.update({
      [today]: status,
    });
  }

  render() {
    var all_students = this.state.all_students;
    if (all_students.length === 0) {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.no}>Please Wait...</Text>
            
    
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={{ flex: 3 }}>
          <View><AppHeader/></View>
            {all_students.map((student, index) => (
              <View key={index} style={styles.studentChartContainer}>
                <View
                  key={'name' + index}
                  style={{ flex: 1, flexDirection: 'row' }}>
                  <Text
                    style={{

                      fontSize: 20,

                      fontWeight: 'bold',
                      marginRight: 10,
                    }}>
                    {student.roll_no}.
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      //: 'ink free',
                    }}>
                    {student.name}
                  </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <TouchableOpacity
                    style={
                      this.state.presentStudentsList.includes(index),
                      styles.presentButton
                  
                    }
                    onPress={() => {

                      var presentStudentsList = this.state.presentStudentsList;
                      presentStudentsList.push(index);
                      this.setState({ presentPressedList: presentStudentsList });
                      var rollno = index + 1;
                      this.updateAttendence(rollno, 'present');
                    }}>
                    <Text
                      style={{ color: 'black', fontWeight:'bold', 
                      fontSize : 18, }}>
                      Present
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={
                      this.state.absentStudentsList.includes(index),
                      styles.absentButton
                    }
                    onPress={() => {
                      var absentStudentsList = this.state.absentStudentsList;
                      absentStudentsList.push(index);
                      this.setState({ absentStudentsList: absentStudentsList });
                      var roll_no = index + 1;
                      this.updateAttendence(roll_no, 'absent');
                    }}>
    <Text style={{ color: 'black', fontWeight:'bold', fontSize : 18, marginBottom:25 }}> Absent
    </Text>
    </TouchableOpacity>
    </View>
    </View>))}
    <View style={{ flex: 1 }}>
    <TouchableOpacity
    style={styles.footer}
    onPress={() => {
    this.props.navigation.navigate('SummaryScreen');}}>
    <Text style={styles.text}>Submit</Text>
    </TouchableOpacity>
    </View>
    </View>
    </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  studentChartContainer: {
    flexDirection: 'row',
    padding: 1,
    alignItems: 'center',
    margin: 15
  },
  presentButton: {
    width: 70,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 3,
    backgroundColor: 'green'
  },
  absentButton: {
    width: 70,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    backgroundColor: 'red'
  },
  footer: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'cyan',
    marginTop: 10,
  },
  text: {
    color:'black',
    fontWeight: 'bold',
    fontSize: 25,
  },
  no: {
    fontWeight: 'bold',
    fontSize: 25,
  },
});

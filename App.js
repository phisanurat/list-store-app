import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    FlatList,
    View,
    Image,
    Button,
    Dimensions,
    SafeAreaView,
    ScrollView,
    Alert,
    TouchableOpacity,
    Modal,
    TouchableHighlight,
} from 'react-native';
import {db} from './firebases';

const {height, width} = Dimensions.get('window');

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            computer: null,
            data: [],
        };
    }

    componentDidMount(): void {
        db.collection('computer')
            .get()
            .then(res => {
                const computer = [];
                res.forEach(doc => {
                    // console.log(doc.data());
                    const data = {
                        data: doc.data(),
                        id: doc.id,
                    };
                    computer.push(data);
                });
                this.setState({computer: computer});
                // console.log(res);
            });
    }

    print = (exp_date) => {
        let date_now = new Date();
        date_now = Math.floor(date_now.getTime() / 1000);
        let remain = Number(exp_date - date_now);
        remain = Math.floor(remain / (3600 * 24) + 1);
        console.log("REMAIN : ", remain);
        if (remain > 0) {
            return <Text
                style={{fontSize: 16, fontWeight: 'bold', top: height * 0.01, color: '#00adb5'}}> {remain} Days </Text>
        } else {
            return <Text style={{fontSize: 16, fontWeight: 'bold', top: height * 0.01, color: 'red'}}> Has Expire</Text>
        }
    };

    renderItem = ({item}) => {
        console.log('RENDER ITEM RENDER ITEM RENDER ITEM');
        // console.log(item);
        let registration_date = new Intl.DateTimeFormat('th-TH', {
            weekday: 'short',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            // hour: '2-digit',
            // minute: '2-digit',
            // second: '2-digit',
        }).format(item.data.start_date.seconds * 1000);
        console.log('registration_date : ' + registration_date);
        let exp_date = new Intl.DateTimeFormat('th-TH', {
            weekday: 'short',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            // hour: '2-digit',
            // minute: '2-digit',
            // second: '2-digit',
        }).format(item.data.exp_date.seconds * 1000);
        console.log('exp_date : ' + exp_date);

        return (
            // <TouchableOpacity>
            <View style={{
                flex: 1, height: 120,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.20,
                shadowRadius: 1.41,
                elevation: 2,
                // flexDirection: 'row',
                marginTop: 10,
                borderWidth: 0.3,
                borderColor: 'white',
                borderRadius: 10,
                // overflow: 'hidden',
                backgroundColor: '#f4f5f9',
                width: width * 0.9,
                marginLeft: width * 0.05,
                marginBottom: width * 0.02,
            }}>
                <View style={{flex: .6, backgroundColor: ''}}>
                    <Text style={{top: 15, left: 15, fontSize: 16, fontWeight: 'bold'}}>{item.data.name}</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row',}}>
                    <View style={{flex: 1, backgroundColor: '',}}>
                        <Text style={{top: 5, left: 15, fontSize: 14, color: '#393e46'}}>
                            Device ID : {item.id}
                        </Text>
                        <Text style={{top: 5, left: 15, fontSize: 14, color: '#393e46'}}>
                            Registration_date : {registration_date}
                        </Text>
                        <Text style={{top: 5, left: 15, fontSize: 14, color: '#393e46'}}>
                            Expiration_date : {exp_date}
                        </Text>
                    </View>
                    <View style={{flex: .4, backgroundColor: "", alignItems: 'center'}}>
                        <Text style={{fontSize: 16, color: '#393e46'}}>Remain</Text>
                        {this.print(item.data.exp_date.seconds)}
                    </View>
                </View>
            </View>
            // </TouchableOpacity>
        );
    };

    render() {
        return (
            <SafeAreaView style={style.container}>
                <View style={style.sub}>
                    <View style={{
                        flex: .1,
                        backgroundColor: '#00adb5',
                        flexDirection: 'row',
                        // justifyContent: 'center',
                        // alignItems: 'center',
                        borderRadius: 10,
                        width: width * .9,
                        left: width * 0.05,
                        //shadows
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.20,
                        shadowRadius: 1.41,
                        elevation: 2,
                    }}>
                        <View
                            style={{flex: .4, backgroundColor: '#fafafa', borderRadius: 1, justifyContent: 'center',}}>
                            <Text style={{
                                fontSize: 30, fontWeight: 'bold', color: '#00adb5', left: width * 0.07,
                            }}>
                                I O I
                            </Text>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <Text style={{fontSize: 30, fontWeight: 'bold', color: '#fafafa', left: width * 0.025,}}>
                                L i s t {' '} S t o r e
                            </Text>
                        </View>
                    </View>
                    <View style={{flex: .9, backgroundColor: '', top: height * 0.01, borderRadius: 20}}>
                        <FlatList extraData={this.state}
                                  data={this.state.computer}
                            // keyExtractor={(x, i) => i}
                                  renderItem={this.renderItem}
                        />
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    sub: {
        flex: 1,
        backgroundColor: '#ffffff',
        // backgroundColor: '#393e46',

    },
    text_dark: {
        color: 'black',
    }
});

export default App;

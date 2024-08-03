const dataTraining = [
    [1,0,1,0],
    [1,0,0,1],
    [1,1,1,1],
    [0,0,1,1],
    [0,0,0,1],
    [1,0,0,0]
]

//fungsi sigmoid
function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

const solusi = [    
    0.8580709705242944,  1.9322172710649665,
    0.841127858664529,  0.6692742792165385,
    1.3734697269285334,  0.2159824089692126,
    -1.4580690998511239, 0.23025280563504325,
    -1.4305822693019783,  1.7373124472602708,
    -0.7031070734276117,  1.5510017265599183,
    -0.9597831017934357,  -1.038658327716047,
    -0.5442618685876512, 0.20514150998107183,
    -0.7042500918750898,  1.8449459855869312,
    1.2675711920144854, 0.20636018034862058,
    -0.2759784711773845,  1.0118542381175883,
    -1.3109958124363077,   1.674344077608997,
    -0.4110495401405414,   1.276379285681191,
    -1.3315612696567616
];

function feedforward(data, solusi, hidden, output ) {
    // console.log('------------------------KERJAKAN FEEDFORWARD------------------------')
    let _solution = solusi;
    let _dtTraining = data;
    const _bias = 1;
    const _input = _dtTraining.length; //mendapatkan nilai jumlah nilai inputan dalam data training
    const _hidden = hidden;
    const _output = output;

    // langkah 1, inisialisasi parameter pada input layer ke hidden layer
    // kemudian jumlah input layer * hidden layer + bias to hidden layer
    const _biasToHidden = _bias * _hidden;
    const _inputToHidden = _input * _hidden;
    const _inputAndBiasToHidden = _biasToHidden + _inputToHidden;

    // langkah 2, inisialisasi parameter pada hidden layer ke output layer
    // kemudian jumlah hidden layer * output layer + bias to hidden layer
    const _biasToOuput = _bias * _output;
    const _hiddenToOutput = _hidden * _output;
    const _hiddenAndBiasToOuput = _biasToOuput + _hiddenToOutput;

    // jumlah dimensi pada jaringan MLP
    const dimension = _inputAndBiasToHidden + _hiddenAndBiasToOuput;

    //================================================================
    // total variabel solusi pada input dan bias ke hidden layer
    let _total_vsLayerOne = _solution.length - _hiddenAndBiasToOuput; //total input dan bias ke hidden layer

    // mendapatkan vektor solusi dari layer bagian pertama ke hidden layer
    let _vsLayerOne = []; //simpan vektor solusi sementara
    for (let i = 0; i < _total_vsLayerOne; i++) {
        _vsLayerOne.push(_solution[i]);
    }
    // pisahkan terlebih dahulu bias ke hidden
    // sisa dari _vsLayerOne merupakan variabel solusi dari input ke hidden layer
    // let _biasToHidden = _total_vsLayerOne - _inputToHidden; //jumlah bias ke hidden layer == _biasToHidden
    // console.log(_biasToHidden)
    // vektor solusi input layer 
    let _final_vs_inputToHidden = getInputWeight(_solution.slice(_biasToHidden, _total_vsLayerOne), _input); //vektor solusi input ke hidden
    // console.log(_final_vs_inputToHidden);
    // asdasd
    //================================================================
    // membagi vektor solusi layer pertama dan kedua
    let _vsLayerTwo = _solution.slice(_total_vsLayerOne);
    
    let _total_vs_hiddenToOutput = _solution.length - _inputAndBiasToHidden - _hiddenToOutput; //jumlah vektor solusi hidden ke output layer
    // console.log(`hidden to output = ${_total_vs_hiddenToOutput}`);
    
    //memisahkan vektor solusi bias dan hidden layer dan
    //simpan vektor solusi bias ke dalam variabel
    let _final_vs_biasToHidden = [];
    for (let i = 0; i < _total_vs_hiddenToOutput; i++){
        _final_vs_biasToHidden.push(_vsLayerTwo[i])
    }

    let _final_vs_hiddenToOutput = getInputWeight(_solution.slice(_total_vsLayerOne + _total_vs_hiddenToOutput, solusi.length), hidden); // mendapatkan vektor solusi  hidden ke output
    // console.log(_final_vs_hiddenToOutput)

    // menjalankan fungsi aktivasi sebanyak jumlah hidden layer
    // nilai bias akan ditambahkan dengan hasil kali antara nilai input dengan nilai antara bobot input ke hidden
    let _z_in = []
    for (let i = 0; i < hidden; i++){
        let activation1 = _vsLayerOne[i]
        for (let j = 0; j < data.length; j++){
            activation1 += data[j] * _final_vs_inputToHidden[i][j]
        }
        // console.log(activation1)
        // asdfsaf
        _z_in.push(sigmoid(activation1));
        // console.log(_z_in)
    }

    // menjalankan fungsi aktivasi sebanyak jumlah output layer
    // nilai bias akan ditambahkan dengan hasil kali antara nilai aktivasi pada hidden layer
    // dengan nilai bobot antara hidden ke output layer
    let _z = [];
    for (let i = 0; i < output; i++){
        let activation2 = _vsLayerTwo[i]
        for (let j = 0; j < _z_in.length; j++){
            activation2 += _z_in[j] * _final_vs_hiddenToOutput[i][j]
        }
        _z.push(sigmoid(activation2))
    }
    // return _z;
    let fmin = Math.min(..._z);
    return fmin;
    console.log(`nilai _z = ${_z}`)
    console.log(`fmin nilai _z = ${fmin}`)
}

function getInputWeight(data, size) {
    let result = [];
    for (let i = 0; i < data.length; i += size) {
        let subArray = [];
        for (let j = 0; j < size; j++) {
            if (i + j < data.length){
                subArray.push(data[i + j]);
            }
        }
        result.push(subArray);
    }
    return result;
}


function testing (){   
    
    for (let i = 0; i < dataTraining.length; i++){
        // console.log(dataTraining.length)
        const hasil_testing = feedforward(dataTraining[i], solusi, 3, 3, 1);
        console.log(`data ${i+1} = ${hasil_testing}`);
        if (hasil_testing >= 0.5){
            console.log(1);
        } else {
            console.log(0);
        }
    }
}
const test = testing();
console.log(test);
